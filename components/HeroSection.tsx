"use client";

import { Suspense, useEffect, useRef, useState } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import {
  Environment,
  Lightformer,
  useGLTF,
} from "@react-three/drei";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import * as THREE from "three";
import BrandLogo from "@/components/BrandLogo";

const FOLDABLE_MODEL_PATH =
  "/models/iphone-duo-fold.glb";
const IPHONE_MODEL_PATH = "/phone/source/phone.glb";
const SAMSUNG_MODEL_PATH = "/phone/source/samsung_galaxy_s25_ultra.glb";
const FOLDABLE_CENTER = [-0.000208, -0.059132, 0.003058] as const;
const IPHONE_CENTER = [0, -0.075, 0.0024] as const;
const SAMSUNG_CENTER = [-0.0043, 0.0004, 0.0017] as const;
const SCENE_LABELS = [
  "01 / FORM",
  "02 / DISPLAY",
  "03 / PRECISION ORBIT",
  "04 / MR MOBILE WALA",
  "05 / IPHONE",
  "06 / GALAXY",
];

interface ScrollSceneState {
  foldableYaw: number;
  foldableX: number;
  foldableScale: number;
  iphoneYaw: number;
  iphoneX: number;
  iphoneScale: number;
  samsungYaw: number;
  samsungX: number;
  samsungScale: number;
  cameraAzimuth: number;
  cameraElevation: number;
  cameraRadius: number;
  targetX: number;
  targetY: number;
  targetZ: number;
  fov: number;
  fold: number;
  keyX: number;
  keyY: number;
  keyZ: number;
  keyIntensity: number;
  fillIntensity: number;
  rimIntensity: number;
}

