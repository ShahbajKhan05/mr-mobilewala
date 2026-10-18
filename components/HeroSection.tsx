"use client";

import { Suspense, useEffect, useRef, useState } from "react";
import { Canvas, useFrame, useThree } from "@react-three/fiber";
import { Environment, Lightformer, useGLTF } from "@react-three/drei";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import * as THREE from "three";
import Link from "next/link";

const FOLDABLE_MODEL_PATH = "/models/iphone-duo-fold.glb";
const IPHONE_MODEL_PATH = "/phone/source/phone.glb";
const FOLDABLE_CENTER = [-0.000208, -0.059132, 0.003058] as const;
const IPHONE_CENTER = [0, -0.075, 0.0024] as const;

interface ScrollSceneState {
  foldableYaw: number;
  foldableX: number;
  iphoneYaw: number;
  iphoneX: number;
  cameraAzimuth: number;
  cameraElevation: number;
  cameraRadius: number;
  targetX: number;
  targetY: number;
  fold: number;
  entrance: number;
  scale: number;
}

const INITIAL_SCENE_STATE: ScrollSceneState = {
  foldableYaw: -0.12,
  foldableX: -0.37,
  iphoneYaw: -0.12,
  iphoneX: 0.35,
  cameraAzimuth: 0.12,
  cameraElevation: 0.08,
  cameraRadius: 4.55,
  targetX: 0,
  targetY: 0,
  fold: 0,
  entrance: 0.9,
  scale: 1,
};

function correctFoldableScreenTexture(scene: THREE.Group) {
  const adjustedMaterials: Array<{
    mesh: THREE.Mesh;
    original: THREE.Material | THREE.Material[];
    adjusted: THREE.Material[];
  }> = [];

  scene.traverse((object) => {
    if (!(object instanceof THREE.Mesh)) return;

    const materials = Array.isArray(object.material)
      ? object.material
      : [object.material];
    let changed = false;
    const adjusted = materials.map((material) => {
      if (
        material.name !== "C_StarWhite_Screen_Inner" ||
        !(material instanceof THREE.MeshStandardMaterial) ||
        !material.emissiveMap
      ) {
        return material;
      }

      const corrected = material.clone();
      corrected.emissiveMap = material.emissiveMap.clone();
      corrected.emissiveMap.center.set(0.5, 0.5);
      corrected.emissiveMap.rotation = Math.PI / 2;
      corrected.emissiveMap.needsUpdate = true;
      changed = true;
      return corrected;
    });

    if (!changed) return;
    adjustedMaterials.push({
      mesh: object,
      original: object.material,
      adjusted,
    });
    object.material = Array.isArray(object.material) ? adjusted : adjusted[0];
  });

  return () => {
    adjustedMaterials.forEach(({ mesh, original, adjusted }) => {
      mesh.material = original;
      adjusted.forEach((material) => {
        if (material instanceof THREE.MeshStandardMaterial) {
          material.emissiveMap?.dispose();
        }
        material.dispose();
      });
    });
  };
}

function FoldablePhone({
  stateRef,
  invalidateRef,
}: {
  stateRef: React.RefObject<ScrollSceneState>;
  invalidateRef: { current: (() => void) | null };
}) {
  const rigRef = useRef<THREE.Group>(null);
  const foldActionRef = useRef<THREE.AnimationAction | null>(null);
  const mixerRef = useRef<THREE.AnimationMixer | null>(null);
  const foldDurationRef = useRef(0);
  const { scene, animations } = useGLTF(FOLDABLE_MODEL_PATH);
  const invalidate = useThree((state) => state.invalidate);

  useEffect(() => {
    invalidateRef.current = invalidate;
    return () => {
      invalidateRef.current = null;
    };
  }, [invalidate, invalidateRef]);

  useEffect(() => {
    const restoreScreenMaterials = correctFoldableScreenTexture(scene);
    const foldClip = animations.find((clip) => clip.name === "open-close");
    if (!foldClip) {
      restoreScreenMaterials();
      throw new Error(
        `Expected the "open-close" animation in ${FOLDABLE_MODEL_PATH}.`,
      );
    }

    const mixer = new THREE.AnimationMixer(scene);
    const action = mixer.clipAction(foldClip);
    action.setLoop(THREE.LoopOnce, 1);
    action.clampWhenFinished = true;
    action.play();
    action.paused = true;

    foldActionRef.current = action;
    mixerRef.current = mixer;
    foldDurationRef.current = foldClip.duration;

    return () => {
      action.stop();
      mixer.stopAllAction();
      foldActionRef.current = null;
      mixerRef.current = null;
      restoreScreenMaterials();
    };
  }, [animations, scene]);

  useFrame(({ camera, size }) => {
    const rig = rigRef.current;
    if (!rig) return;

    const state = stateRef.current;
    const compact = size.width < 768;
    const entranceOffset = (1 - state.entrance) * 0.18;
    rig.rotation.set(0, state.foldableYaw, 0);
    rig.position.set(
      state.foldableX * (compact ? 0.72 : 1),
      (compact ? (size.width < 380 ? -0.95 : -0.8) : 0) - entranceOffset,
      0.04,
    );
    rig.scale.setScalar(
      (compact ? 7.45 : 8.5) * state.scale * state.entrance,
    );

    const radius = compact
      ? size.width < 370
        ? 7.8
        : size.width < 430
          ? 7
          : 6.2
      : state.cameraRadius;
    const horizontalRadius = radius * Math.cos(state.cameraElevation);
    camera.position.set(
      state.targetX + Math.sin(state.cameraAzimuth) * horizontalRadius,
      state.targetY + Math.sin(state.cameraElevation) * radius,
      Math.cos(state.cameraAzimuth) * horizontalRadius,
    );
    camera.lookAt(state.targetX, state.targetY, 0);

    const action = foldActionRef.current;
    const mixer = mixerRef.current;
    if (action && mixer) {
      action.time =
        THREE.MathUtils.clamp(state.fold, 0, 1) * foldDurationRef.current;
      mixer.update(0);
    }
  });

  return (
    <group ref={rigRef}>
      <group rotation={[0, 0, Math.PI / 2]}>
        <group position={[...FOLDABLE_CENTER]}>
          <primitive object={scene} dispose={null} />
        </group>
      </group>
    </group>
  );
}

