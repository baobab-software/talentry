# @talentry/validation

Shared validation schemas and TypeScript types for Talentry applications.

## Features

- ✅ Zod-based validation schemas
- ✅ TypeScript type inference
- ✅ Consistent validation rules across API, mobile, and web
- ✅ Comprehensive error messages
- ✅ Reusable primitive schemas (email, phone, password)

## Installation

This package is part of the Talentry monorepo and is consumed by workspace apps.

```bash
# Already available in workspace apps
import { loginSchema, type LoginData } from '@talentry/validation';
```

## Usage

### In API (Express/Node.js)

```typescript
import { candidateRegisterSchema, type CandidateRegisterData } from '@talentry/validation';

// Validate request body
const result = candidateRegisterSchema.safeParse(req.body);

if (!result.success) {
  return res.status(400).json({ errors: result.error.errors });
}

const validData: CandidateRegisterData = result.data;
```

### In Mobile (React Native with react-hook-form)

```typescript
import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import { loginSchema, type LoginData } from '@talentry/validation';

const { control, handleSubmit } = useForm<LoginData>({
  resolver: zodResolver(loginSchema),
});
```

### In Web (Next.js)

```typescript
import { jobCreateSchema, type JobCreateData } from '@talentry/validation';

// Use with form libraries or direct validation
const validatedData = jobCreateSchema.parse(formData);
```

## Available Schemas

### Authentication
- `loginSchema` - Email and password
- `baseRegisterSchema` - Email, phone, password
- `adminRegisterSchema` - Admin registration
- `candidateRegisterSchema` - Candidate registration
- `employerRegisterSchema` - Employer registration
- `forgotPasswordSchema` - Email only
- `resetPasswordSchema` - New password

### User Updates
- `adminUpdateSchema` - Admin profile updates
- `candidateUpdateSchema` - Candidate profile updates
- `employerUpdateSchema` - Employer profile updates

### Job Management
- `jobCreateSchema` - Create job posting
- `jobUpdateSchema` - Update job posting

### Primitives
- `emailSchema` - Email validation with blocked domains
- `phoneSchema` - International phone format
- `passwordSchema` - Strong password (12+ chars, complexity requirements)

## Validation Rules

### Email
- Valid email format
- Blocked domains: protonmail.com, pront.me, tutanota.io
- Max 255 characters

### Phone
- International format: `+[country code][number]`
- Pattern: `+[1-9]{1,4}\\d{7,14}`
- Example: `+27123456789`

### Password
- Minimum 12 characters, maximum 64
- At least one uppercase letter
- At least one lowercase letter
- At least one number
- At least one special character

## Development

```bash
# Run tests
npm test

# Build package
npm run build

# Type check
npm run type-check

# Lint
npm run lint
```

## License

MIT
