import Image from "next/image";
import Link from "next/link";
import TeamCarousel from "@/components/TeamCarousel";
const BRAND_FACTS = [
  {
    label: "What we offer",
    statement: "Phones, accessories and repair.",
  },
  {
    label: "Our approach",
    statement: "Clear options, shaped around you.",
  },
  {
    label: "Our commitment",
    statement: "Help you make an informed choice.",
  },
];

const VALUES = [
  {
    number: "01",
    title: "Personal guidance",
    description:
      "We begin with your needs, so the conversation stays about what matters to you.",
  },
  {
    number: "02",
    title: "Clear options",
    description:
      "Explore phones, services, and accessories with straightforward information.",
  },
  {
    number: "03",
    title: "Informed decisions",
    description:
      "Take the time to consider your options and choose a next step with confidence.",
  },
];

export default function AboutStory() {
  return (
    <main id="main-content" className="bg-[#FAFAF8] text-[#191a18]">
      <section
        aria-labelledby="about-title"
        className="relative isolate flex h-[52svh] min-h-[340px] max-h-[600px] items-center justify-center overflow-hidden bg-[#191a18] sm:h-[60svh] sm:min-h-[420px]"
      >
        <Image
          src="/about-phone-hero.jpg"
          alt=""
          fill
          priority
          sizes="100vw"
          className="object-cover object-[52%_56%] sm:object-[50%_48%]"
        />
        <div
          aria-hidden="true"
          className="absolute inset-0 bg-black/55"
        />
        <h1
          id="about-title"
          className="relative px-5 text-center text-[clamp(3.5rem,11vw,7.5rem)] font-medium leading-none tracking-[-0.075em] text-white"
        >
          About Us
        </h1>
      </section>

      <section
        aria-labelledby="about-story-title"
        className="mx-auto grid max-w-7xl gap-8 px-5 py-10 sm:gap-10 sm:px-10 sm:py-14 md:grid-cols-[0.9fr_1.1fr] md:gap-10 lg:gap-16 lg:px-16 lg:py-16"
      >
        <div>
          <p className="mb-6 text-[10px] font-medium uppercase tracking-[0.22em] text-[#263D38] sm:text-xs">
            A little about us
          </p>
          <dl className="border-t border-black/15">
            {BRAND_FACTS.map((fact) => (
              <div
                key={fact.label}
                className="grid gap-2 border-b border-black/15 py-5 sm:grid-cols-[minmax(7rem,0.65fr)_1.35fr] sm:items-baseline sm:gap-5 sm:py-6"
              >
                <dt className="text-[10px] font-medium uppercase tracking-[0.18em] text-black/50 sm:text-[11px]">
                  {fact.label}
                </dt>
                <dd className="text-xl font-medium leading-tight tracking-[-0.04em] sm:text-2xl lg:text-[1.75rem]">
                  {fact.statement}
                </dd>
              </div>
            ))}
          </dl>
        </div>

        <div className="max-w-2xl md:pt-1">
          <p className="text-[10px] font-medium uppercase tracking-[0.22em] text-[#263D38] sm:text-xs">
            MR Mobile Wala
          </p>
          <h2
            id="about-story-title"
            className="mt-4 max-w-[17ch] text-[clamp(2rem,5.5vw,3.5rem)] font-medium leading-[1.02] tracking-[-0.06em]"
          >
            Technology should feel personal.
          </h2>
          <div className="mt-6 space-y-4 text-sm leading-7 text-black/65 sm:mt-8 sm:text-base sm:leading-8">
            <p>
              We help people explore smartphones, sell or exchange a device,
              find accessories, and ask about phone repairs.
            </p>
            <p>
              Looking to buy? Tell us what you need and what matters to you.
              Thinking of selling or exchanging? Share a little about your
              current phone. For repairs and accessories, start with the device
              and what you&apos;re looking for.
            </p>
            <p>
              Every enquiry starts with a conversation, so you can consider the
              options and choose a next step that feels right for you.
            </p>
          </div>
          <Link
            href="/contact"
            className="mt-7 inline-flex min-h-11 items-center gap-3 text-sm font-medium underline decoration-black/30 underline-offset-4 transition-colors hover:text-[#263D38] hover:decoration-[#263D38] focus-visible:rounded-sm focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[#263D38]"
          >
            Talk to our team <span aria-hidden="true">&rarr;</span>
          </Link>
        </div>
      </section>

      <section
        aria-labelledby="our-story-title"
        className="border-y border-black/10 bg-[#F3F2EE]"
      >
        <div className="mx-auto grid max-w-7xl items-center gap-8 px-5 py-10 sm:gap-10 sm:px-10 sm:py-14 md:grid-cols-[1fr_0.9fr] lg:gap-16 lg:px-16 lg:py-16"
        >
          <div className="relative aspect-[4/3] min-h-0 overflow-hidden bg-[#dedbd4] sm:aspect-[5/4]">
            <Image
              src="/about-phone-workspace.jpg"
              alt="A smartphone beside a laptop in a workspace"
              fill
              sizes="(max-width: 767px) 100vw, (max-width: 1279px) 50vw, 560px"
              className="object-cover"
            />
          </div>
          <div className="max-w-xl">
            <p className="text-[10px] font-medium uppercase tracking-[0.22em] text-[#263D38] sm:text-xs">
              Our story
            </p>
            <h2
              id="our-story-title"
              className="mt-4 max-w-[16ch] text-[clamp(2.25rem,5.5vw,4rem)] font-medium leading-[0.98] tracking-[-0.065em]"
            >
              Making phone decisions simpler.
            </h2>
            <div className="mt-5 space-y-4 text-sm leading-7 text-black/65 sm:mt-7 sm:text-base sm:leading-8">
              <p>
                MR Mobile Wala helps people with the everyday choices around
                their phones: finding a device, selling or exchanging one,
                arranging a repair, or looking for accessories.
              </p>
              <p>
                Each enquiry starts with the person and the device. Tell us
                what you need, ask your questions, and explore a useful next
                step without the guesswork.
              </p>
            </div>
          </div>
        </div>
      </section>

      <TeamCarousel />
    </main>
  );
}
