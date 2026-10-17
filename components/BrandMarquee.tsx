import Image from "next/image";

const BRANDS = [
  { name: "Apple", src: "/brands/apple.svg", width: 48, height: 48 },
  { name: "Samsung", src: "/brands/samsung.svg", width: 130, height: 38 },
  { name: "OnePlus", src: "/brands/oneplus.svg", width: 135, height: 40 },
  { name: "Xiaomi", src: "/brands/xiaomi.svg", width: 55, height: 48 },
  { name: "Google", src: "/brands/google.svg", width: 115, height: 40 },
  { name: "Nothing", src: "/brands/nothing.svg", width: 125, height: 40 },
  { name: "OPPO", src: "/brands/OPPO.svg", width: 105, height: 40 },
  { name: "Vivo", src: "/brands/Vivo.svg", width: 95, height: 36 },
];

function BrandSequence({ duplicate = false }: { duplicate?: boolean }) {
  return (
    <ul
      className="brand-showcase__sequence"
      aria-hidden={duplicate || undefined}
    >
      {BRANDS.map((brand) => (
        <li key={brand.name} className="brand-showcase__item">
          <Image
            src={brand.src}
            alt={duplicate ? "" : `${brand.name} logo`}
            width={brand.width}
            height={brand.height}
            sizes="(max-width: 640px) 88px, 120px"
            className="brand-showcase__logo"
          />
        </li>
      ))}
    </ul>
  );
}

export default function BrandMarquee() {
  return (
    <section
      id="brands"
      aria-labelledby="brands-title"
      className="brand-showcase w-full overflow-hidden bg-[#FAFAF8] py-8 sm:py-10 lg:py-12"
    >
      <div className="mx-auto mb-5 flex max-w-7xl items-end justify-between gap-4 px-6 sm:mb-7 sm:px-10 lg:px-16">
        <div>
          <p className="mb-2 hidden text-[9px] font-medium uppercase tracking-[0.24em] text-black/65 sm:block sm:text-[10px]">
            The brands we work with
          </p>
          <h2
            id="brands-title"
            className="text-xs font-medium uppercase tracking-[0.16em] text-black/75 sm:text-sm sm:tracking-[0.2em]"
          >
            Built for every device
          </h2>
        </div>
      </div>
      <div
        className="brand-showcase__viewport"
        role="region"
        aria-label="Brand logos"
        tabIndex={0}
      >
        <div className="brand-showcase__track">
          <BrandSequence />
          <BrandSequence duplicate />
        </div>
      </div>
      <style>{`
        .brand-showcase__viewport {
          overflow: hidden;
          width: 100%;
        }

        .brand-showcase__track {
          display: flex;
          width: max-content;
          animation: brand-showcase-scroll 36s linear infinite;
          will-change: transform;
        }

        .brand-showcase__sequence {
          box-sizing: border-box;
          display: flex;
          flex: 0 0 auto;
          align-items: center;
          justify-content: space-between;
          width: max-content;
          min-width: 100vw;
          gap: 30px;
          margin: 0;
          padding: 0 24px;
          list-style: none;
        }

        .brand-showcase__item {
          display: flex;
          height: 44px;
          flex: 0 0 auto;
          align-items: center;
          justify-content: center;
        }

        .brand-showcase__logo {
          display: block;
          width: auto;
          max-width: 88px;
          height: 30px;
          object-fit: contain;
        }

        @keyframes brand-showcase-scroll {
          from {
            transform: translate3d(0, 0, 0);
          }

          to {
            transform: translate3d(-50%, 0, 0);
          }
        }

        @media (min-width: 640px) {
          .brand-showcase__sequence {
            gap: 44px;
            padding-inline: 40px;
          }

          .brand-showcase__item {
            height: 52px;
          }

          .brand-showcase__logo {
            max-width: 112px;
            height: 36px;
          }
        }

        @media (min-width: 1024px) {
          .brand-showcase__sequence {
            gap: 52px;
            padding-inline: 64px;
          }

          .brand-showcase__item {
            height: 60px;
          }

          .brand-showcase__logo {
            max-width: 120px;
            height: 40px;
          }
        }

        @media (hover: hover) and (pointer: fine) {
          .brand-showcase__viewport:hover .brand-showcase__track {
            animation-play-state: paused;
          }
        }

        .brand-showcase__viewport:focus .brand-showcase__track {
          animation-play-state: paused;
        }

        @media (prefers-reduced-motion: reduce) {
          .brand-showcase__viewport {
            overflow-x: auto;
            scrollbar-width: none;
          }

          .brand-showcase__viewport::-webkit-scrollbar {
            display: none;
          }

          .brand-showcase__track {
            animation: none;
            will-change: auto;
          }
        }
      `}</style>
    </section>
  );
}
