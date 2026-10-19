"use client";

import { Suspense, useEffect, useMemo, useRef } from "react";
import { Canvas, useFrame, useThree } from "@react-three/fiber";
import { Environment, useGLTF, Html } from "@react-three/drei";
import { clone } from "three/addons/utils/SkeletonUtils.js";
import * as THREE from "three";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import Link from "next/link";
import type { MutableRefObject } from "react";

const MODEL_PATH = "/models/iphone-duo-fold.glb";
const MODEL_TARGET_SIZE = 1.9;
const BACKGROUND = "#FAFAF8";

type PhoneState = {
  progress: number;
  x: number;
  y: number;
  z: number;
  scale: number;
  rotateX: number;
  rotateY: number;
  rotateZ: number;
  cameraZ: number;
};

const INITIAL_STATE: PhoneState = {
  progress: 0,
  x: 1.15,
  y: -0.85,
  z: 0,
  scale: 1,
  rotateX: -0.1,
  rotateY: -0.3,
  rotateZ: 0,
  cameraZ: 6.5,
};

function ModelLoader() {
  return (
    <Html center>
      <div
        role="status"
        aria-live="polite"
        className="rounded-full border border-black/10 bg-white/90 px-4 py-2 text-xs font-medium text-black/70 shadow-sm backdrop-blur"
      >
        Loading 3D phone…
      </div>
    </Html>
  );
}

function DuoFoldPhone({
  stateRef,
  onInvalidateReady,
}: {
  stateRef: MutableRefObject<PhoneState>;
  onInvalidateReady: (invalidate: () => void) => void;
}) {
  const rigRef = useRef<THREE.Group>(null);
  const fitRef = useRef<THREE.Group>(null);
  const mixerRef = useRef<THREE.AnimationMixer | null>(null);
  const actionRef = useRef<THREE.AnimationAction | null>(null);
  const durationRef = useRef(0);
  const { scene, animations } = useGLTF(MODEL_PATH);
  const model = useMemo(() => clone(scene), [scene]);
  const { invalidate } = useThree();

  useEffect(() => {
    onInvalidateReady(invalidate);
    return () => onInvalidateReady(() => {}); 
  }, [invalidate, onInvalidateReady]);

  useEffect(() => {
    const fit = fitRef.current;
    if (!fit) return;

    model.updateMatrixWorld(true);
    const bounds = new THREE.Box3().setFromObject(model);
    const dimensions = bounds.getSize(new THREE.Vector3());
    const center = bounds.getCenter(new THREE.Vector3());
    const largestDimension = Math.max(dimensions.x, dimensions.y, dimensions.z);

    if (!Number.isFinite(largestDimension) || largestDimension <= 0) {
      console.error("The foldable GLB has an invalid bounding box.", dimensions);
      return;
    }

    const normalizationScale = MODEL_TARGET_SIZE / largestDimension;
    fit.scale.setScalar(normalizationScale);
    fit.position.set(
      -center.x * normalizationScale,
      -center.y * normalizationScale,
      -center.z * normalizationScale,
    );

    const mixer = new THREE.AnimationMixer(model);
    const clip =
      animations.find((item) => item.name === "open-close") ?? animations[0];

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
    } else {
      durationRef.current = 0;
      console.warn("No animation clip found in the GLB; rendering static model.");
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

    const targetX = mobile ? 0 : tablet ? 0.7 : state.x;
    const targetY = mobile ? -0.9 + state.progress * 0.2 : state.y;

    rig.position.set(targetX, targetY, state.z);
    rig.rotation.set(state.rotateX, state.rotateY, state.rotateZ);

    const responsiveScale = mobile ? 0.9 : tablet ? 1 : 1.1;
    rig.scale.setScalar(responsiveScale * state.scale);

    if (camera instanceof THREE.PerspectiveCamera) {
      const nextFov = mobile ? 40 : tablet ? 38 : 35;
      if (camera.fov !== nextFov) {
        camera.fov = nextFov;
        camera.updateProjectionMatrix();
      }

      const nextCameraZ = mobile ? Math.max(state.cameraZ, 6.8) : state.cameraZ;
      if (camera.position.z !== nextCameraZ) {
        camera.position.set(0, 0, nextCameraZ);
        camera.lookAt(0, 0, 0);
      }
    }

    const action = actionRef.current;
    const mixer = mixerRef.current;
    if (action && mixer && durationRef.current > 0) {
      action.time =
        THREE.MathUtils.clamp(state.progress, 0, 1) * durationRef.current;
      mixer.update(0);
    }
  });

  return (
    <group ref={rigRef}>
      <group rotation={[0, 0, Math.PI / 2]}>
        <group ref={fitRef}>
          <primitive object={model} />
        </group>
      </group>
    </group>
  );
}

