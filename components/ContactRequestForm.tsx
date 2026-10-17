"use client";

import { useState, type FormEvent } from "react";
import Link from "next/link";
import BrandLogo from "@/components/BrandLogo";
import { WHATSAPP_PHONE } from "@/lib/site-config";

export type ContactService = "buy" | "sell" | "repair";

const services: { value: ContactService; label: string }[] = [
  { value: "buy", label: "Buy" },
  { value: "sell", label: "Sell" },
  { value: "repair", label: "Repair" },
];

const phoneBrands = [
  "Apple",
  "Samsung",
  "OnePlus",
  "Xiaomi",
  "Google",
  "Nothing",
  "OPPO",
  "vivo",
  "Other",
];

const inputClass =
  "mt-2 w-full min-w-0 rounded-xl border border-black/10 bg-white px-4 py-3 text-sm text-[#222] outline-none placeholder:text-black/40 focus-visible:border-[#263D38] focus-visible:ring-2 focus-visible:ring-[#263D38]/20";

const messagePlaceholders: Record<ContactService, string> = {
  buy: "Which phone are you looking for?",
  sell: "Tell us about your phone and its condition.",
  repair: "Describe the issue with your phone.",
};

export default function ContactRequestForm({
  initialService = "repair",
}: {
  initialService?: ContactService;
}) {
  const [service, setService] = useState<ContactService>(initialService);
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [brand, setBrand] = useState("");
  const [model, setModel] = useState("");
  const [message, setMessage] = useState("");

  function submitForm(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const cleanName = name.trim();
    const cleanPhone = phone.trim();

    if (!cleanName || !/^[0-9+\-\s()]{7,20}$/.test(cleanPhone)) {
      return;
    }

    const serviceLabel = services.find((option) => option.value === service)?.label;
    const whatsappMessage = `Hello MR Mobile Wala!
Appointment Request

Service: ${serviceLabel}
Name: ${cleanName}
Phone: ${cleanPhone}
Phone Brand: ${brand || "Not specified"}
Phone Model: ${model.trim() || "Not specified"}
Message: ${message.trim() || "Not specified"}

Please contact me to confirm the appointment.`;

    window.location.assign(
      `https://wa.me/${WHATSAPP_PHONE}?text=${encodeURIComponent(whatsappMessage)}`,
    );
  }

  return (
    <main className="min-h-screen overflow-x-hidden bg-[#FAFAF8] px-4 py-5 text-[#222] sm:px-6 sm:py-8">
      <div className="mx-auto w-full max-w-3xl">
        <header className="mb-8 flex items-center justify-between gap-3 sm:mb-10">
          <BrandLogo variant="navbar" priority />
          <Link
            href="/"
            className="inline-flex min-h-11 shrink-0 items-center rounded-full border border-black/15 px-4 text-xs font-medium transition hover:bg-black/5 focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[#263D38] sm:text-sm"
          >
            <span aria-hidden="true" className="mr-2">
              &larr;
            </span>
            Back to Home
          </Link>
        </header>

        <section className="mb-6 sm:mb-8">
          <p className="mb-2 text-[10px] font-semibold uppercase tracking-[0.22em] text-[#263D38] sm:text-xs">
            Buy · Sell · Repair
          </p>
          <h1 className="text-4xl font-medium leading-tight tracking-[-0.045em] sm:text-5xl">
            Let&apos;s talk.
          </h1>
          <p className="mt-3 max-w-lg text-sm leading-6 text-black/65 sm:text-base">
            Tell us what you need, and we&apos;ll help you with the next step.
          </p>
        </section>

        <form
          onSubmit={submitForm}
          className="space-y-5 rounded-2xl border border-black/[0.07] bg-white p-4 sm:space-y-6 sm:rounded-3xl sm:p-7"
        >
          <fieldset>
            <legend className="mb-3 text-sm font-medium">Service</legend>
            <div className="grid grid-cols-3 gap-2 sm:gap-3">
              {services.map((option) => (
                <button
                  key={option.value}
                  type="button"
                  aria-pressed={service === option.value}
                  onClick={() => setService(option.value)}
                  className={`min-h-11 rounded-xl border px-2 py-3 text-sm font-medium transition focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#263D38] active:scale-[0.98] ${
                    service === option.value
                      ? "border-[#263D38] bg-[#263D38] text-white"
                      : "border-black/10 bg-[#FAFAF8] text-[#222] hover:border-black/30"
                  }`}
                >
                  {option.label}
                </button>
              ))}
            </div>
          </fieldset>

          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 sm:gap-5">
            <label className="block text-sm font-medium">
              Full Name *
              <input
                className={inputClass}
                value={name}
                onChange={(event) => setName(event.target.value)}
                placeholder="Enter your name"
                autoComplete="name"
                maxLength={100}
                required
              />
            </label>
            <label className="block text-sm font-medium">
              Phone Number *
              <input
                className={inputClass}
                type="tel"
                value={phone}
                onChange={(event) => setPhone(event.target.value)}
                placeholder="Enter contact number"
                autoComplete="tel"
                maxLength={20}
                pattern="[0-9+\-\s()]{7,20}"
                title="Enter a phone number using digits, spaces, +, parentheses, or hyphens."
                required
              />
            </label>
          </div>

          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 sm:gap-5">
            <label className="block text-sm font-medium">
              Phone Brand
              <select
                className={inputClass}
                value={brand}
                onChange={(event) => setBrand(event.target.value)}
              >
                <option value="">Select brand (optional)</option>
                {phoneBrands.map((phoneBrand) => (
                  <option key={phoneBrand} value={phoneBrand}>
                    {phoneBrand}
                  </option>
                ))}
              </select>
            </label>
            <label className="block text-sm font-medium">
              Phone Model
              <input
                className={inputClass}
                value={model}
                onChange={(event) => setModel(event.target.value)}
                placeholder="Enter phone model (optional)"
                maxLength={100}
              />
            </label>
          </div>

          <label className="block text-sm font-medium">
            Message
            <textarea
              className={`${inputClass} min-h-24 resize-y`}
              value={message}
              onChange={(event) => setMessage(event.target.value)}
              placeholder={messagePlaceholders[service]}
              maxLength={1000}
              rows={3}
            />
          </label>

          <button
            type="submit"
            className="flex min-h-12 w-full items-center justify-center gap-2 rounded-full bg-[#222] px-5 py-3 text-sm font-medium text-white transition hover:bg-[#263D38] focus-visible:outline-2 focus-visible:outline-offset-3 focus-visible:outline-[#263D38] active:scale-[0.99] sm:min-h-14 sm:text-base"
          >
            Continue on WhatsApp <span aria-hidden="true">↗</span>
          </button>

          <p className="text-center text-xs leading-5 text-black/55">
            Sending a request doesn&apos;t confirm an appointment. Our team will
            confirm it with you via WhatsApp.
          </p>
        </form>

        <footer className="py-5 text-center text-xs text-black/55 sm:py-7">
          Made with <span className="text-[#263D38]">♡</span> by MR Mobile Wala
        </footer>
      </div>
    </main>
  );
}
