
"use client";

import { Suspense, useEffect, useMemo, useRef } from "react";
import { Canvas, useFrame, useThree } from "@react-three/fiber";
import { Environment, useGLTF } from "@react-three/drei";
import * as THREE from "three";
import { clone } from "three/examples/jsm/utils/SkeletonUtils.js";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

const MODEL_PATH = "/models/source/iphone_air.glb";

type Motion = {
  rotationY: number;
  rotationX: number;
  scale: number;
};

const initialMotion: Motion = {
  rotationY: 0.3,
  rotationX: -0.04,
  scale: 1,
};

function PhoneModel({ motion }: { motion: Motion }) {
  const { scene } = useGLTF(MODEL_PATH);
  const model = useMemo(() => clone(scene), [scene]);
  const groupRef = useRef<THREE.Group>(null);

  const { camera, size } = useThree();

  // Measure the unscaled model and calculate a single normalization factor.
  const modelData = useMemo(() => {
    const box = new THREE.Box3().setFromObject(model);
    const dimensions = box.getSize(new THREE.Vector3());
    const center = box.getCenter(new THREE.Vector3());
    const longestSide = Math.max(
      dimensions.x,
      dimensions.y,
      dimensions.z
    ) || 1;

    return {
      center,
      factor: 2.5 / longestSide,
    };
  }, [model]);

  useEffect(() => {
    model.traverse((object) => {
      if (!(object instanceof THREE.Mesh)) return;

      object.castShadow = true;
      object.receiveShadow = true;

      const materials = Array.isArray(object.material)
        ? object.material
        : [object.material];

      materials.forEach((material) => {
        material.needsUpdate = true;
      });
    });
  }, [model]);

  // Keep the whole phone visible across screen sizes.
  useEffect(() => {
    if (!(camera instanceof THREE.PerspectiveCamera)) return;

    camera.fov =
      size.width < 480 ? 36 :
      size.width < 768 ? 34 :
      30;

    camera.position.set(
      0,
      0,
      size.width < 480 ? 6.4 :
      size.width < 1024 ? 5.7 :
      5.1
    );

    camera.lookAt(0, 0, 0);
    camera.updateProjectionMatrix();
  }, [camera, size.width]);

  useFrame((_, delta) => {
    const group = groupRef.current;
    if (!group) return;

    group.rotation.y = THREE.MathUtils.damp(
      group.rotation.y,
      motion.rotationY,
      5,
      delta
    );

    group.rotation.x = THREE.MathUtils.damp(
      group.rotation.x,
      motion.rotationX,
      5,
      delta
    );

    group.scale.setScalar(
      THREE.MathUtils.damp(
        group.scale.x,
        motion.scale,
        5,
        delta
      )
    );
  });

  return (
    <group ref={groupRef}>
      <primitive
        object={model}
        scale={modelData.factor}
        position={[
          -modelData.center.x * modelData.factor,
          -modelData.center.y * modelData.factor,
          -modelData.center.z * modelData.factor,
        ]}
      />
    </group>
  );
}

function PhoneScene({ motion }: { motion: Motion }) {
  return (
    <>
      <ambientLight intensity={1.2} />

      <directionalLight
        position={[4, 5, 6]}
        intensity={2.2}
      />

      <directionalLight
        position={[-4, 2, -3]}
        intensity={1.5}
        color="#E1E9E4"
      />

      <spotLight
        position={[0, 4, 4]}
        intensity={0.8}
        angle={0.55}
        penumbra={1}
      />

      <Suspense fallback={null}>
        <PhoneModel motion={motion} />
        <Environment preset="studio" />
      </Suspense>
    </>
  );
}

export default function IPhoneAirScroll() {
  const sectionRef = useRef<HTMLElement>(null);

  const motion = useRef<Motion>({
    ...initialMotion,
  });

  useEffect(() => {
    const section = sectionRef.current;
    if (!section) return;

    const ctx = gsap.context(() => {
      const state = motion.current;

      // Respect the user's reduced-motion preference.
      if (
        window.matchMedia("(prefers-reduced-motion: reduce)").matches
      ) {
        return;
      }

      const timeline = gsap.timeline({
        defaults: {
          ease: "none",
        },
        scrollTrigger: {
          trigger: section,
          start: "top top",
          end: "+=300%",
          pin: true,
          scrub: 1,
          anticipatePin: 1,
          invalidateOnRefresh: true,
        },
      });

      // Front three-quarter angle.
      timeline.to(state, {
        rotationY: 0.3,
        rotationX: -0.04,
        scale: 1,
        duration: 1,
      });

      // Slowly reveal the back.
      timeline.to(state, {
        rotationY: Math.PI * 0.8,
        rotationX: 0.02,
        scale: 1.04,
        duration: 1,
      });

      // Side profile.
      timeline.to(state, {
        rotationY: Math.PI * 1.5,
        rotationX: -0.06,
        scale: 1.06,
        duration: 1,
      });

      // Settle into the final angle.
      timeline.to(state, {
        rotationY: Math.PI * 2 + 0.3,
        rotationX: -0.02,
        scale: 1,
        duration: 1,
      });
    }, section);

    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={sectionRef}
      className="relative h-[100svh] min-h-[520px] w-full overflow-hidden"
      style={{
        background: "#F5F4F0",
      }}
    >
      {/* Subtle studio glow, no text or decorative UI. */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0"
        style={{
          background:
            "radial-gradient(ellipse at center, rgba(215,222,215,0.38) 0%, rgba(245,244,240,0) 48%)",
        }}
      />

      <div className="absolute inset-0">
        <Canvas
          camera={{
            position: [0, 0, 5.1],
            fov: 30,
            near: 0.1,
            far: 100,
          }}
          dpr={[1, 1.5]}
          frameloop="always"
          gl={{
            alpha: true,
            antialias: true,
            powerPreference: "high-performance",
          }}
          style={{
            background: "transparent",
            touchAction: "pan-y",
          }}
        >
          <PhoneScene motion={motion.current} />
        </Canvas>
      </div>
    </section>
  );
}

useGLTF.preload(MODEL_PATH);
