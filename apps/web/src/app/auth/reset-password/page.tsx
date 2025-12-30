"use client";

import React, { useState, useEffect, useRef } from "react";
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
import { useRouter, useSearchParams } from "next/navigation";

export default function ResetPasswordPage() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const [email, setEmail] = useState("");
  const [otpDigits, setOtpDigits] = useState<string[]>(["", "", "", "", "", ""]);
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [isVerified, setIsVerified] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState(false);
  const inputRefs = useRef<(HTMLInputElement | null)[]>([]);

  useEffect(() => {
    const emailParam = searchParams.get("email");
    if (emailParam) {
      setEmail(emailParam);
    }
  }, [searchParams]);

  const handleOtpChange = (index: number, value: string) => {
    // Only allow digits
    const digit = value.replace(/\D/g, "");
    
    if (digit.length <= 1) {
      const newOtpDigits = [...otpDigits];
      newOtpDigits[index] = digit;
      setOtpDigits(newOtpDigits);

      // Auto-focus next input
      if (digit && index < 5) {
        inputRefs.current[index + 1]?.focus();
      }
    }
  };

  const handleOtpKeyDown = (index: number, e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Backspace" && !otpDigits[index] && index > 0) {
      inputRefs.current[index - 1]?.focus();
    }
  };

  const handleOtpPaste = (e: React.ClipboardEvent) => {
    e.preventDefault();
    const pastedData = e.clipboardData.getData("text").replace(/\D/g, "").slice(0, 6);
    const newOtpDigits = [...otpDigits];
    
    for (let i = 0; i < pastedData.length; i++) {
      newOtpDigits[i] = pastedData[i];
    }
    
    setOtpDigits(newOtpDigits);
    
    // Focus the next empty input or the last one
    const nextIndex = Math.min(pastedData.length, 5);
    inputRefs.current[nextIndex]?.focus();
  };

  const handleVerifyOtp = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setError("");

    const otp = otpDigits.join("");

    // Simulate OTP verification
    await new Promise((resolve) => setTimeout(resolve, 1000));

    // For demo purposes, accept any 6-digit OTP
    if (otp.length === 6) {
      setIsVerified(true);
      setError("");
    } else {
      setError("Invalid OTP. Please enter a 6-digit code.");
    }

    setIsLoading(false);
  };

  const handleResetPassword = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setError("");

    if (newPassword !== confirmPassword) {
      setError("Passwords do not match");
      setIsLoading(false);
      return;
    }

    if (newPassword.length < 8) {
      setError("Password must be at least 8 characters");
      setIsLoading(false);
      return;
    }

    // Simulate API call
    await new Promise((resolve) => setTimeout(resolve, 1500));

    setSuccess(true);
    setIsLoading(false);

    // Redirect to login after success
    setTimeout(() => {
      router.push("/auth/login");
    }, 2000);
  };

  return (
    <div className="flex min-h-screen items-center justify-center p-4">
      <div className={cn("flex flex-col gap-6 w-full max-w-4xl")}>
        <Card className="overflow-hidden p-0">
          <CardContent className="grid p-0 md:grid-cols-2">
            <div className="p-6 md:p-8">
              {!isVerified ? (
                <form onSubmit={handleVerifyOtp}>
                  <FieldGroup>
                    <div className="flex flex-col gap-2 text-center">
                      <h1 className="text-2xl font-bold">Verify OTP</h1>
                      <p className="text-muted-foreground text-balance">
                        Enter the 6-digit code sent to{" "}
                        <a href={`mailto:${email}`} className="font-medium underline">
                          {email}
                        </a>
                      </p>
                    </div>

                    <Field>
                      <div className="flex gap-2 justify-center">
                        {otpDigits.map((digit, index) => (
                          <Input
                            key={index}
                            ref={(el) => {
                              inputRefs.current[index] = el;
                            }}
                            type="text"
                            inputMode="numeric"
                            maxLength={1}
                            value={digit}
                            onChange={(e) => handleOtpChange(index, e.target.value)}
                            onKeyDown={(e) => handleOtpKeyDown(index, e)}
                            onPaste={index === 0 ? handleOtpPaste : undefined}
                            className="w-12 h-12 text-center text-lg font-semibold"
                            required
                          />
                        ))}
                      </div>
                      {error && (
                        <p className="text-sm text-red-600 dark:text-red-400 mt-1 text-center">
                          {error}
                        </p>
                      )}
                    </Field>

                    <Field>
                      <Button type="submit" className="w-full" disabled={isLoading}>
                        {isLoading ? "Verifying..." : "Verify OTP"}
                      </Button>
                    </Field>

                    <FieldDescription className="text-center">
                      Didn&apos;t receive the code?{" "}
                      <button
                        type="button"
                        className="underline"
                        onClick={() => {
                          // Resend OTP logic
                          alert("OTP resent!");
                        }}
                      >
                        Resend OTP
                      </button>
                    </FieldDescription>
                  </FieldGroup>
                </form>
              ) : !success ? (
                <form onSubmit={handleResetPassword}>
                  <FieldGroup>
                    <div className="flex flex-col gap-2 text-center">
                      <h1 className="text-2xl font-bold">Reset Password</h1>
                      <p className="text-muted-foreground text-balance">
                        Enter your new password below
                      </p>
                    </div>

                    <Field>
                      <FieldLabel htmlFor="newPassword">New Password</FieldLabel>
                      <Input
                        id="newPassword"
                        type="password"
                        placeholder="At least 8 characters"
                        value={newPassword}
                        onChange={(e) => setNewPassword(e.target.value)}
                        required
                      />
                    </Field>

                    <Field>
                      <FieldLabel htmlFor="confirmPassword">
                        Confirm Password
                      </FieldLabel>
                      <Input
                        id="confirmPassword"
                        type="password"
                        placeholder="Re-enter your password"
                        value={confirmPassword}
                        onChange={(e) => setConfirmPassword(e.target.value)}
                        required
                      />
                      {error && (
                        <p className="text-sm text-red-600 dark:text-red-400 mt-1">
                          {error}
                        </p>
                      )}
                    </Field>

                    <Field>
                      <Button type="submit" className="w-full" disabled={isLoading}>
                        {isLoading ? "Resetting..." : "Reset Password"}
                      </Button>
                    </Field>
                  </FieldGroup>
                </form>
              ) : (
                <FieldGroup>
                  <div className="flex flex-col gap-4 text-center">
                    <div className="text-green-600 dark:text-green-400">
                      <svg
                        className="w-16 h-16 mx-auto mb-4"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"
                        />
                      </svg>
                      <h1 className="text-2xl font-bold">Password Reset Successful!</h1>
                      <p className="text-muted-foreground mt-2">
                        Your password has been reset successfully.
                      </p>
                      <p className="text-sm mt-2">Redirecting to login page...</p>
                    </div>
                  </div>
                </FieldGroup>
              )}
            </div>
            <div className="relative hidden md:block">
              <Image
                src="/background/hero/img-0.jpg"
                alt="Reset Password"
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