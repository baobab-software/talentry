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
} from "@/components/ui/field";
import { Input } from "@/components/ui/input";
import { useRouter } from "next/navigation";

export default function ForgotPasswordPage() {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);

    // Simulate API call
    await new Promise((resolve) => setTimeout(resolve, 1500));

    setIsLoading(false);
    setIsSubmitted(true);

    // Redirect to reset password page after showing success message
    setTimeout(() => {
      router.push(`/auth/reset-password?email=${encodeURIComponent(email)}`);
    }, 2000);
  };

  return (
    <div className="flex min-h-screen items-center justify-center p-4">
      <div className={cn("flex flex-col gap-6 w-full max-w-4xl")}>
        <Card className="overflow-hidden p-0">
          <CardContent className="grid p-0 md:grid-cols-2">
            <form onSubmit={handleSubmit} className="p-6 md:p-8">
              <FieldGroup>
                <div className="flex flex-col gap-2 text-center">
                  <h1 className="text-2xl font-bold">Forgot Password?</h1>
                  <p className="text-muted-foreground text-balance">
                    {isSubmitted
                      ? "Check your email for the OTP code"
                      : "Enter your email address and we'll send you an OTP to reset your password"}
                  </p>
                </div>

                {!isSubmitted ? (
                  <>
                    <Field>
                      <FieldLabel htmlFor="email">Email</FieldLabel>
                      <Input
                        id="email"
                        type="email"
                        placeholder="j.smith@example.com"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        required
                      />
                    </Field>

                    <Field>
                      <Button type="submit" className="w-full" disabled={isLoading}>
                        {isLoading ? "Sending..." : "Send OTP"}
                      </Button>
                    </Field>
                  </>
                ) : (
                  <div className="text-center text-green-600 dark:text-green-400">
                    <p className="font-medium">OTP sent successfully!</p>
                    <p className="text-sm mt-2">Redirecting to reset password page...</p>
                  </div>
                )}

                <FieldDescription className="text-center">
                  Remember your password?{" "}
                  <a href="/auth/login" className="underline">
                    Sign In
                  </a>
                </FieldDescription>
              </FieldGroup>
            </form>
            <div className="relative hidden md:block">
              <Image
                src="/background/hero/img-0.jpg"
                alt="Forgot Password"
                fill
                className="object-cover dark:brightness-[0.2] dark:grayscale"
                priority
              />
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}