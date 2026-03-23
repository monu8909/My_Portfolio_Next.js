"use client";

import { useRef } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import { OrbitControls, Torus, Icosahedron, MeshDistortMaterial, Float } from "@react-three/drei";
import * as THREE from "three";

function TorusKnot() {
  const meshRef = useRef<THREE.Mesh>(null);

  useFrame((state) => {
    if (meshRef.current) {
      meshRef.current.rotation.x = state.clock.elapsedTime * 0.15;
      meshRef.current.rotation.y = state.clock.elapsedTime * 0.25;
    }
  });

  return (
    <mesh ref={meshRef} position={[0, 0, 0]}>
      <torusKnotGeometry args={[1.2, 0.35, 128, 32]} />
      <meshStandardMaterial
        color="#00d4ff"
        metalness={0.8}
        roughness={0.2}
        emissive="#00a0cc"
        emissiveIntensity={0.3}
        wireframe={false}
      />
    </mesh>
  );
}

function FloatingOrb({ position, color, speed }: { position: [number, number, number]; color: string; speed: number }) {
  const ref = useRef<THREE.Mesh>(null);

  useFrame((state) => {
    if (ref.current) {
      ref.current.rotation.x = state.clock.elapsedTime * speed;
      ref.current.rotation.y = state.clock.elapsedTime * speed * 0.7;
      ref.current.position.y = position[1] + Math.sin(state.clock.elapsedTime * speed) * 0.3;
    }
  });

  return (
    <Float speed={2} rotationIntensity={0.5} floatIntensity={0.5}>
      <mesh ref={ref} position={position}>
        <icosahedronGeometry args={[0.4, 0]} />
        <meshStandardMaterial
          color={color}
          metalness={0.9}
          roughness={0.1}
          emissive={color}
          emissiveIntensity={0.2}
          wireframe
        />
      </mesh>
    </Float>
  );
}

function WireframeRing() {
  const ref = useRef<THREE.Mesh>(null);
  useFrame((state) => {
    if (ref.current) {
      ref.current.rotation.x = state.clock.elapsedTime * 0.1;
      ref.current.rotation.z = state.clock.elapsedTime * 0.15;
    }
  });
  return (
    <mesh ref={ref} position={[0, 0, 0]}>
      <torusGeometry args={[2.2, 0.02, 8, 60]} />
      <meshStandardMaterial color="#7c3aed" emissive="#7c3aed" emissiveIntensity={0.5} opacity={0.4} transparent />
    </mesh>
  );
}

export default function Scene3D() {
  return (
    <Canvas
      camera={{ position: [0, 0, 5], fov: 50 }}
      style={{ width: "100%", height: "100%" }}
      gl={{ antialias: true, alpha: true }}
    >
      <ambientLight intensity={0.3} />
      <pointLight position={[5, 5, 5]} intensity={1.5} color="#00d4ff" />
      <pointLight position={[-5, -5, 5]} intensity={1} color="#7c3aed" />
      <spotLight position={[0, 10, 0]} intensity={0.5} color="#a8e8ff" />

      <TorusKnot />
      <WireframeRing />
      <FloatingOrb position={[-2.5, 1.5, 0]} color="#00d4ff" speed={0.5} />
      <FloatingOrb position={[2.5, -1.5, -0.5]} color="#7c3aed" speed={0.7} />
      <FloatingOrb position={[2, 1.8, 0.5]} color="#d2bbff" speed={0.3} />
      <FloatingOrb position={[-2, -1.8, 0]} color="#3cd7ff" speed={0.6} />
    </Canvas>
  );
}
