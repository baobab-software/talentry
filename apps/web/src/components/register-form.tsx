"use client";

import React, { useState } from "react";
import Image from "next/image";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import {
  Field,
  FieldDescription,
  FieldGroup,
  FieldLabel,
  FieldSeparator,
} from "@/components/ui/field";
import { Input } from "@/components/ui/input";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

export function RegisterForm({
  className,
  ...props
}: React.ComponentProps<"div">) {
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const [userType, setUserType] = useState<"seeker" | "employer">("seeker");

  return (
    <div className={cn("flex flex-col mt-20", className)} {...props}>
      <Card className="overflow-hidden p-0">
        {/* Changed from 2 cols → 5 cols */}
        <CardContent className="grid p-0 md:grid-cols-5">
          {/* Form: wider */}
          <div className="p-6 md:p-10 md:col-span-3">
            <Tabs
              defaultValue="seeker"
              onValueChange={(value) =>
                setUserType(value as "seeker" | "employer")
              }
            >
              <div className="flex flex-col items-center gap-2 text-center mb-6">
                <h1 className="text-2xl font-bold">Create your account</h1>
                <p className="text-muted-foreground text-balance">
                  Join us and start your journey today
                </p>
              </div>

              <TabsList className="grid w-full grid-cols-2 mb-6">
                <TabsTrigger value="seeker">Job Seeker</TabsTrigger>
                <TabsTrigger value="employer">Employer</TabsTrigger>
              </TabsList>

              <TabsContent value="seeker">
                <form>
                  <FieldGroup>
                    {/* First & Last name */}
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <Field>
                        <FieldLabel htmlFor="firstName">First name</FieldLabel>
                        <Input
                          id="firstName"
                          type="text"
                          placeholder="Jack"
                          required
                        />
                      </Field>

                      <Field>
                        <FieldLabel htmlFor="lastName">Last name</FieldLabel>
                        <Input
                          id="lastName"
                          type="text"
                          placeholder="Smith"
                          required
                        />
                      </Field>
                    </div>

                    {/* Email & Phone */}
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <Field>
                        <FieldLabel htmlFor="email">Email</FieldLabel>
                        <Input
                          id="email"
                          type="email"
                          placeholder="j.smith@example.com"
                          required
                        />
                      </Field>

                      <Field>
                        <FieldLabel htmlFor="phone">
                          Phone number{" "}
                          <span className="text-muted-foreground">
                            (optional)
                          </span>
                        </FieldLabel>
                        <Input
                          id="phone"
                          type="tel"
                          placeholder="0787735258"
                          maxLength={10}
                        />
                      </Field>
                    </div>

                    {/* Password */}
                    <Field>
                      <FieldLabel htmlFor="password">Password</FieldLabel>
                      <Input
                        id="password"
                        type="password"
                        placeholder="At least 8 characters"
                        required
                      />
                    </Field>

                    {/* Submit */}
                    <Field>
                      <Button type="submit" className="w-full">
                        Sign Up as Job Seeker
                      </Button>
                    </Field>

                    <FieldSeparator className="*:data-[slot=field-separator-content]:bg-card">
                      Or continue with
                    </FieldSeparator>

                    {/* Social buttons */}
                    <Field className="grid grid-cols-3 gap-4">
                      <Button variant="outline" type="button">
                        <span className="sr-only">Sign up with Apple</span>
                        Apple
                      </Button>
                      <Button variant="outline" type="button">
                        <span className="sr-only">Sign up with Google</span>
                        Google
                      </Button>
                      <Button variant="outline" type="button">
                        <span className="sr-only">Sign up with Meta</span>
                        Meta
                      </Button>
                    </Field>

                    <FieldDescription className="text-center">
                      Already have an account?{" "}
                      <a href="/auth/login" className="underline">
                        Sign In
                      </a>
                    </FieldDescription>
                  </FieldGroup>
                </form>
              </TabsContent>

              <TabsContent value="employer">
                <form>
                  <FieldGroup>
                    {/* Company Name */}
                    <Field>
                      <FieldLabel htmlFor="companyName">
                        Company Name
                      </FieldLabel>
                      <Input
                        id="companyName"
                        type="text"
                        placeholder="Acme Corp"
                        required
                      />
                    </Field>

                    {/* Contact Person */}
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <Field>
                        <FieldLabel htmlFor="contactFirstName">
                          Contact First Name
                        </FieldLabel>
                        <Input
                          id="contactFirstName"
                          type="text"
                          placeholder="Jack"
                          required
                        />
                      </Field>

                      <Field>
                        <FieldLabel htmlFor="contactLastName">
                          Contact Last Name
                        </FieldLabel>
                        <Input
                          id="contactLastName"
                          type="text"
                          placeholder="Smith"
                          required
                        />
                      </Field>
                    </div>

                    {/* Email & Phone */}
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <Field>
                        <FieldLabel htmlFor="employerEmail">Email</FieldLabel>
                        <Input
                          id="employerEmail"
                          type="email"
                          placeholder="contact@acme.com"
                          required
                        />
                      </Field>

                      <Field>
                        <FieldLabel htmlFor="employerPhone">
                          Phone number
                        </FieldLabel>
                        <Input
                          id="employerPhone"
                          type="tel"
                          placeholder="0787735258"
                          maxLength={10}
                          required
                        />
                      </Field>
                    </div>

                    {/* Password */}
                    <Field>
                      <FieldLabel htmlFor="employerPassword">
                        Password
                      </FieldLabel>
                      <Input
                        id="employerPassword"
                        type="password"
                        placeholder="At least 8 characters"
                        required
                      />
                    </Field>


                    {/* Submit */}
                    <Field>
                      <Button type="submit" className="w-full">
                        Sign Up as Employer
                      </Button>
                    </Field>

                    <FieldSeparator className="*:data-[slot=field-separator-content]:bg-card">
                      Or continue with
                    </FieldSeparator>

                    {/* Social buttons */}
                    <Field className="grid grid-cols-3 gap-4">
                      <Button variant="outline" type="button">
                        <span className="sr-only">Sign up with Apple</span>
                        Apple
                      </Button>
                      <Button variant="outline" type="button">
                        <span className="sr-only">Sign up with Google</span>
                        Google
                      </Button>
                      <Button variant="outline" type="button">
                        <span className="sr-only">Sign up with Meta</span>
                        Meta
                      </Button>
                    </Field>

                    <FieldDescription className="text-center">
                      Already have an account?{" "}
                      <a href="/auth/login" className="underline">
                        Sign In
                      </a>
                    </FieldDescription>
                  </FieldGroup>
                </form>
              </TabsContent>
            </Tabs>
          </div>

          {/* Image: slightly smaller than form */}
          <div className="relative hidden md:block md:col-span-2">
            <Image
              src="/background/hero/img-0.jpg"
              alt="Image"
              fill
              className="object-cover dark:brightness-[0.2] dark:grayscale"
              priority
            />
          </div>
        </CardContent>
      </Card>

      <FieldDescription className="px-6 text-center mt-5">
        By clicking continue, you agree to our{" "}
        <a href="#" className="underline">
          Terms of Service
        </a>{" "}
        and{" "}
        <a href="#" className="underline">
          Privacy Policy
        </a>
        .
      </FieldDescription>
    </div>
  );
}
