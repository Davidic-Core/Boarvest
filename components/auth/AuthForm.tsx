"use client";

import Image from "next/image";
import Link from "next/link";
import { FormEvent, useState } from "react";

type AuthMode = "login" | "signup";

type AuthFormProps = {
  mode: AuthMode;
};

type FormErrors = Record<string, string>;

const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

export default function AuthForm({ mode }: AuthFormProps) {
  const isSignup = mode === "signup";
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [errors, setErrors] = useState<FormErrors>({});
  const [submitted, setSubmitted] = useState(false);

  function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const formData = new FormData(event.currentTarget);
    const email = String(formData.get("email") ?? "").trim();
    const password = String(formData.get("password") ?? "");
    const nextErrors: FormErrors = {};

    if (isSignup && !String(formData.get("fullName") ?? "").trim()) {
      nextErrors.fullName = "Enter your full name.";
    }

    if (!email) {
      nextErrors.email = "Enter your email address.";
    } else if (!emailPattern.test(email)) {
      nextErrors.email = "Enter a valid email address.";
    }

    if (!password) {
      nextErrors.password = "Enter your password.";
    } else if (password.length < 8) {
      nextErrors.password = "Password must be at least 8 characters.";
    }

    if (isSignup) {
      const confirmPassword = String(formData.get("confirmPassword") ?? "");
      if (!confirmPassword) {
        nextErrors.confirmPassword = "Confirm your password.";
      } else if (confirmPassword !== password) {
        nextErrors.confirmPassword = "Passwords do not match.";
      }
      if (!formData.get("terms")) {
        nextErrors.terms = "Agree to the Terms and Privacy Policy to continue.";
      }
    }

    setErrors(nextErrors);
    setSubmitted(Object.keys(nextErrors).length === 0);
  }

  return (
    <main className="flex min-h-screen items-center justify-center bg-[#080d0b] px-4 py-10 sm:px-6">
      <section className="w-full max-w-md">
        <Link href="/" className="mx-auto mb-8 flex w-fit items-center gap-3" aria-label="Boarvest home">
          <Image src="/image/boarvest-logo.png" alt="Boarvest logo" width={44} height={44} priority />
          <span className="text-2xl font-extrabold tracking-tight text-white">
            Boar<span className="text-emerald-400">vest</span>
          </span>
        </Link>

        <div className="rounded-3xl border border-white/[0.1] bg-[#0d1511] p-6 shadow-2xl shadow-black/20 sm:p-8">
          <div className="mb-8 text-center">
            <p className="mb-3 text-xs font-extrabold uppercase tracking-[0.2em] text-emerald-400">Welcome to Boarvest</p>
            <h1 className="text-3xl font-black tracking-tight text-white">{isSignup ? "Create your account" : "Welcome back"}</h1>
            <p className="mt-3 text-sm leading-6 text-gray-400">
              {isSignup ? "Start your journey toward a clearer digital asset experience." : "Sign in to continue to your Boarvest account."}
            </p>
          </div>

          <form onSubmit={handleSubmit} noValidate className="flex flex-col gap-5" aria-describedby="form-status">
            {isSignup && (
              <div className="flex flex-col gap-2">
                <label htmlFor="fullName" className="text-sm font-semibold text-gray-200">Full name</label>
                <input id="fullName" name="fullName" type="text" autoComplete="name" aria-invalid={Boolean(errors.fullName)} aria-describedby={errors.fullName ? "fullName-error" : undefined} className="auth-input" />
                {errors.fullName && <p id="fullName-error" className="auth-error">{errors.fullName}</p>}
              </div>
            )}

            <div className="flex flex-col gap-2">
              <label htmlFor="email" className="text-sm font-semibold text-gray-200">Email address</label>
              <input id="email" name="email" type="email" autoComplete="email" aria-invalid={Boolean(errors.email)} aria-describedby={errors.email ? "email-error" : undefined} className="auth-input" />
              {errors.email && <p id="email-error" className="auth-error">{errors.email}</p>}
            </div>

            <div className="flex flex-col gap-2">
              <label htmlFor="password" className="text-sm font-semibold text-gray-200">Password</label>
              <div className="relative">
                <input id="password" name="password" type={showPassword ? "text" : "password"} autoComplete={isSignup ? "new-password" : "current-password"} aria-invalid={Boolean(errors.password)} aria-describedby={errors.password ? "password-error" : undefined} className="auth-input pr-20" />
                <button type="button" className="absolute right-3 top-1/2 -translate-y-1/2 text-xs font-bold text-emerald-400 hover:text-emerald-300" onClick={() => setShowPassword((visible) => !visible)} aria-label={showPassword ? "Hide password" : "Show password"}>{showPassword ? "Hide" : "Show"}</button>
              </div>
              {errors.password && <p id="password-error" className="auth-error">{errors.password}</p>}
            </div>

            {isSignup && (
              <div className="flex flex-col gap-2">
                <label htmlFor="confirmPassword" className="text-sm font-semibold text-gray-200">Confirm password</label>
                <div className="relative">
                  <input id="confirmPassword" name="confirmPassword" type={showConfirmPassword ? "text" : "password"} autoComplete="new-password" aria-invalid={Boolean(errors.confirmPassword)} aria-describedby={errors.confirmPassword ? "confirmPassword-error" : undefined} className="auth-input pr-20" />
                  <button type="button" className="absolute right-3 top-1/2 -translate-y-1/2 text-xs font-bold text-emerald-400 hover:text-emerald-300" onClick={() => setShowConfirmPassword((visible) => !visible)} aria-label={showConfirmPassword ? "Hide confirmed password" : "Show confirmed password"}>{showConfirmPassword ? "Hide" : "Show"}</button>
                </div>
                {errors.confirmPassword && <p id="confirmPassword-error" className="auth-error">{errors.confirmPassword}</p>}
              </div>
            )}

            {isSignup ? (
              <div className="flex flex-col gap-2">
                <label className="flex items-start gap-3 text-sm leading-6 text-gray-400">
                  <input name="terms" type="checkbox" className="mt-1 size-4 accent-emerald-400" aria-invalid={Boolean(errors.terms)} />
                  <span>I agree to the <a href="#terms" className="font-semibold text-emerald-400 hover:text-emerald-300">Terms</a> and <a href="#privacy" className="font-semibold text-emerald-400 hover:text-emerald-300">Privacy Policy</a>.</span>
                </label>
                {errors.terms && <p className="auth-error">{errors.terms}</p>}
              </div>
            ) : (
              <div className="flex items-center justify-between gap-4 text-sm">
                <label className="flex items-center gap-3 text-gray-400"><input name="remember" type="checkbox" className="size-4 accent-emerald-400" /> Remember me</label>
                <a href="#forgot-password" className="font-semibold text-emerald-400 hover:text-emerald-300">Forgot password?</a>
              </div>
            )}

            <button type="submit" className="button button-primary mt-1 w-full justify-center">{isSignup ? "Create account" : "Log in"}</button>
            <p id="form-status" aria-live="polite" className={submitted ? "text-center text-sm text-emerald-300" : "sr-only"}>This interface is ready for authentication integration.</p>
          </form>

          <p className="mt-7 text-center text-sm text-gray-400">
            {isSignup ? "Already have an account? " : "New to Boarvest? "}
            <Link href={isSignup ? "/login" : "/signup"} className="font-bold text-emerald-400 hover:text-emerald-300">{isSignup ? "Log in" : "Sign up"}</Link>
          </p>
        </div>

        <p className="mt-6 text-center text-xs leading-5 text-gray-600">Authentication is not connected yet. No account or password is stored.</p>
      </section>
    </main>
  );
}

