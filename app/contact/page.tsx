import type { Metadata } from "next";
import ContactRequestForm, {
  type ContactService,
} from "@/components/ContactRequestForm";
import { SITE_URL } from "@/lib/site-config";

const title = "Contact MR Mobile Wala";
const description =
  "Talk to MR Mobile Wala about buying, selling, or repairing a phone.";

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
  return value === "buy" || value === "sell" || value === "repair";
}

export default async function ContactPage({
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
