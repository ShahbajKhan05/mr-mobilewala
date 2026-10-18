
import Image from "next/image";
import Link from "next/link";

const services = [
  {
    title: "Latest Smartphones",
    description: "Explore phones from popular brands.",
    image: "/Logo.png",
    alt: "Smartphones displayed inside a mobile shop",
  },
  {
    title: "Accessories",
    description: "Covers, chargers, earphones and more.",
    image: "/Logo.png",
    alt: "Mobile accessories displayed in a shop",
  },
  {
    title: "Repair & Service",
    description: "Ask about support for your phone.",
    image: "/Logo.png",
    alt: "Technician repairing a smartphone",
  },
];

const highlights = [
  {
    icon: "▣",
    title: "What we offer",
    description: "Phones, accessories and repair.",
    color: "bg-white",
    iconColor: "text-[#7c3aed]",
  },
  {
    icon: "↗",
    title: "Our approach",
    description: "Clear options, shaped around you.",
    color: "bg-white",
    iconColor: "text-[#e1306c]",
  },
  {
    icon: "✓",
    title: "Our commitment",
    description: "Help you make an informed choice.",
    color: "bg-white",
    iconColor: "text-[#087443]",
  },
];

export default function AboutStory() {
  return (
    <main
      id="main-content"
      className="overflow-hidden bg-white font-sans text-[#1d1d1f] antialiased"
    >
      {/* Hero */}
      <section className="relative isolate overflow-hidden bg-[#f5f5f7]">
        <Image
          src="/unnamed.webp"
          alt="MR Mobile Wala mobile shop"
          fill
          priority
          sizes="100vw"
          className="object-cover object-center"
        />

        <div
          aria-hidden="true"
          className="absolute inset-0 bg-gradient-to-r from-white via-white/95 to-white/10 sm:via-white/85 sm:to-transparent"
        />

        <div className="relative mx-auto flex min-h-[340px] max-w-7xl items-center px-5 py-9 sm:min-h-[390px] sm:px-8 lg:min-h-[410px]">
          <div className="max-w-[510px]">
            <p className="text-[11px] font-semibold uppercase tracking-[0.22em] text-[#6e6e73]">
              About MR Mobile Wala
            </p>

            <h1 className="mt-4 text-[clamp(2.6rem,6vw,4.7rem)] font-semibold leading-[1.02] tracking-[-0.055em]">
              Your local
              <span className="block bg-gradient-to-r from-[#ff792d] via-[#e1306c] to-[#833ab4] bg-clip-text text-transparent">
                mobile store.
              </span>
            </h1>

            <p className="mt-4 text-sm font-medium text-[#424245] sm:text-base">
              Phones <span className="mx-1.5 text-[#a1a1a6]">·</span>
              Accessories <span className="mx-1.5 text-[#a1a1a6]">·</span>
              Repair <span className="mx-1.5 text-[#a1a1a6]">·</span>
              Exchange
            </p>

            <p className="mt-3 max-w-sm text-sm leading-6 text-[#515154] sm:text-base sm:leading-7">
              Technology ko simple banane ke liye, hum hamesha aapke saath hain.
            </p>

            <Link
              href="/contact"
              className="mt-5 inline-flex min-h-11 items-center gap-2 rounded-full bg-gradient-to-r from-[#ff792d] via-[#e1306c] to-[#833ab4] px-5 text-sm font-semibold text-white shadow-sm transition hover:brightness-105 focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[#833ab4]"
            >
              Talk to our team <span aria-hidden="true">→</span>
            </Link>

            <div className="mt-5 flex flex-wrap gap-x-4 gap-y-2 text-xs font-medium text-[#424245]">
              <span>✓ Trusted advice</span>
              <span>✓ Genuine products</span>
              <span>✓ Friendly support</span>
            </div>
          </div>
        </div>
      </section>

      {/* Compact highlight cards */}
      <section className="mx-auto grid max-w-7xl gap-3 px-4 py-4 sm:grid-cols-3 sm:px-7 sm:py-5">
        {highlights.map((item) => (
          <div
            key={item.title}
            className={`flex min-h-[88px] items-center gap-4 rounded-2xl border border-[#e8e8ed] p-4 sm:p-5 ${item.color}`}
          >
            <div
              className={`flex h-12 w-12 shrink-0 items-center justify-center rounded-full bg-[#f7f7fa] text-2xl font-medium ${item.iconColor}`}
              aria-hidden="true"
            >
              {item.icon}
            </div>

            <div>
              <h2 className="text-base font-semibold tracking-tight sm:text-lg">
                {item.title}
              </h2>
              <p className="mt-1 text-xs leading-5 text-[#6e6e73] sm:text-sm">
                {item.description}
              </p>
            </div>
          </div>
        ))}
      </section>

      {/* About text and service photos */}
      <section className="mx-auto grid max-w-7xl gap-6 px-5 py-5 sm:px-7 sm:py-7 lg:grid-cols-[0.9fr_1.7fr] lg:items-center">
        <div>
          <p className="text-[11px] font-semibold uppercase tracking-[0.2em] text-[#6e6e73]">
            A little about us
          </p>

          <h2 className="mt-3 text-3xl font-semibold leading-[1.1] tracking-[-0.045em] sm:text-4xl">
            Technology should feel{" "}
            <span className="bg-gradient-to-r from-[#ff792d] via-[#e1306c] to-[#833ab4] bg-clip-text text-transparent">
              personal.
            </span>
          </h2>

          <p className="mt-4 text-sm leading-6 text-[#6e6e73] sm:text-base">
            We help people explore smartphones, sell or exchange a device,
            find accessories, and ask about phone repairs.
          </p>

          <Link
            href="/contact"
            className="mt-4 inline-flex min-h-10 items-center gap-2 rounded-full border border-[#d2d2d7] px-5 text-sm font-medium transition hover:border-[#e1306c] hover:text-[#c02670] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#833ab4]"
          >
            Know more about us <span aria-hidden="true">→</span>
          </Link>
        </div>

        <div className="grid grid-cols-1 gap-4 sm:grid-cols-3">
          {services.map((service) => (
            <article key={service.title} className="min-w-0">
              <div className="relative h-48 overflow-hidden rounded-xl bg-[#f5f5f7] sm:h-36 lg:h-44">
                <Image
                  src={service.image}
                  alt={service.alt}
                  fill
                  sizes="(max-width: 639px) 90vw, (max-width: 1023px) 30vw, 300px"
                  className="object-cover transition duration-300 hover:scale-[1.03]"
                />
              </div>

              <h3 className="mt-2 text-sm font-semibold leading-5">
                {service.title}
              </h3>
              <p className="mt-1 text-xs leading-5 text-[#6e6e73]">
                {service.description}
              </p>
            </article>
          ))}
        </div>
      </section>

      {/* Shop photo and story */}
      <section className="mt-2 bg-[#fafafc]">
        <div className="mx-auto grid max-w-7xl items-center gap-6 px-5 py-6 sm:px-7 sm:py-8 md:grid-cols-[1.15fr_1fr]">
          <div className="relative h-[230px] overflow-hidden rounded-2xl bg-[#e8e8ed] sm:h-[300px]">
            <Image
              src="/unnamed.webp"
              alt="MR Mobile Wala store front"
              fill
              sizes="(max-width: 767px) 100vw, 55vw"
              className="object-cover"
            />
          </div>

          <div>
            <p className="text-[11px] font-semibold uppercase tracking-[0.2em] text-[#6e6e73]">
              Our story
            </p>

            <h2 className="mt-3 text-3xl font-semibold leading-[1.08] tracking-[-0.045em] sm:text-4xl">
              Making phone decisions{" "}
              <span className="bg-gradient-to-r from-[#ff792d] via-[#e1306c] to-[#833ab4] bg-clip-text text-transparent">
                simpler.
              </span>
            </h2>

            <p className="mt-4 text-sm leading-6 text-[#6e6e73] sm:text-base">
              Har enquiry ek conversation se shuru hoti hai. Apni need
              batayein, questions poochhein aur available options samajhkar
              agla step choose karein.
            </p>

            <div className="mt-5 flex flex-wrap gap-x-5 gap-y-3 text-xs font-medium text-[#424245]">
              <span>♧ Personal guidance</span>
              <span>◇ Clear options</span>
              <span>✓ Informed decisions</span>
            </div>

            <Link
              href="/contact"
              className="mt-5 inline-flex items-center gap-2 text-sm font-semibold text-[#c02670] hover:text-[#833ab4] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#833ab4]"
            >
              Talk to our team <span aria-hidden="true">→</span>
            </Link>
          </div>
        </div>
      </section>
    </main>
  );
}
