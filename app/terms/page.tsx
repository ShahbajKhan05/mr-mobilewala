
import type { Metadata } from "next";
import Link from "next/link";
import BrandLogo from "@/components/BrandLogo";

export const metadata: Metadata = {
  title: "Terms and Conditions | Mr. Mobile Wala",
  description:
    "Read the terms and conditions for using the Mr. Mobile Wala website and services.",
};

const sections = [
  {
    id: "acceptance",
    title: "1. Acceptance of Terms",
    paragraphs: [
      "These Terms and Conditions govern your access to and use of the Mr. Mobile Wala website and services. By accessing the website or placing an order, you agree to these terms.",
      "If you do not agree with these terms, please discontinue using the website.",
    ],
  },
  {
    id: "eligibility",
    title: "2. Eligibility and Accounts",
    paragraphs: [
      "You must be legally capable of entering into a binding agreement under applicable law to use our services.",
      "If you create an account, you are responsible for providing accurate information and taking reasonable steps to protect your account credentials and verification codes. You should notify us if you suspect unauthorized account access.",
    ],
  },
  {
    id: "products",
    title: "3. Products and Availability",
    paragraphs: [
      "We aim to display product descriptions, specifications, images, prices, and availability as accurately as reasonably possible. Actual product appearance, packaging, or included accessories may vary.",
      "Product listings are subject to availability. We reserve the right to correct listing errors and update product information before an order is accepted, subject to applicable law.",
    ],
  },
  {
    id: "pricing",
    title: "4. Prices and Payments",
    paragraphs: [
      "Prices, applicable taxes, delivery charges, and other fees will be shown during the purchase process where applicable.",
      "Orders may require payment through the payment methods offered at checkout. An order confirmation does not necessarily mean that payment has been successfully processed or that an order has been dispatched.",
      "Any cancellation, refund, or price-adjustment request will be handled according to the applicable policy and law.",
    ],
  },
  {
    id: "orders",
    title: "5. Orders and Cancellation",
    paragraphs: [
      "We may contact you to verify order details or resolve issues that prevent an order from being fulfilled.",
      "An order may be declined or cancelled where necessary because of stock unavailability, a pricing or listing error, suspected fraud, payment issues, or other legitimate reasons. Where payment has already been collected, eligible refunds will be handled in accordance with applicable law and our refund policy.",
    ],
  },
  {
    id: "delivery",
    title: "6. Shipping and Delivery",
    paragraphs: [
      "Delivery estimates are provided for guidance and may be affected by location, courier operations, weather, or other circumstances beyond our reasonable control.",
      "You are responsible for providing a complete and accurate delivery address and contact details. Please review the delivery information provided with your order.",
    ],
  },
  {
    id: "returns",
    title: "7. Returns, Refunds and Warranty",
    paragraphs: [
      "Return eligibility, exchange options, refund timelines, and warranty coverage depend on the product, the terms shown at purchase, and applicable law.",
      "Please review the applicable return and refund policy before ordering. Manufacturer warranties, where available, are subject to the relevant manufacturer's terms.",
      "Nothing in these terms excludes any consumer rights that cannot lawfully be excluded or restricted.",
    ],
  },
  {
    id: "acceptable-use",
    title: "8. Acceptable Use",
    paragraphs: [
      "You agree not to misuse the website, interfere with its operation, attempt unauthorized access, submit fraudulent orders, distribute malicious code, or use our services in violation of applicable law.",
      "We may take reasonable steps to protect the website, our customers, and our services from misuse.",
    ],
  },
  {
    id: "intellectual-property",
    title: "9. Intellectual Property",
    paragraphs: [
      "Unless otherwise stated, website content including text, graphics, branding, and design elements belongs to Mr. Mobile Wala or its respective licensors and is protected by applicable intellectual-property laws.",
      "You may not reproduce or commercially exploit website content without the necessary permission, except where permitted by law.",
    ],
  },
  {
    id: "third-party",
    title: "10. Third-Party Services",
    paragraphs: [
      "Our website may use third-party services for payments, delivery, analytics, or other functionality. Those services may be subject to their own terms and privacy policies.",
      "We are not responsible for third-party websites or services to the extent permitted by applicable law.",
    ],
  },
  {
    id: "liability",
    title: "11. Limitation of Liability",
    paragraphs: [
      "To the extent permitted by applicable law, Mr. Mobile Wala will not be liable for indirect or consequential losses arising from the use of the website where such exclusions are legally permitted.",
      "These terms do not limit liability or consumer remedies where such limitation is prohibited by law.",
    ],
  },
  {
    id: "changes",
    title: "12. Changes to These Terms",
    paragraphs: [
      "We may update these Terms and Conditions from time to time. Updated terms will be published on this page with a revised effective date where appropriate.",
      "Your continued use of the website after an update does not remove any rights you may have under applicable law.",
    ],
  },
  {
    id: "law",
    title: "13. Governing Law",
    paragraphs: [
      "These terms are subject to the laws applicable to the transaction and the parties, without limiting any mandatory consumer protections or jurisdictional rights that apply.",
    ],
  },
  {
    id: "contact",
    title: "14. Contact Us",
    paragraphs: [
      "For questions about these Terms and Conditions, orders, or our services, please contact the Mr. Mobile Wala team through the official customer support details published on our website.",
    ],
  },
];

export default function TermsPage() {
  return (
    <div className="min-h-screen bg-white text-[#202124]">
      {/* Simple Google-inspired header */}
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
              Terms
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
        {/* Table of contents */}
        <aside className="h-fit lg:sticky lg:top-[100px]">
          <p className="mb-3 text-xs font-medium uppercase tracking-[0.08em] text-[#5f6368]">
            On this page
          </p>

          <nav aria-label="Terms and conditions sections">
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

        {/* Main content */}
        <article className="min-w-0 max-w-[720px]">
          <p className="mb-3 text-sm font-medium text-[#5f6368]">
            Mr. Mobile Wala
          </p>

          <h2 className="text-[34px] font-normal leading-[1.2] tracking-[-1.1px] sm:text-[44px]">
            Terms and Conditions
          </h2>

          <p className="mt-5 text-sm leading-7 text-[#5f6368]">
            These terms explain the basic rules for accessing our website,
            purchasing products, and using the services provided by Mr. Mobile
            Wala. Please read them carefully before placing an order.
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
              To learn how we handle personal information, read our{" "}
              <Link
                href="/privacy"
                className="text-[#1a73e8] hover:underline"
              >
                Privacy Policy
              </Link>
              .
            </p>
          </div>
        </article>
      </main>

      {/* Simple footer */}
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