const INITIAL_SCENE_STATE: ScrollSceneState = {
  foldableYaw: -0.04,
  foldableX: 0,
  foldableScale: 9.7,
  iphoneYaw: -0.12,
  iphoneX: 0,
  iphoneScale: 0,
  samsungYaw: -0.12,
  samsungX: 0,
  samsungScale: 0,
  cameraAzimuth: 0.22,
  cameraElevation: 0.09,
  cameraRadius: 4.45,
  targetX: 0,
  targetY: 0,
  targetZ: 0,
  fov: 34,
  fold: 0,
  keyX: -3.5,
  keyY: 4,
  keyZ: 5,
  keyIntensity: 2.5,
  fillIntensity: 1.1,
  rimIntensity: 1.25,
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

function PhoneModels({
  stateRef,
  loadIphone,
  loadSamsung,
}: {
  stateRef: React.RefObject<ScrollSceneState>;
  loadIphone: boolean;
  loadSamsung: boolean;
}) {
  const foldableRef = useRef<THREE.Group>(null);
  const foldActionRef = useRef<THREE.AnimationAction | null>(null);
  const mixerRef = useRef<THREE.AnimationMixer | null>(null);
  const foldDurationRef = useRef(0);
  const foldable = useGLTF(FOLDABLE_MODEL_PATH);
  const cameraFovRef = useRef(INITIAL_SCENE_STATE.fov);

  useEffect(() => {
    const restoreScreenMaterials = correctFoldableScreenTexture(foldable.scene);
    const foldClip = foldable.animations.find((clip) => clip.name === "open-close");
    if (!foldClip) {
      restoreScreenMaterials();
      throw new Error(
        `Expected the "open-close" animation in ${FOLDABLE_MODEL_PATH}.`,
      );
    }

    const mixer = new THREE.AnimationMixer(foldable.scene);
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
  }, [foldable.animations, foldable.scene]);

  useFrame(({ camera }) => {
    const foldableRig = foldableRef.current;
    if (!foldableRig) return;

    const state = stateRef.current;
    foldableRig.position.x = state.foldableX;
    foldableRig.rotation.set(0, state.foldableYaw, 0);
    foldableRig.scale.setScalar(state.foldableScale);
    foldableRig.visible = state.foldableScale > 0.001;

    const isPortrait =
      camera instanceof THREE.PerspectiveCamera && camera.aspect < 0.72;
    const orbitRadius = state.cameraRadius * (isPortrait ? 1.18 : 1);
    const horizontalRadius = orbitRadius * Math.cos(state.cameraElevation);
    camera.position.set(
      state.targetX + Math.sin(state.cameraAzimuth) * horizontalRadius,
      state.targetY + Math.sin(state.cameraElevation) * orbitRadius,
      state.targetZ + Math.cos(state.cameraAzimuth) * horizontalRadius,
    );
    camera.lookAt(state.targetX, state.targetY, state.targetZ);
    if (
      camera instanceof THREE.PerspectiveCamera &&
      Math.abs(cameraFovRef.current - state.fov) > 0.001
    ) {
      camera.fov = state.fov;
      camera.updateProjectionMatrix();
      cameraFovRef.current = state.fov;
    }

    const action = foldActionRef.current;
    const mixer = mixerRef.current;
    if (action && mixer) {
      action.time =
        THREE.MathUtils.clamp(state.fold, 0, 1) * foldDurationRef.current;
      mixer.update(0);
    }
  });

  return (
    <>
      <group ref={foldableRef}>
        <group rotation={[0, 0, Math.PI / 2]}>
          <group position={[...FOLDABLE_CENTER]}>
            <primitive object={foldable.scene} dispose={null} />
          </group>
        </group>
      </group>
      {loadIphone && (
        <Suspense fallback={null}>
          <IphoneModel stateRef={stateRef} />
        </Suspense>
      )}
      {loadSamsung && (
        <Suspense fallback={null}>
          <SamsungModel stateRef={stateRef} />
        </Suspense>
      )}
    </>
  );
}

function IphoneModel({
  stateRef,
}: {
  stateRef: React.RefObject<ScrollSceneState>;
}) {
  const rigRef = useRef<THREE.Group>(null);
  const { scene } = useGLTF(IPHONE_MODEL_PATH);

  useFrame(() => {
    const rig = rigRef.current;
    if (!rig) return;

    const state = stateRef.current;
    rig.position.x = state.iphoneX;
    rig.rotation.y = state.iphoneYaw;
    rig.scale.setScalar(state.iphoneScale);
    rig.visible = state.iphoneScale > 0.001;
  });

  return (
    <group ref={rigRef} scale={0}>
      <group position={[...IPHONE_CENTER]}>
        <primitive object={scene} dispose={null} />
      </group>
    </group>
  );
}

function SamsungModel({
  stateRef,
}: {
  stateRef: React.RefObject<ScrollSceneState>;
}) {
  const rigRef = useRef<THREE.Group>(null);
  const { scene } = useGLTF(SAMSUNG_MODEL_PATH);

  useFrame(() => {
    const rig = rigRef.current;
    if (!rig) return;

    const state = stateRef.current;
    rig.position.x = state.samsungX;
    rig.rotation.y = state.samsungYaw;
    rig.scale.setScalar(state.samsungScale);
    rig.visible = state.samsungScale > 0.001;
  });

  return (
    <group ref={rigRef} scale={0}>
      <group position={[...SAMSUNG_CENTER]}>
        <primitive object={scene} dispose={null} />
      </group>
    </group>
  );
}

function StudioLighting({
  stateRef,
}: {
  stateRef: React.RefObject<ScrollSceneState>;
}) {
  const keyRef = useRef<THREE.DirectionalLight>(null);
  const fillRef = useRef<THREE.DirectionalLight>(null);
  const rimRef = useRef<THREE.DirectionalLight>(null);

  useFrame(() => {
    const state = stateRef.current;
    if (keyRef.current) {
      keyRef.current.position.set(state.keyX, state.keyY, state.keyZ);
      keyRef.current.intensity = state.keyIntensity;
    }
    if (fillRef.current) fillRef.current.intensity = state.fillIntensity;
    if (rimRef.current) rimRef.current.intensity = state.rimIntensity;
  });

  return (
    <>
      <ambientLight intensity={0.65} />
      <hemisphereLight args={["#ffffff", "#c7c4bd", 0.9]} />
      <directionalLight
        ref={keyRef}
        color="#fffaf0"
        intensity={INITIAL_SCENE_STATE.keyIntensity}
        position={[
          INITIAL_SCENE_STATE.keyX,
          INITIAL_SCENE_STATE.keyY,
          INITIAL_SCENE_STATE.keyZ,
        ]}
      />
      <directionalLight
        ref={fillRef}
        color="#fff3df"
        intensity={INITIAL_SCENE_STATE.fillIntensity}
        position={[3, 0.5, 4]}
      />
      <directionalLight
        ref={rimRef}
        color="#cbd9e6"
        intensity={INITIAL_SCENE_STATE.rimIntensity}
        position={[4, 1.5, -3]}
      />
      <pointLight
        color="#fff1dc"
        intensity={2}
        distance={6}
        position={[0, -2.5, 3]}
      />
    </>
  );
}
export default function HeroSection() {
  const sectionRef = useRef<HTMLElement>(null);
  const logoRef = useRef<HTMLDivElement>(null);
  const sceneLabelsRef = useRef<Array<HTMLParagraphElement | null>>([]);
  const sceneStateRef = useRef<ScrollSceneState>({ ...INITIAL_SCENE_STATE });
  const [loadIphone, setLoadIphone] = useState(false);
  const [loadSamsung, setLoadSamsung] = useState(false);
  const requestedModelsRef = useRef({ iphone: false, samsung: false });

  useEffect(() => {
    const section = sectionRef.current;
    const logo = logoRef.current;
    const sceneLabels = sceneLabelsRef.current.filter(
      (label): label is HTMLParagraphElement => label !== null,
    );
    if (!section || !logo || sceneLabels.length !== SCENE_LABELS.length) return;

    gsap.registerPlugin(ScrollTrigger);
    const media = gsap.matchMedia();

    media.add("(prefers-reduced-motion: no-preference)", () => {
      const scene = sceneStateRef.current;
      Object.assign(scene, INITIAL_SCENE_STATE);
      requestedModelsRef.current = { iphone: false, samsung: false };
      setLoadIphone(false);
      setLoadSamsung(false);
      gsap.set(logo, {
        autoAlpha: 0,
        scale: 0.96,
        y: 18,
        x: 0,
        clipPath: "inset(0 100% 0 0)",
      });
      gsap.set(sceneLabels, { autoAlpha: 0, y: 8 });

      const requestModelsForProgress = (progress: number) => {
        if (progress >= 0.52 && !requestedModelsRef.current.iphone) {
          requestedModelsRef.current.iphone = true;
          setLoadIphone(true);
        }
        if (progress >= 0.75 && !requestedModelsRef.current.samsung) {
          requestedModelsRef.current.samsung = true;
          setLoadSamsung(true);
        }
      };

      const timeline = gsap.timeline({
        scrollTrigger: {
          trigger: section,
          start: "top top",
          end: "+=4800",
          pin: section,
          pinSpacing: true,
          anticipatePin: 1,
          scrub: 0.45,
          invalidateOnRefresh: true,
          onUpdate: (self) => requestModelsForProgress(self.progress),
        },
      });

      timeline
        .to(
          scene,
          {
            foldableScale: 10.2,
            foldableYaw: -0.06,
            cameraAzimuth: 0.38,
            cameraElevation: 0.11,
            cameraRadius: 4.05,
            fov: 32,
            keyX: -4,
            keyY: 4.5,
            keyZ: 4.5,
            keyIntensity: 2.35,
            fillIntensity: 0.9,
            duration: 0.08,
            ease: "power2.out",
          },
          0,
        )
        .to(
          scene,
          {
            foldableYaw: 0,
            cameraAzimuth: 0.035,
            cameraElevation: 0.025,
            cameraRadius: 3.72,
            targetY: 0.055,
            fov: 28,
            fold: 0.28,
            keyX: -4.5,
            keyY: 1.2,
            keyZ: 4,
            keyIntensity: 2.05,
            rimIntensity: 1.15,
            duration: 0.08,
            ease: "sine.inOut",
          },
          0.08,
        )
        .to(
          scene,
          {
            cameraAzimuth: 1.42,
            cameraElevation: 0.075,
            cameraRadius: 3.95,
            targetX: 0.025,
            targetY: 0.015,
            fold: 0.58,
            keyX: 0.5,
            keyY: 2,
            keyZ: 4.5,
            keyIntensity: 2.4,
            fillIntensity: 0.72,
            rimIntensity: 1.55,
            duration: 0.08,
            ease: "sine.inOut",
          },
          0.08,
        )
        .to(
          scene,
          {
            cameraAzimuth: 2.8,
            cameraElevation: 0.16,
            cameraRadius: 4.25,
            targetX: -0.02,
            targetY: 0.025,
            fov: 31,
            fold: 0.86,
            keyX: 3.5,
            keyY: 3,
            keyZ: -4.5,
            keyIntensity: 2.25,
            fillIntensity: 0.85,
            rimIntensity: 1.65,
            duration: 0.08,
            ease: "sine.inOut",
          },
          0.24,
        )
        .to(
          scene,
          {
            cameraAzimuth: 3.3,
            cameraElevation: 0.42,
            cameraRadius: 4.55,
            targetX: 0,
            targetY: 0,
            fold: 1,
            keyX: -1,
            keyY: 4.5,
            keyZ: -4,
            keyIntensity: 2.5,
            duration: 0.06,
            ease: "sine.inOut",
          },
          0.32,
        )
        .to(
          scene,
          {
            foldableScale: 0,
            foldableX: -0.65,
            cameraRadius: 4.75,
            cameraAzimuth: 3.55,
            duration: 0.055,
            ease: "power2.in",
          },
          0.38,
        )
        .to(
          logo,
          {
            autoAlpha: 1,
            scale: 1,
            y: 0,
            x: 0,
            clipPath: "inset(0 0% 0 0)",
            duration: 0.075,
            ease: "power3.out",
          },
          0.405,
        )
        .to(
          logo,
          {
            scale: 1.01,
            duration: 0.025,
            ease: "sine.inOut",
          },
          0.48,
        )
        .to(
          logo,
          {
            autoAlpha: 0,
            scale: 0.94,
            y: -18,
            x: -24,
            clipPath: "inset(0 0 0 100%)",
            duration: 0.06,
            ease: "power2.in",
          },
          0.51,
        )
        .to(
          scene,
          {
            cameraAzimuth: Math.PI * 2 + 0.38,
            cameraRadius: 4.55,
            targetX: 0,
            targetY: 0,
            duration: 0.09,
            ease: "sine.inOut",
          },
          0.46,
        )
        .to(
          scene,
          {
            iphoneScale: 10.2,
            foldableScale: 0,
            samsungScale: 0,
            iphoneYaw: -0.2,
            iphoneX: 0.45,
            cameraAzimuth: Math.PI * 2 + 0.38,
            cameraElevation: 0.09,
            cameraRadius: 4.55,
            targetX: 0,
            targetY: 0,
            fov: 33,
            keyX: -3.8,
            keyY: 3.5,
            keyZ: 4,
            keyIntensity: 2.4,
            fillIntensity: 0.9,
            rimIntensity: 1.25,
            duration: 0.04,
            ease: "power2.out",
          },
          0.55,
        )
        .to(
          scene,
          {
            iphoneX: 0,
            cameraAzimuth: Math.PI * 2 + 0.035,
            cameraElevation: 0.02,
            cameraRadius: 3.68,
            targetY: 0.045,
            fov: 32,
            keyX: -4.2,
            keyY: 1.3,
            keyZ: 4,
            keyIntensity: 1.95,
            duration: 0.06,
            ease: "sine.inOut",
          },
          0.59,
        )
        .to(
          scene,
          {
            cameraAzimuth: Math.PI * 2 + 1.35,
            cameraElevation: 0.075,
            cameraRadius: 3.95,
            targetX: 0.02,
            targetY: 0,
            keyX: 0.5,
            keyY: 2.4,
            keyZ: 4.2,
            keyIntensity: 2.35,
            rimIntensity: 1.6,
            duration: 0.06,
            ease: "sine.inOut",
          },
          0.65,
        )
        .to(
          scene,
          {
            cameraAzimuth: Math.PI * 2 + 2.78,
            cameraElevation: 0.14,
            cameraRadius: 4.25,
            targetX: -0.015,
            keyX: 3,
            keyY: 3.2,
            keyZ: -4.5,
            keyIntensity: 2.25,
            fillIntensity: 0.82,
            duration: 0.07,
            ease: "sine.inOut",
          },
          0.71,
        )
        .to(
          scene,
          {
            iphoneX: -0.85,
            iphoneScale: 0,
            samsungX: 0.72,
            samsungScale: 0.52,
            samsungYaw: -0.18,
            cameraAzimuth: Math.PI * 3,
            cameraElevation: 0.1,
            cameraRadius: 4.55,
            targetX: 0,
            targetY: 0,
            fov: 33,
            keyX: -3.8,
            keyY: 3.4,
            keyZ: 4.1,
            keyIntensity: 2.45,
            fillIntensity: 0.95,
            rimIntensity: 1.3,
            duration: 0.04,
            ease: "power2.inOut",
          },
          0.78,
        )
        .to(
          scene,
          {
            cameraAzimuth: Math.PI * 4,
            cameraElevation: 0.025,
            cameraRadius: 3.8,
            targetY: 0.035,
            fov: 30,
            keyX: -4.2,
            keyY: 1.5,
            keyZ: 4,
            keyIntensity: 2.05,
            duration: 0.06,
            ease: "sine.inOut",
          },
          0.82,
        )
        .to(
          scene,
          {
            cameraAzimuth: Math.PI * 4 + Math.PI / 2,
            cameraElevation: 0.08,
            cameraRadius: 3.95,
            targetY: 0,
            keyX: 0.2,
            keyY: 2.5,
            keyZ: 4.5,
            keyIntensity: 2.35,
            rimIntensity: 1.55,
            duration: 0.04,
            ease: "sine.inOut",
          },
          0.88,
        )
        .to(
          scene,
          {
            cameraAzimuth: Math.PI * 5,
            cameraElevation: 0.14,
            cameraRadius: 4.15,
            keyX: 3.3,
            keyY: 3.2,
            keyZ: -4.3,
            keyIntensity: 2.25,
            duration: 0.04,
            ease: "sine.inOut",
          },
          0.92,
        )
        .to(
          scene,
          {
            cameraAzimuth: Math.PI * 5 - 0.32,
            cameraElevation: 0.09,
            cameraRadius: 4.35,
            targetX: 0,
            targetY: 0,
            fov: 32,
            keyX: -3.5,
            keyY: 4,
            keyZ: 5,
            keyIntensity: 2.5,
            fillIntensity: 1.1,
            rimIntensity: 1.25,
            duration: 0.04,
            ease: "sine.inOut",
          },
          0.96,
        );

      sceneLabels.forEach((label, index) => {
        const start = [0.005, 0.085, 0.165, 0.405, 0.55, 0.78][index];
        const end = [0.08, 0.16, 0.405, 0.55, 0.78, 0.995][index];
        timeline
          .fromTo(
            label,
            { autoAlpha: 0, y: 8 },
            {
              autoAlpha: 1,
              y: 0,
              duration: 0.025,
              ease: "power2.out",
              immediateRender: false,
            },
            start,
          )
          .to(
            label,
            {
              autoAlpha: 0,
              y: -6,
              duration: 0.025,
              ease: "power2.in",
            },
            end,
          );
      });

      ScrollTrigger.refresh();
      return () => {
        timeline.scrollTrigger?.kill();
        timeline.kill();
      };
    });

    media.add("(prefers-reduced-motion: reduce)", () => {
      Object.assign(sceneStateRef.current, INITIAL_SCENE_STATE);
      gsap.set(logo, { autoAlpha: 0, scale: 1, x: 0, y: 0 });
    });

    return () => media.revert();
  }, []);

  return (
    <section
      ref={sectionRef}
      aria-label="MR Mobile Wala smartphone showcase"
      className="relative h-svh overflow-hidden bg-white text-[#191a18]"
    >
      <div className="relative h-full overflow-hidden bg-white">
        <Canvas
          dpr={[1, 1.5]}
          camera={{
            position: [0, 0, INITIAL_SCENE_STATE.cameraRadius],
            fov: INITIAL_SCENE_STATE.fov,
          }}
          gl={{
            alpha: false,
            antialias: true,
            powerPreference: "high-performance",
          }}
          className="!absolute inset-0"
          aria-hidden="true"
        >
          <color attach="background" args={["#FFFFFF"]} />
          <StudioLighting stateRef={sceneStateRef} />
          <Environment resolution={128}>
            <Lightformer
              form="rect"
              intensity={1.45}
              color="#fffdf8"
              position={[-3, 2, 2]}
              rotation={[0, 0.3, 0]}
              scale={[4.5, 5.5, 1]}
            />
            <Lightformer
              form="rect"
              intensity={0.9}
              color="#c9d5df"
              position={[3, -0.5, -2]}
              rotation={[0, -0.5, 0]}
              scale={[3, 4.5, 1]}
            />
          </Environment>
          <Suspense fallback={null}>
            <PhoneModels
              stateRef={sceneStateRef}
              loadIphone={loadIphone}
              loadSamsung={loadSamsung}
            />
          </Suspense>
        </Canvas>

        <div className="pointer-events-none absolute inset-0 z-20 flex items-center justify-center">
          <div
            ref={logoRef}
            className="invisible flex scale-[0.94] items-center justify-center opacity-0"
          >
            <BrandLogo
              variant="footer"
              href={null}
              priority
              width={520}
              alt="Mr. Mobile Wala"
              imageClassName="!w-[min(72vw,520px)] !max-w-[520px]"
            />
          </div>
        </div>

        <div
          aria-hidden="true"
          className="pointer-events-none absolute left-6 top-24 z-10 md:left-12 md:top-28"
        >
          {SCENE_LABELS.map((label, index) => (
            <p
              key={label}
              ref={(element) => {
                sceneLabelsRef.current[index] = element;
              }}
              className="invisible absolute left-0 top-0 whitespace-nowrap text-[9px] font-medium uppercase tracking-[0.24em] text-black/50 opacity-0 sm:text-[10px]"
            >
              {label}
            </p>
          ))}
        </div>

        <div className="pointer-events-none absolute bottom-[max(28px,env(safe-area-inset-bottom))] left-6 right-6 flex items-end justify-between md:bottom-10 md:left-12 md:right-12">
          <div>
            <p className="text-[9px] font-medium uppercase tracking-[0.28em] text-black/40 sm:text-[10px]">
              Buy · Sell · Repair
            </p>
            <p className="mt-2 text-xs tracking-[0.08em] text-black/65">
              Made personal. Built to move.
            </p>
          </div>
          <div className="flex items-center gap-3 text-[9px] uppercase tracking-[0.24em] text-black/45">
            <span className="hidden sm:inline">Explore every angle</span>
            <span aria-hidden="true" className="h-8 w-px origin-top bg-black/30" />
            <span aria-hidden="true">Scroll</span>
          </div>
        </div>
        <h1 className="sr-only">
          MR Mobile Wala — Buy, sell, and repair smartphones
        </h1>
      </div>
    </section>
  );
}

useGLTF.preload(FOLDABLE_MODEL_PATH);
