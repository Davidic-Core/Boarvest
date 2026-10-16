"use client";

import Image from "next/image";
import Link from "next/link";
import { FormEvent, useState } from "react";
import { useRouter } from "next/navigation";
import { createClient } from "@/lib/supabase/client";

type AuthMode = "login" | "signup";
type AuthFormProps = { mode: AuthMode };
type FormErrors = Record<string, string>;
const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

export default function AuthForm({ mode }: AuthFormProps) {
  const isSignup = mode === "signup";
  const router = useRouter();
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [errors, setErrors] = useState<FormErrors>({});
  const [status, setStatus] = useState("");
  const [loading, setLoading] = useState(false);

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const form = new FormData(event.currentTarget);
    const email = String(form.get("email") ?? "").trim();
    const password = String(form.get("password") ?? "");
    const nextErrors: FormErrors = {};
    if (isSignup && !String(form.get("fullName") ?? "").trim()) nextErrors.fullName = "Enter your full name.";
    if (!email) nextErrors.email = "Enter your email address.";
    else if (!emailPattern.test(email)) nextErrors.email = "Enter a valid email address.";
    if (!password) nextErrors.password = "Enter your password.";
    else if (password.length < 8) nextErrors.password = "Password must be at least 8 characters.";
    if (isSignup) {
      const confirm = String(form.get("confirmPassword") ?? "");
      if (!confirm) nextErrors.confirmPassword = "Confirm your password.";
      else if (confirm !== password) nextErrors.confirmPassword = "Passwords do not match.";
      if (!form.get("terms")) nextErrors.terms = "Agree to the Terms and Privacy Policy to continue.";
    }
    setErrors(nextErrors); setStatus("");
    if (Object.keys(nextErrors).length) return;
    setLoading(true);
    const supabase = createClient();
    const result = isSignup
      ? await supabase.auth.signUp({ email, password, options: { data: { full_name: String(form.get("fullName") ?? "").trim() }, emailRedirectTo: process.env.NEXT_PUBLIC_DEV_SUPABASE_REDIRECT_URL ?? `${window.location.origin}/auth/callback` } })
      : await supabase.auth.signInWithPassword({ email, password });
    setLoading(false);
    if (result.error) { setStatus(isSignup ? "We could not create your account. Check your details and try again." : "Invalid email or password."); return; }
    if (isSignup && !result.data.session) { setStatus("Account created. Check your email to confirm your address before signing in."); return; }
    router.push("/dashboard"); router.refresh();
  }

  return (
    <main className="flex min-h-screen items-center justify-center bg-[#080d0b] px-4 py-10 sm:px-6"><section className="w-full max-w-md">
      <Link href="/" className="mx-auto mb-8 flex w-fit items-center gap-3" aria-label="Boarvest home"><Image src="/image/boarvest-logo.png" alt="Boarvest logo" width={44} height={44} priority /><span className="text-2xl font-extrabold tracking-tight text-white">Boar<span className="text-emerald-400">vest</span></span></Link>
      <div className="rounded-3xl border border-white/[0.1] bg-[#0d1511] p-6 shadow-2xl shadow-black/20 sm:p-8"><div className="mb-8 text-center"><p className="mb-3 text-xs font-extrabold uppercase tracking-[0.2em] text-emerald-400">Welcome to Boarvest</p><h1 className="text-3xl font-black tracking-tight text-white">{isSignup ? "Create your account" : "Welcome back"}</h1><p className="mt-3 text-sm leading-6 text-gray-400">{isSignup ? "Start your journey toward a clearer digital asset experience." : "Sign in to continue to your Boarvest account."}</p></div>
        <form onSubmit={handleSubmit} noValidate className="flex flex-col gap-5" aria-describedby="form-status">
          {isSignup && <Field id="fullName" label="Full name" name="fullName" type="text" error={errors.fullName} autoComplete="name" />}
          <Field id="email" label="Email address" name="email" type="email" error={errors.email} autoComplete="email" />
          <PasswordField id="password" label="Password" name="password" error={errors.password} visible={showPassword} onToggle={() => setShowPassword(!showPassword)} autoComplete={isSignup ? "new-password" : "current-password"} />
          {isSignup && <PasswordField id="confirmPassword" label="Confirm password" name="confirmPassword" error={errors.confirmPassword} visible={showConfirmPassword} onToggle={() => setShowConfirmPassword(!showConfirmPassword)} autoComplete="new-password" />}
          {isSignup ? <div className="flex flex-col gap-2"><label className="flex items-start gap-3 text-sm leading-6 text-gray-400"><input name="terms" type="checkbox" className="mt-1 size-4 accent-emerald-400" /> <span>I agree to the <a href="#terms" className="font-semibold text-emerald-400">Terms</a> and <a href="#privacy" className="font-semibold text-emerald-400">Privacy Policy</a>.</span></label>{errors.terms && <p className="auth-error">{errors.terms}</p>}</div> : <div className="flex items-center justify-between gap-4 text-sm"><label className="flex items-center gap-3 text-gray-400"><input name="remember" type="checkbox" className="size-4 accent-emerald-400" /> Remember me</label><Link href="/forgot-password" className="font-semibold text-emerald-400">Forgot password?</Link></div>}
          <button type="submit" disabled={loading} className="button button-primary mt-1 w-full justify-center">{loading ? "Please wait…" : isSignup ? "Create account" : "Log in"}</button><p id="form-status" aria-live="polite" className={status ? "text-center text-sm text-emerald-300" : "sr-only"}>{status}</p>
        </form><p className="mt-7 text-center text-sm text-gray-400">{isSignup ? "Already have an account? " : "New to Boarvest? "}<Link href={isSignup ? "/login" : "/signup"} className="font-bold text-emerald-400">{isSignup ? "Log in" : "Sign up"}</Link></p>
      </div><p className="mt-6 text-center text-xs leading-5 text-gray-600">Your credentials are securely handled by Supabase.</p></section></main>
  );
}
function Field({ id, label, name, type, error, autoComplete }: { id: string; label: string; name: string; type: string; error?: string; autoComplete: string }) { return <div className="flex flex-col gap-2"><label htmlFor={id} className="text-sm font-semibold text-gray-200">{label}</label><input id={id} name={name} type={type} autoComplete={autoComplete} aria-invalid={Boolean(error)} className="auth-input" />{error && <p className="auth-error">{error}</p>}</div>; }
function PasswordField({ id, label, name, error, visible, onToggle, autoComplete }: { id: string; label: string; name: string; error?: string; visible: boolean; onToggle: () => void; autoComplete: string }) { return <div className="flex flex-col gap-2"><label htmlFor={id} className="text-sm font-semibold text-gray-200">{label}</label><div className="relative"><input id={id} name={name} type={visible ? "text" : "password"} autoComplete={autoComplete} aria-invalid={Boolean(error)} className="auth-input pr-20" /><button type="button" className="absolute right-3 top-1/2 -translate-y-1/2 text-xs font-bold text-emerald-400" onClick={onToggle} aria-label={visible ? `Hide ${label.toLowerCase()}` : `Show ${label.toLowerCase()}`}>{visible ? "Hide" : "Show"}</button></div>{error && <p className="auth-error">{error}</p>}</div>; }
