"use client";

import {
  Suspense,
  useCallback,
  useEffect,
  useMemo,
  useRef,
} from "react";
import type { MutableRefObject } from "react";
import { Canvas, useFrame, useThree } from "@react-three/fiber";
import { Environment, Html, useGLTF } from "@react-three/drei";
import { clone } from "three/addons/utils/SkeletonUtils.js";
import * as THREE from "three";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

const MODEL_PATH = "/models/source/iphone.glb";
const BG = "#F7F6F2";
const GREEN = "#087443";

type StoryState = {
  progress: number;
  rotationY: number;
  rotationX: number;
  scale: number;
  cameraZ: number;
  modelY: number;
};

const INITIAL_STATE: StoryState = {
  progress: 0,
  rotationY: -0.28,
  rotationX: -0.04,
  scale: 1,
  cameraZ: 5.6,
  modelY: 0,
};

type ModelProps = {
  stateRef: MutableRefObject<StoryState>;
  onInvalidate: (fn: () => void) => void;
};

function LoadingModel() {
  return (
    <Html center>
      <div className="rounded-full border border-black/10 bg-white/90 px-4 py-2 text-xs text-[#555B56] shadow-sm backdrop-blur">
        Preparing the experience…
      </div>
    </Html>
  );
}

function PhoneModel({ stateRef, onInvalidate }: ModelProps) {
  const rigRef = useRef<THREE.Group>(null);
  const fitRef = useRef<THREE.Group>(null);
  const mixerRef = useRef<THREE.AnimationMixer | null>(null);
  const actionRef = useRef<THREE.AnimationAction | null>(null);
  const durationRef = useRef(0);

  const { scene, animations } = useGLTF(MODEL_PATH);
  const model = useMemo(() => clone(scene), [scene]);
  const { invalidate } = useThree();

  useEffect(() => {
    onInvalidate(invalidate);
    return () => onInvalidate(() => {});
  }, [invalidate, onInvalidate]);

  useEffect(() => {
    const fit = fitRef.current;
    if (!fit) return;

    model.updateMatrixWorld(true);

    const bounds = new THREE.Box3().setFromObject(model);
    const dimensions = bounds.getSize(new THREE.Vector3());
    const center = bounds.getCenter(new THREE.Vector3());
    const maxDimension = Math.max(
      dimensions.x,
      dimensions.y,
      dimensions.z,
    );

    if (!Number.isFinite(maxDimension) || maxDimension <= 0) {
      console.error("Invalid phone model dimensions:", dimensions);
      return;
    }

    const normalizedScale = 2.05 / maxDimension;

    fit.scale.setScalar(normalizedScale);
    fit.position.set(
      -center.x * normalizedScale,
      -center.y * normalizedScale,
      -center.z * normalizedScale,
    );

    const mixer = new THREE.AnimationMixer(model);

    const clip =
      animations.find((item) =>
        /open|close|fold|unfold|rotate|turn/i.test(item.name),
      ) ?? animations[0];

    let action: THREE.AnimationAction | null = null;

    if (clip) {
      action = mixer.clipAction(clip);
      action.reset();
      action.setLoop(THREE.LoopOnce, 1);
      action.clampWhenFinished = true;
      action.play();
      action.paused = true;

      durationRef.current = clip.duration;
      action.time = 0;
      mixer.update(0);

      console.info("Phone animation:", clip.name);
    } else {
      durationRef.current = 0;
      console.info("Static model detected; using rotation and zoom.");
    }

    mixerRef.current = mixer;
    actionRef.current = action;
    invalidate();

    return () => {
      mixer.stopAllAction();
      mixerRef.current = null;
      actionRef.current = null;
      durationRef.current = 0;
    };
  }, [model, animations, invalidate]);

  useFrame(({ camera, size }) => {
    const rig = rigRef.current;
    if (!rig) return;

    const state = stateRef.current;
    const mobile = size.width < 640;
    const tablet = size.width >= 640 && size.width < 1024;

    rig.position.set(0, state.modelY, 0);
    rig.rotation.set(state.rotationX, state.rotationY, 0);

    rig.scale.setScalar(
      (mobile ? 0.78 : tablet ? 0.9 : 1) * state.scale,
    );

    if (camera instanceof THREE.PerspectiveCamera) {
      const fov = mobile ? 43 : tablet ? 39 : 36;

      if (camera.fov !== fov) {
        camera.fov = fov;
        camera.updateProjectionMatrix();
      }

      if (Math.abs(camera.position.z - state.cameraZ) > 0.001) {
        camera.position.set(0, 0, state.cameraZ);
        camera.lookAt(0, 0, 0);
      }
    }

    const action = actionRef.current;
    const mixer = mixerRef.current;

    if (action && mixer && durationRef.current > 0) {
      action.time =
        THREE.MathUtils.clamp(state.progress, 0, 1) *
        durationRef.current;

      mixer.update(0);
    }
  });

  return (
    <group ref={rigRef}>
      <group ref={fitRef}>
        <primitive object={model} />
      </group>
    </group>
  );
}

