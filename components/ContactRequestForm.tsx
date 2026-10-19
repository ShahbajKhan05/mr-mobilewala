
"use client";

import Image from "next/image";
import { useRef, useState, type FormEvent } from "react";
import BrandLogo from "@/components/BrandLogo";

const BUSINESS_PHONE = "919131383323";
const BUSINESS_PHONE_DISPLAY = "+91 91313 83323";
const BUSINESS_EMAIL = "mrmobilewala610@gmail.com";
const OWNER_PORTRAIT = "/Contact.png";

export type ContactService =
  | "buy"
  | "sell"
  | "repair"
  | "accessories"
  | "other";

const services: { value: ContactService; label: string }[] = [
  { value: "buy", label: "Buy a phone" },
  { value: "sell", label: "Sell or exchange a phone" },
  { value: "repair", label: "Phone repair" },
  { value: "accessories", label: "Accessories" },
  { value: "other", label: "Other enquiry" },
];

const messagePlaceholders: Record<ContactService, string> = {
  buy: "The phone you have in mind, your budget, or what matters to you.",
  sell: "Your phone model, its condition, and what you have in mind.",
  repair: "Your phone model and a short description of the issue.",
  accessories: "What you are looking for and which phone you use.",
  other: "Tell us a little about how we can help.",
};

type ContactField =
  | "firstName"
  | "lastName"
  | "email"
  | "phone"
  | "message";

type SubmissionState = "idle" | "opening" | "prepared" | "blocked";

const inputClass =
  "mt-2.5 min-h-14 w-full min-w-0 rounded-xl border border-black/15 bg-white px-4 py-3.5 text-base leading-6 text-[#191a18] outline-none transition duration-200 placeholder:text-black/45 placeholder:text-sm focus:border-[#e1306c] focus:ring-4 focus:ring-[#e1306c]/10 sm:text-lg sm:placeholder:text-base";

const labelClass =
  "block min-w-0 text-sm font-semibold leading-6 text-[#262626] sm:text-base";

const errorClass =
  "mt-2 block text-sm leading-6 text-red-700";

const serviceStrip = [
  {
    label: "Buy phones",
    path: "M7 3.75h10a1.5 1.5 0 0 1 1.5 1.5v14.5a1.5 1.5 0 0 1-1.5 1.5H7a1.5 1.5 0 0 1-1.5-1.5V5.25A1.5 1.5 0 0 1 7 3.75ZM9.5 17.75h5",
  },
  {
    label: "Sell or exchange",
    path: "M7 7h11l-2.5-2.5M18 7l-2.5 2.5M17 17H6l2.5 2.5M6 17l2.5-2.5",
  },
  {
    label: "Repair services",
    path: "m14.5 6.5 3-3a4 4 0 0 1-5 5l-7 7a2.12 2.12 0 0 0 3 3l7-7a4 4 0 0 0 5-5l-3 3Z",
  },
  {
    label: "Accessories",
    path: "M4.75 8.25h14.5v10.5H4.75zM9 8.25V6a3 3 0 0 1 6 0v2.25",
  },
];

