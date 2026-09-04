"use client";

import { Canvas, useFrame } from "@react-three/fiber";
import {
  Float,
  MeshTransmissionMaterial,
  OrbitControls,
} from "@react-three/drei";
import { useRef } from "react";
import * as THREE from "three";

function NovaSculpture() {
  const group = useRef<THREE.Group>(null);

  useFrame((state) => {
    if (!group.current) return;

    const time = state.clock.getElapsedTime();

    group.current.rotation.y = time * 0.12;
    group.current.rotation.x = Math.sin(time * 0.4) * 0.1;

    group.current.position.x = THREE.MathUtils.lerp(
      group.current.position.x,
      state.pointer.x * 0.3,
      0.035
    );

    group.current.position.y = THREE.MathUtils.lerp(
      group.current.position.y,
      state.pointer.y * 0.18,
      0.035
    );
  });

  return (
    <group ref={group}>
      {/* Main sculptural glass form */}
      <mesh rotation={[0.3, 0, 0.2]} scale={1.25}>
        <torusKnotGeometry
          args={[1.05, 0.28, 96, 16, 2, 3]}
        />

        <MeshTransmissionMaterial
          backside
          samples={4}
          resolution={256}
          thickness={0.6}
          roughness={0.1}
          transmission={1}
          ior={1.45}
          chromaticAberration={0.04}
          anisotropy={0.2}
          distortion={0.08}
          distortionScale={0.18}
          temporalDistortion={0.04}
        />
      </mesh>

      {/* Warm inner core */}
      <mesh scale={0.72}>
        <sphereGeometry args={[1, 32, 32]} />

        <meshPhysicalMaterial
          transmission={0.5}
          thickness={0.9}
          roughness={0.2}
          metalness={0.15}
          clearcoat={1}
          clearcoatRoughness={0.1}
          color="#f3b77a"
          emissive="#7a3f1f"
          emissiveIntensity={0.3}
        />
      </mesh>

      {/* Elegant floating ring */}
      <mesh rotation={[Math.PI / 2, 0.4, 0]}>
        <torusGeometry args={[1.75, 0.025, 12, 96]} />

        <meshStandardMaterial
          color="#f4c08b"
          metalness={1}
          roughness={0.2}
          emissive="#9b542b"
          emissiveIntensity={0.3}
        />
      </mesh>
    </group>
  );
}

function FloatingParticles() {
  const particles = Array.from({ length: 12 });

  return (
    <>
      {particles.map((_, index) => {
        const angle =
          (index / particles.length) * Math.PI * 2;

        const radius = 2.2 + (index % 3) * 0.3;

        return (
          <mesh
            key={index}
            position={[
              Math.cos(angle) * radius,
              ((index % 5) - 2) * 0.45,
              Math.sin(angle) * radius,
            ]}
          >
            <sphereGeometry
              args={[0.018 + (index % 3) * 0.006, 8, 8]}
            />

            <meshBasicMaterial color="#f4c08b" />
          </mesh>
        );
      })}
    </>
  );
}

export default function Nova3D() {
  return (
    <div className="relative h-[380px] w-full sm:h-[460px] lg:h-[560px]">
      <Canvas
        camera={{
          position: [0, 0, 6],
          fov: 42,
        }}
        dpr={[1, 1.35]}
        performance={{
          min: 0.5,
        }}
        gl={{
          antialias: true,
          alpha: true,
          powerPreference: "high-performance",
        }}
      >
        <ambientLight intensity={0.35} />

        <pointLight
          position={[3, 3, 4]}
          intensity={14}
          distance={10}
        />

        <pointLight
          position={[-4, -2, 2]}
          intensity={9}
          distance={8}
        />

        <pointLight
          position={[0, -4, -2]}
          intensity={6}
          distance={7}
        />

        <Float
          speed={1.2}
          rotationIntensity={0.12}
          floatIntensity={0.35}
        >
          <NovaSculpture />
        </Float>

        <FloatingParticles />

        <OrbitControls
          enableZoom={false}
          enablePan={false}
          enableRotate={false}
        />
      </Canvas>

      {/* Ambient luxury glow */}
      <div className="pointer-events-none absolute left-1/2 top-1/2 -z-10 h-64 w-64 -translate-x-1/2 -translate-y-1/2 rounded-full bg-orange-300/10 blur-[100px]" />
    </div>
  );
}