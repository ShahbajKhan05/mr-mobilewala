
import type { Metadata } from "next";
import Link from "next/link";
import BrandLogo from "@/components/BrandLogo";

export const metadata: Metadata = {
  title: "Privacy Policy | Mr. Mobile Wala",
  description:
    "Learn how Mr. Mobile Wala collects, uses, and protects your personal information.",
};

const sections = [
  {
    id: "information",
    title: "1. Information We Collect",
    paragraphs: [
      "When you use Mr. Mobile Wala, we may collect information that you provide directly, such as your name, mobile number, email address, delivery address, and details required to process your orders.",
      "We may also collect basic technical information, such as browser type, device information, and website usage data, to maintain and improve our services.",
    ],
  },
  {
    id: "usage",
    title: "2. How We Use Your Information",
    paragraphs: [
      "We use your information to process orders, provide customer support, manage your account, communicate important updates, and improve your shopping experience.",
      "We may use your contact information to send order-related messages and service notifications. Marketing communications, where applicable, should follow your preferences and applicable law.",
    ],
  },
  {
    id: "sharing",
    title: "3. Information Sharing",
    paragraphs: [
      "We do not sell your personal information. We may share the information necessary to provide our services with trusted service providers, such as delivery partners, payment processors, and technical service providers.",
      "We may also disclose information when required by applicable law or to protect our legal rights and the security of our users.",
    ],
  },
  {
    id: "security",
    title: "4. Data Security",
    paragraphs: [
      "We take reasonable technical and organizational measures to protect your information against unauthorized access, loss, misuse, or alteration.",
      "No method of storing or transmitting information over the internet can be guaranteed to be completely secure.",
    ],
  },
  {
    id: "cookies",
    title: "5. Cookies and Website Technologies",
    paragraphs: [
      "Our website may use cookies or similar technologies to support essential functionality, remember preferences, understand website performance, and improve usability.",
      "You can manage cookies through your browser settings. Disabling certain cookies may affect some website features.",
    ],
  },
  {
    id: "retention",
    title: "6. Data Retention",
    paragraphs: [
      "We retain personal information for as long as reasonably necessary to provide our services, fulfill the purposes described in this policy, resolve disputes, and meet applicable legal obligations.",
    ],
  },
  {
    id: "rights",
    title: "7. Your Choices and Rights",
    paragraphs: [
      "Depending on applicable law, you may have the right to request access to, correction of, or deletion of your personal information, and to raise concerns about how your information is handled.",
      "You can contact us using the details provided below to submit a privacy-related request. We may need to verify your identity before processing it.",
    ],
  },
  {
    id: "children",
    title: "8. Children's Privacy",
    paragraphs: [
      "Our website is not intended to collect personal information from children in violation of applicable law. If you believe a child has provided personal information inappropriately, please contact us.",
    ],
  },
  {
    id: "changes",
    title: "9. Changes to This Policy",
    paragraphs: [
      "We may update this Privacy Policy when our practices or legal requirements change. Any revised version will be published on this page with an updated effective date.",
    ],
  },
  {
    id: "contact",
    title: "10. Contact Us",
    paragraphs: [
      "If you have questions, concerns, or requests regarding this Privacy Policy, please contact the Mr. Mobile Wala team through our official customer support channel.",
    ],
  },
];