function PhoneCanvas({
  stateRef,
  onInvalidate,
}: {
  stateRef: MutableRefObject<StoryState>;
  onInvalidate: (fn: () => void) => void;
}) {
  return (
    <div
      className="pointer-events-none absolute inset-0"
      aria-hidden="true"
    >
      <Canvas
        frameloop="demand"
        dpr={[1, 1.25]}
        camera={{ position: [0, 0, 5.6], fov: 36 }}
        gl={{
          antialias: true,
          alpha: false,
          powerPreference: "high-performance",
        }}
        onCreated={({ gl, invalidate }) => {
          gl.setClearColor(BG, 1);
          invalidate();
        }}
      >
        <color attach="background" args={[BG]} />

        <ambientLight intensity={1.1} />
        <hemisphereLight
          args={["#ffffff", "#c8c3b9", 1.05]}
        />

        <directionalLight
          intensity={2.2}
          position={[-4, 5, 6]}
        />

        <directionalLight
          intensity={1.25}
          position={[4, 1, 3]}
        />

        <directionalLight
          intensity={0.5}
          position={[0, -3, -4]}
        />

        <Suspense fallback={<LoadingModel />}>
          <Environment preset="studio" />
          <PhoneModel
            stateRef={stateRef}
            onInvalidate={onInvalidate}
          />
        </Suspense>
      </Canvas>
    </div>
  );
}

const CHAPTERS = [
  {
    number: "01",
    category: "BUY",
    title: "Your next phone starts here.",
    body: "Find a phone that fits your life. Get straightforward advice, explore your options and make your next move with confidence.",
    action: "Explore phones",
    href: "#services",
    align: "left",
  },
  {
    number: "02",
    category: "SELL",
    title: "Ready for your next upgrade?",
    body: "Your current phone could be someone else's next favourite. Ask us about selling your device and upgrading with less hassle.",
    action: "Sell your phone",
    href: "#contact",
    align: "right",
  },
  {
    number: "03",
    category: "REPAIR",
    title: "A second life for your phone.",
    body: "Cracked screen, battery trouble or another issue? Tell us what's happening and get guidance on the next step.",
    action: "Request a repair",
    href: "#contact",
    align: "left",
  },
  {
    number: "04",
    category: "MR MOBILE WALA",
    title: "One place. Every move.",
    body: "Buying, selling or repairing — get personal service and clear guidance for your device.",
    action: "Talk to our team",
    href: "#contact",
    align: "right",
  },
] as const;