function PhoneBackdrop({
  stateRef,
  onInvalidateReady,
}: {
  stateRef: MutableRefObject<PhoneState>;
  onInvalidateReady: (invalidate: () => void) => void;
}) {
  return (
    <div
      aria-hidden="true"
      className="pointer-events-none absolute inset-0"
    >
      <Canvas
        frameloop="demand"
        dpr={[1, 1.25]}
        camera={{ position: [0, 0, 6.5], fov: 35 }}
        gl={{
          alpha: false,
          antialias: true,
          powerPreference: "high-performance",
        }}
        onCreated={({ gl, invalidate }) => {
          gl.setClearColor(BACKGROUND, 1);
          invalidate();
        }}
      >
        <color attach="background" args={[BACKGROUND]} />
        <ambientLight intensity={0.9} />
        <hemisphereLight args={["#ffffff", "#c9c3b8", 1.1]} />
        <directionalLight intensity={2.2} position={[-4, 5, 6]} />
        <directionalLight intensity={1.2} position={[4, 2, 3]} />
        <Suspense fallback={<ModelLoader />}>
          <Environment preset="studio" />
          <DuoFoldPhone stateRef={stateRef} onInvalidateReady={onInvalidateReady} />
        </Suspense>
      </Canvas>
    </div>
  );
}

