
"use client";

import { useEffect } from "react";
import Lenis from "lenis";
import "lenis/dist/lenis.css";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

export default function SmoothScroll({
  children,
}: {
  children: React.ReactNode;
}) {
  useEffect(() => {
    const reduceMotion = window.matchMedia(
      "(prefers-reduced-motion: reduce)"
    ).matches;

    if (reduceMotion) return;

    const lenis = new Lenis({
      autoRaf: false,
      smoothWheel: true,
      lerp: 0.085,
      wheelMultiplier: 0.9,
    });

    const updateScroll = () => ScrollTrigger.update();

    const updateLenis = (time: number) => {
      lenis.raf(time * 1000);
    };

    lenis.on("scroll", updateScroll);
    gsap.ticker.add(updateLenis);
    gsap.ticker.lagSmoothing(0);

    return () => {
      lenis.off("scroll", updateScroll);
      gsap.ticker.remove(updateLenis);
      lenis.destroy();
      gsap.ticker.lagSmoothing(500);
    };
  }, []);

  return <>{children}</>;
}
