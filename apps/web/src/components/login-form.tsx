import React from "react";
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

export function LoginForm({
  className,
  ...props
}: React.ComponentProps<"div">) {
  return (
    <div className={cn("flex flex-col gap-6 mt-20", className)} {...props}>
      <Card className="overflow-hidden p-0">
        {/* Wider grid */}
        <CardContent className="grid p-0 md:grid-cols-5">
          {/* Form */}
          <form className="p-6 md:p-10 md:col-span-3">
            <FieldGroup>
              <div className="flex flex-col items-center gap-2 text-center">
                <h1 className="text-2xl font-bold">Welcome back</h1>
                <p className="text-muted-foreground text-balance">
                  Login to your account
                </p>
              </div>

              <Field>
                <FieldLabel htmlFor="email">Email</FieldLabel>
                <Input
                  id="email"
                  type="email"
                  placeholder="m@example.com"
                  required
                />
              </Field>

              <Field>
                <div className="flex items-center">
                  <FieldLabel htmlFor="password">Password</FieldLabel>
                  <a
                    href="/auth/forgot-password"
                    className="ml-auto text-sm text-muted-foreground underline-offset-2 hover:underline"
                  >
                    Forgot password?
                  </a>
                </div>
                <Input id="password" type="password" required />
              </Field>

              <Field>
                <Button type="submit" className="w-full">
                  Login
                </Button>
              </Field>

              <FieldSeparator className="*:data-[slot=field-separator-content]:bg-card">
                Or continue with
              </FieldSeparator>

              {/* Social login */}
              <Field className="grid grid-cols-3 gap-4">
                <Button variant="outline" type="button">
                  <span className="sr-only">Login with Apple</span>
                  Apple
                </Button>
                <Button variant="outline" type="button">
                  <span className="sr-only">Login with Google</span>
                  Google
                </Button>
                <Button variant="outline" type="button">
                  <span className="sr-only">Login with Meta</span>
                  Meta
                </Button>
              </Field>

              <FieldDescription className="text-center">
                Don&apos;t have an account?{" "}
                <a href="/auth/register" className="underline">
                  Sign up
                </a>
              </FieldDescription>
            </FieldGroup>
          </form>

          {/* Image */}
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

      <FieldDescription className="px-6 text-center mt-3">
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