export default function HeroSection() {
  const sectionRef = useRef<HTMLElement>(null);
  const copyRef = useRef<HTMLDivElement>(null);
  const stateRef = useRef<PhoneState>({ ...INITIAL_STATE });
  const invalidateRef = useRef<(() => void) | null>(null);

  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger);

    const section = sectionRef.current;
    const copy = copyRef.current;
    if (!section || !copy) return;

    const media = gsap.matchMedia();

    media.add("(prefers-reduced-motion: no-preference)", () => {
      const state = stateRef.current;
      Object.assign(state, INITIAL_STATE);

      const timeline = gsap.timeline({
        scrollTrigger: {
          trigger: section,
          start: "top top",
          end: () => (window.innerWidth < 640 ? "+=180%" : "+=250%"),
          pin: true,
          pinSpacing: true,
          scrub: 0.8,
          anticipatePin: 1,
          invalidateOnRefresh: true,
        },
        onUpdate: () => invalidateRef.current?.(),
      });

      timeline
        .to(state, {
          y: () => (window.innerWidth < 640 ? -0.35 : -0.65),
          scale: 1.05,
          progress: 0.2,
          rotateX: -0.05,
          rotateY: -0.1,
          duration: 1,
          ease: "none",
        })
        .to(state, {
          x: () => (window.innerWidth < 640 ? 0 : 0.85),
          y: () => (window.innerWidth < 640 ? -0.45 : 0.05),
          scale: 1.12,
          progress: 0.48,
          rotateX: 0.02,
          rotateY: 0.25,
          duration: 1.2,
          ease: "none",
        })
        .to(state, {
          x: () => (window.innerWidth < 640 ? 0 : 0.65),
          y: () => (window.innerWidth < 640 ? -0.35 : 0.08),
          scale: 1.2,
          progress: 0.76,
          rotateX: -0.04,
          rotateY: 0.6,
          rotateZ: 0.02,
          duration: 1.2,
          ease: "none",
        })
        .to(state, {
          x: () => (window.innerWidth < 640 ? 0 : 0.85),
          y: () => (window.innerWidth < 640 ? -0.45 : 0),
          scale: 1.08,
          progress: 1,
          rotateX: 0,
          rotateY: 0.9,
          rotateZ: 0,
          duration: 1,
          ease: "none",
        });

      const copyTween = gsap.to(copy, {
        y: -18,
        autoAlpha: 0,
        ease: "none",
        scrollTrigger: {
          trigger: section,
          start: "top top",
          end: () => (window.innerWidth < 640 ? "+=45%" : "+=65%"),
          scrub: true,
        },
      });

      const refreshFrame = requestAnimationFrame(() => ScrollTrigger.refresh());

      return () => {
        cancelAnimationFrame(refreshFrame);
        copyTween.scrollTrigger?.kill();
        copyTween.kill();
        timeline.scrollTrigger?.kill();
        timeline.kill();
        gsap.killTweensOf(copy);
        Object.assign(state, INITIAL_STATE);
        invalidateRef.current?.();
      };
    });

    return () => media.revert();
  }, []);

  return (
    <section
      ref={sectionRef}
      aria-labelledby="hero-title"
      className="relative z-10 h-svh min-h-[680px] overflow-hidden bg-[#FAFAF8] text-[#191a18] sm:min-h-[620px]"
    >
      <PhoneBackdrop
        stateRef={stateRef}
        onInvalidateReady={(invalidate) => {
          invalidateRef.current = invalidate;
        }}
      />

      <div className="pointer-events-none absolute inset-x-5 top-20 z-10 flex justify-between gap-4 sm:inset-x-8 sm:top-24 md:inset-x-12 md:top-28">
        <p className="text-[9px] font-medium uppercase tracking-[0.24em] text-black/70 sm:text-[10px]">
          MR Mobile Wala
        </p>
        <p className="text-right text-[9px] font-medium uppercase tracking-[0.16em] text-black/70 sm:text-[10px]">
          Made personal. Built to move.
        </p>
      </div>

      <div ref={copyRef} className="pointer-events-none absolute inset-0 z-10">
        <div className="absolute inset-x-5 top-[12%] max-w-[min(100%-2.5rem,34rem)] sm:inset-x-8 sm:top-[24%] md:inset-x-12 md:top-auto md:bottom-[18%] md:max-w-[42%]">
          <div className="pointer-events-auto">
            <p className="text-[10px] font-medium uppercase tracking-[0.25em] text-black/65">
              Buy · Sell · Repair
            </p>
            <h1
              id="hero-title"
              className="mt-3 max-w-[11ch] text-[clamp(2.25rem,6.5vw,5rem)] font-semibold leading-[0.94] tracking-[-0.06em]"
            >
              Your next move, made personal.
            </h1>
            <p className="mt-3 max-w-sm text-sm leading-5 text-black/65 sm:mt-4 sm:text-base sm:leading-6">
              Find your next phone, sell your old device, or get it repaired.
              Personal service, straightforward advice.
            </p>
            <div className="mt-4 flex flex-wrap items-center gap-3 sm:mt-6">
              <Link
                href="#services"
                className="inline-flex min-h-11 items-center justify-center rounded-full bg-[#263D38] px-5 text-sm font-medium text-white transition-colors hover:bg-[#1E302C] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[#263D38]"
              >
                Explore services <span className="ml-2" aria-hidden="true">→</span>
              </Link>
              <Link
                href="mailto:mrmobilewala610@gmail.com"
                className="inline-flex min-h-11 items-center text-sm font-medium underline underline-offset-4 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[#263D38]"
              >
                Talk to us
              </Link>
            </div>
          </div>
        </div>
      </div>

      <div className="pointer-events-none absolute bottom-5 right-5 z-10 flex items-center gap-3 text-[9px] uppercase tracking-[0.2em] text-black/60 sm:bottom-7 sm:right-10 sm:text-[10px]">
        <span className="h-8 w-px bg-black/25" aria-hidden="true" />
        <span>Scroll to explore</span>
      </div>
    </section>
  );
}

useGLTF.preload(MODEL_PATH);
