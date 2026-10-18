
"use client";

import { useState, type FormEvent } from "react";
import { AnimatePresence, motion } from "motion/react";
import {
  ArrowLeft,
  ArrowRight,
  Check,
  LockKeyhole,
  ShieldCheck,
  Smartphone,
} from "lucide-react";
import BrandLogo from "@/components/BrandLogo";

type LoginStep = "phone" | "otp";

export default function LoginPage() {
  const [step, setStep] = useState<LoginStep>("phone");
  const [phone, setPhone] = useState("");
  const [otp, setOtp] = useState("");
  const [error, setError] = useState("");
  const [notice, setNotice] = useState("");
  const [loading, setLoading] = useState(false);

  function handlePhoneSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setError("");
    setNotice("");

    const cleanPhone = phone.replace(/\D/g, "");

    if (!/^[6-9]\d{9}$/.test(cleanPhone)) {
      setError("Please enter a valid 10-digit Indian mobile number.");
      return;
    }

    setPhone(cleanPhone);
    setStep("otp");
    setNotice(
      "Demo mode: SMS OTP abhi configure nahi hai. Koi SMS send nahi hua."
    );
  }

  function handleOtpSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setError("");
    setNotice("");

    if (!/^\d{6}$/.test(otp)) {
      setError("Please enter the 6-digit OTP.");
      return;
    }

    setError("OTP verification service configured nahi hai. Login nahi hua.");
  }

  function goBack() {
    setStep("phone");
    setOtp("");
    setError("");
    setNotice("");
  }

  return (
    <main className="relative flex min-h-[100svh] items-center justify-center overflow-hidden bg-[#fafaf9] px-4 py-8 text-[#171717] selection:bg-teal-100 sm:px-6">
      {/* Background atmosphere */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 overflow-hidden"
      >
        <div className="absolute left-1/2 top-[-220px] h-[400px] w-[600px] -translate-x-1/2 rounded-full bg-teal-100/40 blur-[110px]" />
        <div className="absolute bottom-[-220px] right-[-100px] h-[360px] w-[360px] rounded-full bg-stone-200/50 blur-[100px]" />
        <div className="absolute inset-0 bg-[radial-gradient(#a8a29e_0.6px,transparent_0.6px)] bg-[size:24px_24px] opacity-[0.13]" />
      </div>

      <motion.section
        initial={{ opacity: 0, y: 18 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.55, ease: "easeOut" }}
        className="relative z-10 w-full max-w-[430px]"
      >
        {/* Brand */}
        <div className="mb-8 flex flex-col items-center text-center sm:mb-10">
          <BrandLogo
            variant="login"
            href="/"
            priority
            className="mb-6"
          />

          <div className="mb-3 inline-flex items-center gap-2 rounded-full border border-teal-900/10 bg-white/80 px-3 py-1.5 shadow-sm backdrop-blur">
            <span className="h-1.5 w-1.5 rounded-full bg-teal-600" />
            <span className="text-[10px] font-semibold uppercase tracking-[0.18em] text-stone-600">
              Your trusted mobile store
            </span>
          </div>

          <h1 className="text-[30px] font-semibold tracking-[-0.055em] sm:text-[36px]">
            {step === "phone" ? (
              <>
                Welcome{" "}
                <span className="text-stone-400">back.</span>
              </>
            ) : (
              <>
                One last{" "}
                <span className="text-stone-400">step.</span>
              </>
            )}
          </h1>

          <p className="mt-2 max-w-[300px] text-sm leading-6 text-stone-500">
            {step === "phone"
              ? "Sign in with your mobile number for a seamless shopping experience."
              : `Enter the 6-digit code for +91 ${phone}.`}
          </p>
        </div>

        {/* Login card */}
        <div className="rounded-[28px] border border-black/[0.06] bg-white/90 p-5 shadow-[0_24px_80px_-32px_rgba(0,0,0,0.18)] backdrop-blur-xl sm:p-8">
          <AnimatePresence mode="wait">
            {step === "phone" ? (
              <motion.div
                key="phone"
                initial={{ opacity: 0, x: 12 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -12 }}
                transition={{ duration: 0.22 }}
              >
                <div className="mb-6 flex items-center gap-3">
                  <div className="flex h-11 w-11 items-center justify-center rounded-2xl bg-[#e8f3f0] text-[#087f70]">
                    <Smartphone size={21} strokeWidth={1.8} />
                  </div>

                  <div>
                    <h2 className="text-sm font-semibold">
                      Mobile number
                    </h2>
                    <p className="mt-0.5 text-xs text-stone-500">
                      Use your Indian mobile number
                    </p>
                  </div>
                </div>

                <form onSubmit={handlePhoneSubmit} noValidate>
                  <label
                    htmlFor="phone"
                    className="mb-2 block text-xs font-medium text-stone-600"
                  >
                    Phone number
                  </label>

                  <div className="flex h-[58px] items-center rounded-2xl border border-stone-200 bg-[#fafaf9] px-3 transition focus-within:border-teal-700 focus-within:bg-white focus-within:ring-4 focus-within:ring-teal-700/[0.08]">
                    <span className="flex shrink-0 items-center gap-2 border-r border-stone-200 pr-3 text-sm font-semibold">
                      <span aria-hidden="true">🇮🇳</span>
                      +91
                    </span>

                    <input
                      id="phone"
                      name="phone"
                      type="tel"
                      inputMode="numeric"
                      autoComplete="tel-national"
                      placeholder="00000 00000"
                      value={phone}
                      onChange={(event) => {
                        setPhone(
                          event.target.value.replace(/\D/g, "").slice(0, 10)
                        );
                        setError("");
                        setNotice("");
                      }}
                      maxLength={10}
                      aria-invalid={Boolean(error)}
                      aria-describedby={error ? "phone-error" : undefined}
                      className="h-full min-w-0 flex-1 bg-transparent px-3 text-base font-medium tracking-[0.08em] outline-none placeholder:font-normal placeholder:tracking-normal placeholder:text-stone-300"
                    />
                  </div>

                  {error && (
                    <p
                      id="phone-error"
                      role="alert"
                      className="mt-2 text-xs leading-5 text-red-600"
                    >
                      {error}
                    </p>
                  )}

                  <button
                    type="submit"
                    disabled={loading}
                    className="group mt-5 flex h-[54px] w-full items-center justify-center gap-2 rounded-2xl bg-[#087f70] px-4 text-sm font-semibold text-white shadow-[0_8px_20px_-8px_rgba(8,127,112,0.65)] transition duration-200 hover:bg-[#066b5f] active:scale-[0.99] disabled:cursor-not-allowed disabled:opacity-60"
                  >
                    Continue
                    <ArrowRight
                      size={17}
                      className="transition-transform duration-200 group-hover:translate-x-1"
                    />
                  </button>
                </form>
              </motion.div>
            ) : (
              <motion.div
                key="otp"
                initial={{ opacity: 0, x: 12 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -12 }}
                transition={{ duration: 0.22 }}
              >
                <button
                  type="button"
                  onClick={goBack}
                  className="mb-6 inline-flex items-center gap-2 rounded-lg text-xs font-medium text-stone-500 transition hover:text-stone-900 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-teal-700"
                >
                  <ArrowLeft size={15} />
                  Change mobile number
                </button>

                <div className="mb-5 flex items-center gap-3">
                  <div className="flex h-11 w-11 items-center justify-center rounded-2xl bg-[#e8f3f0] text-[#087f70]">
                    <ShieldCheck size={21} strokeWidth={1.8} />
                  </div>

                  <div>
                    <h2 className="text-sm font-semibold">
                      Verify your number
                    </h2>
                    <p className="mt-0.5 text-xs text-stone-500">
                      Enter your 6-digit OTP
                    </p>
                  </div>
                </div>

                <form onSubmit={handleOtpSubmit} noValidate>
                  <label
                    htmlFor="otp"
                    className="mb-2 block text-xs font-medium text-stone-600"
                  >
                    Verification code
                  </label>

                  <input
                    id="otp"
                    name="otp"
                    type="text"
                    inputMode="numeric"
                    autoComplete="one-time-code"
                    placeholder="000000"
                    value={otp}
                    onChange={(event) => {
                      setOtp(
                        event.target.value.replace(/\D/g, "").slice(0, 6)
                      );
                      setError("");
                    }}
                    maxLength={6}
                    aria-invalid={Boolean(error)}
                    className="h-[58px] w-full rounded-2xl border border-stone-200 bg-[#fafaf9] px-4 text-center text-2xl font-semibold tracking-[0.5em] outline-none transition placeholder:text-stone-300 focus:border-teal-700 focus:bg-white focus:ring-4 focus:ring-teal-700/[0.08]"
                  />

                  {notice && (
                    <p
                      role="status"
                      className="mt-3 rounded-xl bg-amber-50 px-3 py-2.5 text-xs leading-5 text-amber-800"
                    >
                      {notice}
                    </p>
                  )}

                  {error && (
                    <p role="alert" className="mt-3 text-xs text-red-600">
                      {error}
                    </p>
                  )}

                  <button
                    type="submit"
                    className="group mt-5 flex h-[54px] w-full items-center justify-center gap-2 rounded-2xl bg-[#087f70] px-4 text-sm font-semibold text-white transition hover:bg-[#066b5f] active:scale-[0.99]"
                  >
                    Verify & continue
                    <ArrowRight
                      size={17}
                      className="transition-transform group-hover:translate-x-1"
                    />
                  </button>
                </form>
              </motion.div>
            )}
          </AnimatePresence>

          <div className="my-6 flex items-center gap-3">
            <div className="h-px flex-1 bg-stone-100" />
            <span className="text-[10px] font-medium uppercase tracking-[0.15em] text-stone-400">
              Secure access
            </span>
            <div className="h-px flex-1 bg-stone-100" />
          </div>

          <div className="flex items-start gap-3 rounded-2xl bg-stone-50 p-3.5">
            <LockKeyhole
              size={17}
              className="mt-0.5 shrink-0 text-[#087f70]"
            />
            <p className="text-[11px] leading-[1.7] text-stone-500">
              Your number is used for secure sign-in and account-related
              updates. We never display your private information publicly.
            </p>
          </div>
        </div>

        {/* Trust indicators */}
        <div className="mt-6 flex flex-wrap items-center justify-center gap-x-5 gap-y-2 text-[10px] font-medium text-stone-400">
          <span className="inline-flex items-center gap-1.5">
            <ShieldCheck size={13} />
            Secure sign-in
          </span>
          <span className="inline-flex items-center gap-1.5">
            <Check size={13} />
            Simple &amp; convenient
          </span>
        </div>

        <p className="mt-5 text-center text-[10px] leading-5 text-stone-400">
          By continuing, you agree to our{" "}
          <a
            href="/terms"
            className="text-stone-600 underline underline-offset-2 hover:text-teal-700"
          >
            Terms
          </a>{" "}
          and{" "}
          <a
            href="/privacy"
            className="text-stone-600 underline underline-offset-2 hover:text-teal-700"
          >
            Privacy Policy
          </a>
          .
        </p>
      </motion.section>
    </main>
  );
}