export default function PhoneStorySection() {
  const sectionRef = useRef<HTMLElement>(null);
  const chapterRefs = useRef<Array<HTMLElement | null>>([]);
  const stateRef = useRef<StoryState>({ ...INITIAL_STATE });
  const invalidateRef = useRef<(() => void) | null>(null);

  const setInvalidate = useCallback((fn: () => void) => {
    invalidateRef.current = fn;
  }, []);

  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger);

    const section = sectionRef.current;
    const chapters = chapterRefs.current.filter(
      (node): node is HTMLElement => node !== null,
    );

    if (!section || chapters.length !== CHAPTERS.length) return;

    const mm = gsap.matchMedia();

    mm.add("(prefers-reduced-motion: no-preference)", () => {
      const state = stateRef.current;
      Object.assign(state, INITIAL_STATE);

      gsap.set(chapters, { autoAlpha: 0, y: 22 });
      gsap.set(chapters[0], { autoAlpha: 1, y: 0 });

      const timeline = gsap.timeline({
        scrollTrigger: {
          trigger: section,
          start: "top top",
          end: () => `+=${Math.round(window.innerHeight * 5.2)}`,
          pin: true,
          pinSpacing: true,
          scrub: 0.85,
          anticipatePin: 1,
          invalidateOnRefresh: true,
        },
        onUpdate: () => invalidateRef.current?.(),
      });

      // BUY: initial reveal and gentle zoom.
      timeline.to(
        state,
        {
          progress: 0.08,
          rotationY: 0.12,
          rotationX: 0.02,
          scale: 1.05,
          cameraZ: 5.2,
          modelY: -0.02,
          duration: 1,
          ease: "none",
        },
        0,
      );

      // SELL: rotate to reveal the side and back.
      timeline.to(
        state,
        {
          progress: 0.34,
          rotationY: Math.PI * 0.52,
          rotationX: -0.05,
          scale: 1.17,
          cameraZ: 4.9,
          modelY: 0.02,
          duration: 1,
          ease: "none",
        },
        1,
      );

      // REPAIR: close-up.
      timeline.to(
        state,
        {
          progress: 0.62,
          rotationY: Math.PI * 1.02,
          rotationX: 0.08,
          scale: 1.32,
          cameraZ: 4.45,
          modelY: 0,
          duration: 1,
          ease: "none",
        },
        2,
      );

      // Final brand moment.
      timeline.to(
        state,
        {
          progress: 1,
          rotationY: Math.PI * 2,
          rotationX: 0,
          scale: 1.08,
          cameraZ: 5.15,
          modelY: 0,
          duration: 1,
          ease: "none",
        },
        3,
      );

      CHAPTERS.forEach((_, index) => {
        if (index === 0) return;

        const at = index;

        timeline
          .to(
            chapters[index - 1],
            {
              autoAlpha: 0,
              y: -18,
              duration: 0.2,
              ease: "power1.out",
            },
            at - 0.14,
          )
          .fromTo(
            chapters[index],
            { autoAlpha: 0, y: 20 },
            {
              autoAlpha: 1,
              y: 0,
              duration: 0.28,
              ease: "power2.out",
            },
            at + 0.03,
          );
      });

      const refreshFrame = requestAnimationFrame(() =>
        ScrollTrigger.refresh(),
      );

      return () => {
        cancelAnimationFrame(refreshFrame);
        timeline.scrollTrigger?.kill();
        timeline.kill();
        gsap.set(chapters, { clearProps: "all" });
        Object.assign(state, INITIAL_STATE);
        invalidateRef.current?.();
      };
    });

    mm.add("(prefers-reduced-motion: reduce)", () => {
      gsap.set(chapters, {
        clearProps: "all",
        autoAlpha: 1,
        y: 0,
      });

      Object.assign(stateRef.current, INITIAL_STATE);
      invalidateRef.current?.();
    });

    return () => mm.revert();
  }, []);

  return (
    <section
      ref={sectionRef}
      aria-label="Buy, sell and repair phone story"
      className="relative isolate h-svh min-h-[680px] overflow-hidden bg-[#F7F6F2] font-sans text-[#1C211E]"
    >
      <PhoneCanvas
        stateRef={stateRef}
        onInvalidate={setInvalidate}
      />

      <header className="pointer-events-none absolute inset-x-5 top-5 z-20 flex items-center justify-between gap-4 sm:inset-x-10 sm:top-7 lg:inset-x-14">
        <div>
          <p className="text-[10px] font-semibold uppercase tracking-[0.22em]">
            MR Mobile Wala
          </p>
          <p className="mt-1 text-[9px] tracking-[0.08em] text-[#777B75]">
            BUY · SELL · REPAIR
          </p>
        </div>

        <p className="max-w-32 text-right text-[9px] uppercase leading-4 tracking-[0.16em] text-[#777B75] sm:max-w-none sm:text-[10px]">
          Your device. Your next move.
        </p>
      </header>

      <div className="pointer-events-none absolute inset-0 z-10">
        {CHAPTERS.map((chapter, index) => (
          <article
            key={chapter.number}
            ref={(node) => {
              chapterRefs.current[index] = node;
            }}
            className={[
              "absolute inset-x-5 top-[15%] max-w-[min(100%-2.5rem,28rem)] sm:inset-x-10 sm:top-auto sm:bottom-[14%] lg:inset-x-14 lg:bottom-[16%]",
              chapter.align === "right"
                ? "sm:left-auto sm:right-10 lg:right-14"
                : "sm:right-auto",
            ].join(" ")}
          >
            <p className="mb-3 flex items-center gap-3 text-[10px] font-semibold uppercase tracking-[0.22em] text-[#087443]">
              <span>{chapter.number}</span>
              <span className="h-px w-7 bg-[#087443]/50" />
              <span>{chapter.category}</span>
            </p>

            <h2 className="max-w-[11ch] text-[clamp(2.55rem,6vw,5rem)] font-semibold leading-[0.94] tracking-[-0.065em] text-[#1C211E]">
              {chapter.title}
            </h2>

            <p className="mt-4 max-w-[27rem] text-[15px] leading-[1.7] text-[#656963] sm:text-base sm:leading-7">
              {chapter.body}
            </p>

            <a
              href={chapter.href}
              className="pointer-events-auto mt-5 inline-flex min-h-12 items-center justify-center gap-3 rounded-full bg-[#087443] px-6 text-sm font-medium text-white shadow-sm transition-colors duration-200 hover:bg-[#065E36] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[#087443]"
            >
              {chapter.action}
              <span aria-hidden="true">↗</span>
            </a>
          </article>
        ))}
      </div>

      <div className="pointer-events-none absolute bottom-5 left-5 z-20 flex items-center gap-3 text-[9px] font-medium uppercase tracking-[0.2em] text-[#737770] sm:bottom-7 sm:left-10 lg:left-14">
        <span className="h-8 w-px bg-[#087443]" />
        <span>Scroll to explore</span>
      </div>

      <p className="pointer-events-none absolute bottom-6 right-5 z-20 text-[9px] uppercase tracking-[0.16em] text-[#8A8D87] sm:bottom-8 sm:right-10 lg:right-14">
        3D / Product story
      </p>
    </section>
  );
}

useGLTF.preload(MODEL_PATH);