export default function ContactRequestForm({
  initialService = "repair",
}: {
  initialService?: ContactService;
}) {
  const [service, setService] =
    useState<ContactService>(initialService);

  const [errors, setErrors] = useState<
    Partial<Record<ContactField, string>>
  >({});

  const [submissionState, setSubmissionState] =
    useState<SubmissionState>("idle");

  const [whatsAppUrl, setWhatsAppUrl] = useState("");

  const firstNameRef = useRef<HTMLInputElement>(null);
  const lastNameRef = useRef<HTMLInputElement>(null);
  const emailRef = useRef<HTMLInputElement>(null);
  const phoneRef = useRef<HTMLInputElement>(null);
  const messageRef = useRef<HTMLTextAreaElement>(null);

  function clearError(field: ContactField) {
    setErrors((current) => {
      if (!current[field]) return current;

      const next = { ...current };
      delete next[field];
      return next;
    });
  }

  function submitForm(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();

    if (submissionState === "opening") return;

    const values = new FormData(event.currentTarget);

    const firstName = String(values.get("firstName") ?? "").trim();
    const lastName = String(values.get("lastName") ?? "").trim();
    const email = String(values.get("email") ?? "").trim();
    const phone = String(values.get("phone") ?? "").trim();
    const message = String(values.get("message") ?? "").trim();

    const nextErrors: Partial<Record<ContactField, string>> = {};

    if (!firstName) {
      nextErrors.firstName = "Please enter your first name.";
    }

    if (!lastName) {
      nextErrors.lastName = "Please enter your last name.";
    }

    if (email && !emailRef.current?.checkValidity()) {
      nextErrors.email =
        "Enter a valid email address, or leave this blank.";
    }

    const digitCount = (phone.match(/[0-9]/g) ?? []).length;

    if (
      !/^[0-9+()\s-]{7,20}$/.test(phone) ||
      digitCount < 7 ||
      digitCount > 15
    ) {
      nextErrors.phone =
        "Enter a valid phone number, including its area code.";
    }

    if (message.length < 8) {
      nextErrors.message =
        "Please add at least a few details about your enquiry.";
    }

    if (Object.keys(nextErrors).length > 0) {
      setErrors(nextErrors);
      setSubmissionState("idle");

      const firstInvalidField = (
        ["firstName", "lastName", "email", "phone", "message"] as const
      ).find((field) => nextErrors[field]);

      const fieldRefs: Record<
        ContactField,
        { current: HTMLElement | null }
      > = {
        firstName: firstNameRef,
        lastName: lastNameRef,
        email: emailRef,
        phone: phoneRef,
        message: messageRef,
      };

      if (firstInvalidField) {
        fieldRefs[firstInvalidField].current?.focus();
      }

      return;
    }

    const serviceLabel = services.find(
      (option) => option.value === service,
    )?.label;

    const whatsAppMessage = [
      "Hello MR Mobile Wala, I'd like some help with an enquiry.",
      "",
      `Enquiry: ${serviceLabel}`,
      `Name: ${firstName} ${lastName}`,
      `Phone / WhatsApp: ${phone}`,
      ...(email ? [`Email: ${email}`] : []),
      `Details: ${message}`,
    ].join("\n");

    const destination =
      `https://wa.me/${BUSINESS_PHONE}?text=` +
      encodeURIComponent(whatsAppMessage);

    setErrors({});
    setWhatsAppUrl(destination);
    setSubmissionState("opening");

    const whatsAppWindow = window.open(destination, "_blank");

    if (whatsAppWindow) {
      whatsAppWindow.opener = null;
      setSubmissionState("prepared");
    } else {
      setSubmissionState("blocked");
    }
  }

  return (
    <main className="min-h-screen overflow-x-clip bg-[#FAFAF8] px-4 pb-12 pt-24 text-[#191a18] sm:px-8 sm:pb-14 sm:pt-28 lg:px-10">
      <header className="mx-auto max-w-3xl text-center">
        <p className="text-xs font-bold uppercase tracking-[0.2em] text-[#e1306c] sm:text-sm sm:tracking-[0.25em]">
          Buy · Sell · Repair
        </p>

        <h1 className="contact-heading-3d mx-auto mt-4 max-w-3xl text-[clamp(2.4rem,7vw,4.5rem)] font-extrabold leading-[1.02] tracking-[-0.055em]">
          Your Phone. Your Needs.
          <span className="contact-heading-accent block">
            Our Expertise.
          </span>
        </h1>

        <p className="mx-auto mt-5 max-w-xl text-base leading-7 text-black/65 sm:text-lg sm:leading-8">
          From buying a new phone to getting it repaired, we make it easy for you.
        </p>
      </header>

      <section
        aria-label="Contact MR Mobile Wala"
        className="mx-auto mt-7 grid w-full max-w-6xl overflow-hidden rounded-2xl border border-black/[0.08] bg-white shadow-[0_24px_80px_rgba(35,20,45,0.09)] sm:mt-10 sm:rounded-3xl lg:grid-cols-[1.1fr_0.9fr]"
      >
        <div className="min-w-0 p-5 sm:p-8 lg:p-10">
          <div className="mb-7 sm:mb-8">
            <p className="text-xs font-bold uppercase tracking-[0.2em] text-[#e1306c] sm:text-sm">
              Let&apos;s talk
            </p>

            <h2 className="mt-2.5 text-2xl font-bold tracking-[-0.035em] sm:text-3xl">
              Send us an enquiry
            </h2>

            <p className="mt-2.5 text-base leading-7 text-black/60 sm:text-lg">
              Share a few details and we&apos;ll take it from there.
            </p>
          </div>

          <form
            noValidate
            onSubmit={submitForm}
            className="space-y-5 sm:space-y-6"
          >
            <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 sm:gap-4">
              <label className={labelClass}>
                First name
                <input
                  ref={firstNameRef}
                  className={inputClass}
                  name="firstName"
                  type="text"
                  autoComplete="given-name"
                  placeholder="Your first name"
                  maxLength={80}
                  required
                  aria-invalid={Boolean(errors.firstName)}
                  aria-describedby={
                    errors.firstName ? "first-name-error" : undefined
                  }
                  onChange={() => clearError("firstName")}
                />

                {errors.firstName && (
                  <span
                    id="first-name-error"
                    role="alert"
                    className={errorClass}
                  >
                    {errors.firstName}
                  </span>
                )}
              </label>

              <label className={labelClass}>
                Last name
                <input
                  ref={lastNameRef}
                  className={inputClass}
                  name="lastName"
                  type="text"
                  autoComplete="family-name"
                  placeholder="Your last name"
                  maxLength={80}
                  required
                  aria-invalid={Boolean(errors.lastName)}
                  aria-describedby={
                    errors.lastName ? "last-name-error" : undefined
                  }
                  onChange={() => clearError("lastName")}
                />

                {errors.lastName && (
                  <span
                    id="last-name-error"
                    role="alert"
                    className={errorClass}
                  >
                    {errors.lastName}
                  </span>
                )}
              </label>
            </div>

            <label className={labelClass}>
              Email address{" "}
              <span className="font-normal text-black/55">
                (optional)
              </span>

              <input
                ref={emailRef}
                className={inputClass}
                name="email"
                type="email"
                autoComplete="email"
                inputMode="email"
                placeholder="you@example.com"
                maxLength={254}
                aria-invalid={Boolean(errors.email)}
                aria-describedby={errors.email ? "email-error" : undefined}
                onChange={() => clearError("email")}
              />

              {errors.email && (
                <span
                  id="email-error"
                  role="alert"
                  className={errorClass}
                >
                  {errors.email}
                </span>
              )}
            </label>

            <label className={labelClass}>
              Phone / WhatsApp number

              <input
                ref={phoneRef}
                className={inputClass}
                name="phone"
                type="tel"
                autoComplete="tel"
                inputMode="tel"
                placeholder="+91 98765 43210"
                maxLength={20}
                required
                aria-invalid={Boolean(errors.phone)}
                aria-describedby={errors.phone ? "phone-error" : undefined}
                onChange={() => clearError("phone")}
              />

              <span className="mt-2 block text-sm font-normal leading-6 text-black/55">
                Include your country code if you are outside India.
              </span>

              {errors.phone && (
                <span
                  id="phone-error"
                  role="alert"
                  className={errorClass}
                >
                  {errors.phone}
                </span>
              )}
            </label>

            <label className={labelClass}>
              What can we help with?

              <select
                className={`${inputClass} appearance-none`}
                name="service"
                value={service}
                onChange={(event) =>
                  setService(event.target.value as ContactService)
                }
                required
              >
                {services.map((option) => (
                  <option key={option.value} value={option.value}>
                    {option.label}
                  </option>
                ))}
              </select>
            </label>

            <label className={labelClass}>
              Message / phone details

              <textarea
                ref={messageRef}
                className={`${inputClass} min-h-40 resize-y leading-7`}
                name="message"
                placeholder={messagePlaceholders[service]}
                maxLength={1000}
                rows={5}
                required
                aria-invalid={Boolean(errors.message)}
                aria-describedby={
                  errors.message ? "message-error" : undefined
                }
                onChange={() => clearError("message")}
              />

              <span className="mt-2 block text-sm font-normal leading-6 text-black/55">
                Add your phone model, budget, or details about the problem.
              </span>

              {errors.message && (
                <span
                  id="message-error"
                  role="alert"
                  className={errorClass}
                >
                  {errors.message}
                </span>
              )}
            </label>

            <button
              type="submit"
              disabled={submissionState === "opening"}
              className="flex min-h-14 w-full items-center justify-center gap-3 rounded-xl bg-gradient-to-r from-[#ff792d] via-[#e1306c] to-[#833ab4] px-5 py-4 text-base font-bold text-white shadow-[0_8px_24px_rgba(225,48,108,0.2)] transition duration-300 hover:-translate-y-0.5 hover:shadow-[0_12px_30px_rgba(225,48,108,0.3)] focus-visible:outline-2 focus-visible:outline-offset-3 focus-visible:outline-[#833ab4] disabled:cursor-wait disabled:opacity-75 sm:min-h-16 sm:text-lg"
            >
              {submissionState === "opening"
                ? "Opening WhatsApp…"
                : "Send enquiry on WhatsApp"}

              {submissionState !== "opening" && (
                <svg
                  aria-hidden="true"
                  width="20"
                  height="20"
                  viewBox="0 0 16 16"
                  fill="none"
                >
                  <path
                    d="M3 8h9m-4-4 4 4-4 4"
                    stroke="currentColor"
                    strokeWidth="1.5"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>
              )}
            </button>

            <p className="text-center text-sm leading-6 text-black/55">
              WhatsApp will open with your message ready to review and send.
            </p>

            {submissionState === "prepared" && (
              <p
                role="status"
                aria-live="polite"
                className="text-base leading-7 text-[#c02670]"
              >
                WhatsApp opened in a new tab. Your enquiry is not sent yet;
                review it and press Send in WhatsApp.
              </p>
            )}

            {submissionState === "blocked" && (
              <div
                role="status"
                aria-live="polite"
                className="text-base leading-7 text-[#c02670]"
              >
                <p>
                  Your browser blocked the new tab. Open WhatsApp to review
                  and send your enquiry.
                </p>

                <a
                  href={whatsAppUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="mt-3 inline-flex min-h-12 items-center font-semibold underline underline-offset-4"
                >
                  Open WhatsApp ↗
                </a>
              </div>
            )}
          </form>
        </div>

        <aside className="contact-portrait-panel relative isolate flex min-w-0 flex-col justify-between overflow-hidden border-t border-white/20 p-5 text-white sm:p-8 lg:border-l lg:border-t-0 lg:p-10">
          <Image
            src={OWNER_PORTRAIT}
            alt="Ainul Khan, owner of MR Mobile Wala"
            fill
            sizes="(max-width: 1023px) 100vw, 45vw"
            priority
            className="contact-owner-portrait -z-20 object-cover object-center"
          />

          <div
            aria-hidden="true"
            className="pointer-events-none absolute inset-0 -z-10 bg-black/25"
          />

          <div
            aria-hidden="true"
            className="pointer-events-none absolute inset-0 -z-10 bg-[linear-gradient(to_top,rgba(0,0,0,0.45),transparent_65%)]"
          />

          <div className="relative">
            <BrandLogo
              variant="custom"
              width={480}
              href="/"
              withSurface
              className="inline-flex max-w-full rounded-2xl shadow-[0_12px_35px_rgba(30,10,35,0.15)]"
              imageClassName="!w-[156px] sm:!w-[176px]"
            />

            <p className="mt-7 text-xs font-bold uppercase tracking-[0.2em] text-white/90 sm:text-sm">
              Farhan Ansari, Owner
            </p>
          </div>

          <div className="relative mt-12">
            <p className="mb-3 text-xs font-bold uppercase tracking-[0.2em] text-white/85 sm:text-sm">
              Get in touch directly
            </p>

            <div className="divide-y divide-white/25 border-y border-white/25">
              <a
                href={`tel:+${BUSINESS_PHONE}`}
                className="flex min-h-16 items-center justify-between gap-4 py-4 text-base transition hover:translate-x-1 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white"
              >
                <span className="text-white/85">Call</span>
                <span className="text-right font-semibold">
                  {BUSINESS_PHONE_DISPLAY} ↗
                </span>
              </a>

              <a
                href={`https://wa.me/${BUSINESS_PHONE}`}
                target="_blank"
                rel="noopener noreferrer"
                className="flex min-h-16 items-center justify-between gap-4 py-4 text-base transition hover:translate-x-1 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white"
              >
                <span className="text-white/85">WhatsApp</span>
                <span className="text-right font-semibold">
                  {BUSINESS_PHONE_DISPLAY} ↗
                </span>
              </a>

              <a
                href={`mailto:${BUSINESS_EMAIL}`}
                className="flex min-h-16 items-center justify-between gap-4 py-4 text-base transition hover:translate-x-1 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white"
              >
                <span className="text-white/85">Email</span>
                <span className="break-all text-right font-semibold">
                  {BUSINESS_EMAIL}
                </span>
              </a>
            </div>

            <p className="mt-4 text-sm leading-6 text-white/80">
              Business hours: Please call or WhatsApp to confirm availability.
            </p>
          </div>
        </aside>
      </section>

      <section
        aria-labelledby="contact-services-title"
        className="mx-auto mt-10 w-full max-w-6xl border-t border-black/10 pt-8 sm:mt-12 sm:pt-10"
      >
        <h2
          id="contact-services-title"
          className="text-center text-xs font-extrabold uppercase tracking-[0.2em] text-[#1E1E1E] sm:text-sm"
        >
          Here for your next step
        </h2>

        <ul className="mx-auto mt-7 grid w-full max-w-3xl grid-cols-2 gap-x-5 gap-y-5 sm:grid-cols-4 sm:gap-4">
          {serviceStrip.map((item) => (
            <li
              key={item.label}
              className="flex min-w-0 items-center justify-start gap-3 text-left text-sm font-bold leading-6 text-[#1E1E1E] sm:justify-center sm:text-base"
            >
              <span className="flex size-11 shrink-0 items-center justify-center rounded-full border border-[#1E1E1E]/15 bg-white text-[#1E1E1E] shadow-sm">
                <svg
                  aria-hidden="true"
                  width="20"
                  height="20"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="1.5"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <path d={item.path} />
                </svg>
              </span>

              <span className="min-w-0">{item.label}</span>
            </li>
          ))}
        </ul>
      </section>

      <style jsx global>{`
        .contact-heading-3d {
          color: #222027;
          text-shadow:
            0 1px 0 #ffffff,
            0 2px 0 #e8e4eb,
            0 3px 0 #d8d2df,
            0 7px 15px rgba(35, 20, 45, 0.1);
        }

        .contact-heading-accent {
          color: transparent;
          background: linear-gradient(
            100deg,
            #ff792d 0%,
            #e1306c 45%,
            #833ab4 100%
          );
          background-clip: text;
          -webkit-background-clip: text;
          filter: drop-shadow(0 5px 8px rgba(142, 48, 112, 0.12));
        }

        .contact-portrait-panel {
          background: transparent;
          isolation: isolate;
        }

        .contact-owner-portrait {
          transform: scale(1.01);
          object-position: center 25%;
        }

        @media (min-width: 1024px) {
          .contact-portrait-panel {
            min-height: 100%;
          }

          .contact-owner-portrait {
            object-position: center 20%;
          }
        }

        @media (prefers-reduced-motion: reduce) {
          .contact-portrait-panel *,
          .contact-heading-accent {
            scroll-behavior: auto;
            animation: none;
            transition: none;
          }
        }
      `}</style>
    </main>
  );
}
