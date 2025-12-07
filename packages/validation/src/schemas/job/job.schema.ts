import { z } from 'zod';

const textFieldPattern = /^[a-zA-Z0-9\s\-.,:;!?()'"@#$%^&*+/=<>[\]{}|\\^~`]+$/;

const htmlTagPattern = /<[^>]*>/;

/**
 * Job type enum
 */
export const jobTypeEnum = z.enum(['Full-time', 'Part-time', 'Contract', 'Internship'], {
  errorMap: () => ({
    message: 'Type must be one of Full-time, Part-time, Contract, or Internship.',
  }),
});

/**
 * Text field schema with HTML sanitization
 */
const textFieldSchema = (fieldName: string) =>
  z
    .string({
      required_error: `${fieldName} is a required field.`,
      invalid_type_error: `${fieldName} must be a string.`,
    })
    .min(1, `${fieldName} is required and cannot be empty.`)
    .regex(textFieldPattern, `${fieldName} contains invalid characters.`)
    .refine((value) => !htmlTagPattern.test(value), {
      message: `${fieldName} must not contain HTML tags.`,
    });

/**
 * Array of text fields with HTML sanitization
 */
const textArraySchema = (fieldName: string, singularName: string) =>
  z
    .array(
      z
        .string()
        .regex(textFieldPattern, `Each ${singularName} contains invalid characters.`)
        .refine((value) => !htmlTagPattern.test(value), {
          message: `Each ${singularName} must not contain HTML tags.`,
        }),
      {
        required_error: `${fieldName} is a required field.`,
        invalid_type_error: `${fieldName} must be an array of strings.`,
      }
    )
    .min(1, `${fieldName} must contain at least one item.`);

/**
 * Job creation schema
 */
export const jobCreateSchema = z.object({
  title: textFieldSchema('Title'),
  description: textFieldSchema('Description'),
  responsibilities: textArraySchema('Responsibilities', 'responsibility'),
  requirements: textArraySchema('Requirements', 'requirement'),
  benefits: textArraySchema('Benefits', 'benefit'),
  location: z
    .string({
      required_error: 'Location is a required field.',
      invalid_type_error: 'Location must be a string.',
    })
    .min(1, 'Location is required and cannot be empty.'),
  type: jobTypeEnum,
  vacancy: z
    .number({
      invalid_type_error: 'Vacancy must be a number.',
    })
    .int('Vacancy must be an integer.')
    .min(1, 'Vacancy must be at least 1.')
    .optional(),
  deadline: z
    .string({
      required_error: 'Deadline is a required field.',
      invalid_type_error: 'Deadline must be a string.',
    })
    .datetime({ message: 'Deadline must be in ISO format.' })
    .refine(
      (date) => new Date(date) > new Date(),
      'Deadline must be in the future.'
    ),
  tags: z
    .array(
      z
        .string()
        .regex(
          /^[a-zA-Z0-9\s-]+$/,
          'Each tag should only contain letters, numbers, spaces, and hyphens.'
        ),
      {
        required_error: 'Tags is a required field.',
        invalid_type_error: 'Tags must be an array of strings.',
      }
    )
    .max(10, 'Tags cannot have more than 10 items.'),
  isPublic: z
    .boolean({
      invalid_type_error: 'isPublic must be a boolean value.',
    })
    .optional(),
});

/**
 * Job update schema
 * All fields are optional for partial updates
 */
export const jobUpdateSchema = z
  .object({
    title: textFieldSchema('Title').optional(),
    description: textFieldSchema('Description').optional(),
    responsibilities: textArraySchema('Responsibilities', 'responsibility').optional(),
    requirements: textArraySchema('Requirements', 'requirement').optional(),
    benefits: textArraySchema('Benefits', 'benefit').optional(),
    location: z
      .string({
        invalid_type_error: 'Location must be a string.',
      })
      .min(1, 'Location cannot be empty.')
      .optional(),
    type: jobTypeEnum.optional(),
    vacancy: z
      .number({
        invalid_type_error: 'Vacancy must be a number.',
      })
      .int('Vacancy must be an integer.')
      .min(1, 'Vacancy must be at least 1.')
      .optional(),
    deadline: z
      .string({
        invalid_type_error: 'Deadline must be a string.',
      })
      .datetime({ message: 'Deadline must be in ISO format.' })
      .refine(
        (date) => new Date(date) > new Date(),
        'Deadline must be in the future.'
      )
      .optional(),
    tags: z
      .array(
        z
          .string()
          .regex(
            /^[a-zA-Z0-9\s-]+$/,
            'Each tag should only contain letters, numbers, spaces, and hyphens.'
          ),
        {
          invalid_type_error: 'Tags must be an array of strings.',
        }
      )
      .max(10, 'Tags cannot have more than 10 items.')
      .optional(),
    isPublic: z
      .boolean({
        invalid_type_error: 'isPublic must be a boolean value.',
      })
      .optional(),
  })
  .strict()
  .refine((data) => Object.keys(data).length > 0, {
    message: 'At least one field must be provided for update',
  });

export type JobCreateData = z.infer<typeof jobCreateSchema>;
export type JobUpdateData = z.infer<typeof jobUpdateSchema>;
export type JobType = z.infer<typeof jobTypeEnum>;