function IphoneModel({
  stateRef,
}: {
  stateRef: React.RefObject<ScrollSceneState>;
}) {
  const rigRef = useRef<THREE.Group>(null);
  const { scene } = useGLTF(IPHONE_MODEL_PATH);

  useFrame(({ size }) => {
    const rig = rigRef.current;
    if (!rig) return;

    const compact = size.width < 768;
    const state = stateRef.current;
    const entranceOffset = (1 - state.entrance) * 0.18;
    rig.position.set(
      state.iphoneX * (compact ? 0.72 : 1),
      (compact ? (size.width < 380 ? -0.95 : -0.8) : 0) - entranceOffset,
      -0.04,
    );
    rig.rotation.y = state.iphoneYaw;
    rig.scale.setScalar(
      (compact ? 7.45 : 8.35) * state.scale * state.entrance,
    );
  });

  return (
    <group ref={rigRef}>
      <group position={[...IPHONE_CENTER]}>
        <primitive object={scene} dispose={null} />
      </group>
    </group>
  );
}

export default function HeroSection() {
  const sectionRef = useRef<HTMLElement>(null);
  const introCopyRef = useRef<HTMLDivElement>(null);
  const titleRef = useRef<HTMLHeadingElement>(null);
  const sceneStateRef = useRef<ScrollSceneState>({ ...INITIAL_SCENE_STATE });
  const invalidateRef = useRef<(() => void) | null>(null);
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const mobileViewport = window.matchMedia("(max-width: 767px)");
    const updateViewport = () => setIsMobile(mobileViewport.matches);

    updateViewport();
    mobileViewport.addEventListener("change", updateViewport);

    return () => {
      mobileViewport.removeEventListener("change", updateViewport);
    };
  }, []);

  useEffect(() => {
    const section = sectionRef.current;
    if (!section) return;

    gsap.registerPlugin(ScrollTrigger);
    const media = gsap.matchMedia();
    const context = gsap.context(() => {
      const buildTimeline = (compact: boolean, tablet: boolean) => {
        const scene = sceneStateRef.current;
        Object.assign(scene, INITIAL_SCENE_STATE);

        const movement = tablet ? 0.72 : compact ? 0.3 : 1;
        const startScale = compact ? 0.94 : INITIAL_SCENE_STATE.entrance;
        scene.entrance = startScale;
        const brandTitle = compact
          ? null
          : section.parentElement?.querySelector("#brands-title");
        const serviceTitle = compact
          ? null
          : section.parentElement?.querySelector("#services-title");
        const serviceCards = compact
          ? null
          : section.parentElement?.querySelectorAll("[data-story-card]");

        if (brandTitle) gsap.set(brandTitle, { autoAlpha: 0, y: 16 });
        if (serviceTitle) gsap.set(serviceTitle, { autoAlpha: 0, y: 20 });
        if (serviceCards?.length) {
          gsap.set(serviceCards, { autoAlpha: 0, y: 18 });
        }

        const timeline = gsap.timeline({
          scrollTrigger: {
            trigger: section,
            start: "top top",
            end: compact ? "bottom top" : "+=100%",
            pin: compact ? false : section,
            pinSpacing: true,
            anticipatePin: compact ? 0 : 1,
            scrub: compact ? true : tablet ? 0.4 : 0.55,
            invalidateOnRefresh: true,
            onUpdate: () => invalidateRef.current?.(),
          },
        });

        timeline
          .to(
            scene,
            {
              entrance: 1,
              duration: compact ? 0.18 : 0.1,
              ease: "none",
            },
            0,
          )
          .to(
            scene,
            {
              foldableYaw: 0.2 * movement,
              iphoneYaw: 1.05 * movement,
              fold: 0.45 * movement,
              cameraAzimuth: 0.02 * movement,
              cameraElevation: 0.1 * movement,
              cameraRadius: 4.45,
              scale: 0.94,
              duration: 0.22,
              ease: "none",
            },
            0.12,
          )
          .to(
            scene,
            {
              foldableX: -0.5,
              iphoneX: 0.5,
              foldableYaw: 0.68 * movement,
              iphoneYaw: 2.62 * movement,
              fold: 0.86 * movement,
              cameraAzimuth: 0.15 * movement,
              cameraElevation: 0.13 * movement,
              cameraRadius: tablet ? 4.75 : compact ? 4.55 : 4.7,
              scale: compact ? 0.94 : tablet ? 0.94 : 0.9,
              duration: 0.3,
              ease: "none",
            },
            0.4,
          )
          .to(
            scene,
            {
              foldableX: -0.44,
              iphoneX: 0.44,
              foldableYaw: 0.42 * movement,
              iphoneYaw: 2.38 * movement,
              fold: 0.78 * movement,
              cameraAzimuth: 0.05 * movement,
              cameraElevation: 0.07 * movement,
              cameraRadius: tablet ? 4.8 : compact ? 4.6 : 4.85,
              scale: compact ? 0.94 : tablet ? 0.92 : 0.86,
              duration: 0.28,
              ease: "none",
            },
            0.72,
          );

        if (!compact) {
          timeline.to(
            introCopyRef.current,
            {
              autoAlpha: 0,
              y: -18,
              duration: 0.12,
              ease: "none",
            },
            0.14,
          );

          if (brandTitle) {
            timeline.to(
              brandTitle,
              {
                autoAlpha: 1,
                y: 0,
                duration: 0.1,
                ease: "none",
              },
              0.31,
            );
          }

          if (serviceTitle) {
            timeline.to(
              serviceTitle,
              {
                autoAlpha: 1,
                y: 0,
                duration: 0.1,
                ease: "none",
              },
              0.5,
            );
          }

          if (serviceCards?.length) {
            timeline.to(
              serviceCards,
              {
                autoAlpha: 1,
                y: 0,
                duration: 0.12,
                stagger: 0.025,
                ease: "none",
              },
              0.56,
            );
          }
        }

        if (titleRef.current) {
          gsap.fromTo(
            titleRef.current,
            { clipPath: "inset(0 0 100% 0)", y: 20 },
            {
              clipPath: "inset(0 0 0% 0)",
              y: 0,
              duration: 0.8,
              delay: 0.12,
              ease: "power3.out",
            },
          );
        }

        return () => {
          timeline.scrollTrigger?.kill();
          timeline.kill();
          Object.assign(scene, INITIAL_SCENE_STATE);
          invalidateRef.current?.();
          gsap.killTweensOf(scene);
        };
      };

      media.add(
        "(prefers-reduced-motion: no-preference) and (min-width: 1024px)",
        () => buildTimeline(false, false),
      );
      media.add(
        "(prefers-reduced-motion: no-preference) and (min-width: 768px) and (max-width: 1023px)",
        () => buildTimeline(false, true),
      );
      media.add(
        "(prefers-reduced-motion: no-preference) and (max-width: 767px)",
        () => buildTimeline(true, false),
      );
    }, section);

    return () => {
      context.revert();
      media.revert();
    };
  }, []);

  return (
    <section
      ref={sectionRef}
      aria-labelledby="hero-title"
      className="relative z-0 h-svh overflow-hidden bg-[#FAFAF8] text-[#191a18]"
    >
      <div className="absolute inset-0 overflow-hidden bg-[#FAFAF8]">
        <Canvas
          dpr={isMobile ? 1 : [1, 1.35]}
          frameloop="demand"
          camera={{
            position: [0, 0, INITIAL_SCENE_STATE.cameraRadius],
            fov: 32,
          }}
          gl={{
            alpha: false,
            antialias: !isMobile,
            powerPreference: isMobile ? "low-power" : "high-performance",
          }}
          shadows={false}
          className="pointer-events-none !absolute inset-0 md:!left-[34%] md:!right-0 md:!w-[66%]"
          aria-hidden="true"
          fallback={
            <div className="flex h-full items-center justify-center px-6 text-center text-sm text-black/55">
              The 3D phone preview is unavailable on this device.
            </div>
          }
        >
          <color attach="background" args={["#FAFAF8"]} />
          <ambientLight intensity={0.65} />
          <hemisphereLight args={["#ffffff", "#dedbd4", 0.72]} />
          <directionalLight
            color="#fffaf0"
            intensity={2.25}
            position={[-3.5, 4, 5]}
          />
          <directionalLight
            color="#fff3df"
            intensity={0.95}
            position={[3, 0.5, 4]}
          />
          <directionalLight
            color="#dbe4ed"
            intensity={1.1}
            position={[4, 1.5, -3]}
          />
          <Environment resolution={isMobile ? 64 : 128}>
            <Lightformer
              form="rect"
              intensity={1.3}
              color="#fffdf8"
              position={[-3, 2, 2]}
              rotation={[0, 0.3, 0]}
              scale={[4.5, 5.5, 1]}
            />
            <Lightformer
              form="rect"
              intensity={0.7}
              color="#d9e0e5"
              position={[3, -0.5, -2]}
              rotation={[0, -0.5, 0]}
              scale={[3, 4.5, 1]}
            />
          </Environment>
          <Suspense fallback={null}>
            <FoldablePhone
              stateRef={sceneStateRef}
              invalidateRef={invalidateRef}
            />
            <IphoneModel stateRef={sceneStateRef} />
          </Suspense>
        </Canvas>

        <div className="pointer-events-none absolute inset-x-5 top-20 z-10 flex justify-between gap-4 sm:inset-x-8 sm:top-24 md:inset-x-12 md:top-28">
          <p className="text-[9px] font-medium uppercase tracking-[0.24em] text-black/70 sm:text-[10px]">
            MR Mobile Wala
          </p>
          <p className="text-right text-[9px] font-medium uppercase tracking-[0.16em] text-black/70 sm:text-[10px] sm:tracking-[0.24em]">
            Made personal. Built to move.
          </p>
        </div>

        <div
          ref={introCopyRef}
          className="pointer-events-none absolute inset-x-5 top-[21%] z-10 flex flex-col gap-4 sm:inset-x-8 sm:top-[20%] md:inset-x-12 md:top-auto md:bottom-[18%] md:flex-row md:items-end md:justify-between md:gap-4"
        >
          <div className="pointer-events-auto max-w-[min(100%,34rem)] md:max-w-[40%]">
            <p className="text-[9px] font-medium uppercase tracking-[0.2em] text-black/70 sm:text-[10px] sm:tracking-[0.28em]">
              Buy · Sell · Repair
            </p>
            <h1
              ref={titleRef}
              id="hero-title"
              className="mt-2 max-w-[12ch] text-[clamp(2rem,8vw,3.5rem)] font-semibold leading-[0.94] tracking-[-0.06em] md:max-w-[11ch] md:text-[clamp(3rem,5.1vw,5rem)]"
            >
              Your next move, made personal.
            </h1>
            <div className="mt-4 flex flex-wrap items-center gap-3 sm:mt-5 md:mt-6">
              <Link
                href="#services"
                className="inline-flex min-h-11 items-center justify-center gap-3 rounded-full bg-[#263D38] px-5 text-xs font-medium text-white transition-colors hover:bg-[#1E302C] focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[#263D38] sm:px-6 sm:text-sm"
              >
                Explore services
                <span aria-hidden="true">&rarr;</span>
              </Link>
              <Link
                href="mailto:contact@mrmobilewala.com"
                className="inline-flex min-h-11 items-center text-xs font-medium text-[#191a18] underline decoration-black/35 underline-offset-4 transition-colors hover:decoration-black focus-visible:rounded-sm focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#263D38] sm:text-sm"
              >
                Talk to us
              </Link>
            </div>
          </div>
          <div className="mb-1 hidden shrink-0 items-center gap-2 text-[8px] uppercase tracking-[0.14em] text-black/70 sm:flex sm:gap-4 sm:text-[10px] sm:tracking-[0.24em] md:mb-0">
            <span className="hidden sm:inline">Explore every angle</span>
            <span aria-hidden="true" className="h-8 w-px bg-black/25" />
            <span>Scroll</span>
          </div>
        </div>
      </div>
    </section>
  );
}

useGLTF.preload(FOLDABLE_MODEL_PATH);
useGLTF.preload(IPHONE_MODEL_PATH);
