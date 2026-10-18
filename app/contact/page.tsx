
import type { Metadata } from "next";
import { Suspense } from "react";
import ContactRequestForm, {
  type ContactService,
} from "@/components/ContactRequestForm";
import Footer from "@/components/Footer";
import Navbar from "@/components/Navbar";
import { SITE_URL } from "@/lib/site-config";

const title = "Contact Mr Mobile Wala | Ainul Khan";
const description =
  "Contact Mr Mobile Wala for phone sales, repairs, and accessories. Call or WhatsApp Ainul Khan, or email mrmobilewala610@gmail.com.";

export const metadata: Metadata = {
  title,
  description,
  ...(SITE_URL ? { alternates: { canonical: "/contact" } } : {}),
  openGraph: {
    type: "website",
    locale: "en_IN",
    siteName: "MR Mobile Wala",
    title,
    description,
    ...(SITE_URL ? { url: new URL("/contact", SITE_URL).toString() } : {}),
  },
  twitter: {
    card: "summary",
    title,
    description,
  },
};

function isContactService(value: string): value is ContactService {
  return (
    value === "buy" ||
    value === "sell" ||
    value === "repair" ||
    value === "accessories" ||
    value === "other"
  );
}

function ContactFormFallback() {
  return (
    <main
      className="grid min-h-[60svh] place-items-center bg-[#FAFAF8] px-4 py-12 text-sm text-black/55"
      aria-busy="true"
    >
      <p role="status">Loading contact form…</p>
    </main>
  );
}

export default function ContactPage({
  searchParams,
}: {
  searchParams: Promise<{ service?: string | string[] }>;
}) {
  return (
    <div className="flex min-h-screen flex-col">
      <Navbar />
      <Suspense fallback={<ContactFormFallback />}>
        <ContactPageContent searchParams={searchParams} />
      </Suspense>
      <Footer />
    </div>
  );
}

async function ContactPageContent({
  searchParams,
}: {
  searchParams: Promise<{ service?: string | string[] }>;
}) {
  const requestedService = (await searchParams).service;
  const serviceValue = Array.isArray(requestedService)
    ? requestedService[0]
    : requestedService;

  const service: ContactService =
    serviceValue && isContactService(serviceValue) ? serviceValue : "repair";

  return <ContactRequestForm initialService={service} />;
}