export default function PrivacyPage() {
  return (
    <div className="min-h-screen bg-white text-[#202124]">
      <header className="sticky top-0 z-20 border-b border-[#dadce0] bg-white">
        <div className="mx-auto flex min-h-[68px] max-w-[1200px] items-center justify-between gap-4 px-5 sm:px-8">
          <div className="flex min-w-0 items-center gap-4 sm:gap-6">
            <BrandLogo
              variant="navbar"
              href="/"
              priority
              imageClassName="max-w-[125px] sm:max-w-[145px]"
            />
            <div className="h-7 w-px shrink-0 bg-[#dadce0]" />
            <h1 className="truncate text-lg font-normal tracking-[-0.3px] text-[#5f6368] sm:text-[22px]">
              Privacy
            </h1>
          </div>

          <Link
            href="/"
            className="shrink-0 rounded-md px-3 py-2 text-sm font-medium text-[#1a73e8] hover:bg-[#f1f3f4] focus-visible:outline-2 focus-visible:outline-[#1a73e8]"
          >
            Home
          </Link>
        </div>
      </header>

      <main className="mx-auto grid max-w-[1200px] grid-cols-1 gap-10 px-5 py-10 sm:px-8 sm:py-14 lg:grid-cols-[220px_minmax(0,720px)] lg:gap-16">
        <aside className="h-fit lg:sticky lg:top-[100px]">
          <p className="mb-3 text-xs font-medium uppercase tracking-[0.08em] text-[#5f6368]">
            On this page
          </p>

          <nav aria-label="Privacy policy sections">
            <ul className="space-y-1">
              {sections.map((section) => (
                <li key={section.id}>
                  <a
                    href={`#${section.id}`}
                    className="block rounded-md px-3 py-2 text-[13px] leading-5 text-[#3c4043] hover:bg-[#f1f3f4] hover:text-[#1a73e8] focus-visible:outline-2 focus-visible:outline-[#1a73e8]"
                  >
                    {section.title.replace(/^\d+\.\s*/, "")}
                  </a>
                </li>
              ))}
            </ul>
          </nav>
        </aside>

        <article className="min-w-0 max-w-[720px]">
          <p className="mb-3 text-sm font-medium text-[#5f6368]">
            Mr. Mobile Wala
          </p>

          <h2 className="text-[34px] font-normal leading-[1.2] tracking-[-1.1px] sm:text-[44px]">
            Privacy Policy
          </h2>

          <p className="mt-5 text-sm leading-7 text-[#5f6368]">
            Your privacy matters to us. This page explains how Mr. Mobile Wala
            may collect, use, store, and share information when you visit our
            website or use our services.
          </p>

          <div className="my-7 border-t border-[#dadce0]" />

          <p className="mb-10 text-xs leading-5 text-[#5f6368]">
            Effective date: October 19, 2026
          </p>

          <div className="space-y-10">
            {sections.map((section) => (
              <section
                key={section.id}
                id={section.id}
                className="scroll-mt-28"
              >
                <h3 className="mb-3 text-[20px] font-normal leading-7 tracking-[-0.2px]">
                  {section.title}
                </h3>

                <div className="space-y-4 text-[14px] leading-[1.85] text-[#3c4043]">
                  {section.paragraphs.map((paragraph, index) => (
                    <p key={index}>{paragraph}</p>
                  ))}
                </div>
              </section>
            ))}
          </div>

          <div className="mt-12 border-t border-[#dadce0] pt-6">
            <p className="text-sm leading-7 text-[#5f6368]">
              For other information about our website, visit our{" "}
              <Link
                href="/terms"
                className="text-[#1a73e8] hover:underline"
              >
                Terms and Conditions
              </Link>{" "}
              page.
            </p>
          </div>
        </article>
      </main>

      <footer className="border-t border-[#dadce0]">
        <div className="mx-auto flex max-w-[1200px] flex-col gap-4 px-5 py-6 text-xs text-[#5f6368] sm:flex-row sm:items-center sm:justify-between sm:px-8">
         <p>© 2026 Mr. Mobile Wala</p>

          <nav className="flex flex-wrap gap-x-5 gap-y-2">
            <Link href="/" className="hover:text-[#1a73e8]">
              Home
            </Link>
            <Link href="/privacy" className="hover:text-[#1a73e8]">
              Privacy
            </Link>
            <Link href="/terms" className="hover:text-[#1a73e8]">
              Terms
            </Link>
          </nav>
        </div>
      </footer>
    </div>
  );
}
