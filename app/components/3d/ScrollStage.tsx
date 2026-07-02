"use client";

import { useFrame, useThree } from "@react-three/fiber";
import { useRef, useEffect, useMemo } from "react";
import * as THREE from "three";

// --- LAYER 2 & 3: HIGH-DENSITY ORBITAL TUNNEL ---
function HighDensityOrbitalTunnel({ count = 900 }) {
  const pointsRef = useRef<THREE.Points>(null);
  const ringRef1 = useRef<THREE.Mesh>(null);
  const ringRef2 = useRef<THREE.Mesh>(null);

  const [positions, colors] = useMemo(() => {
    const pos = new Float32Array(count * 3);
    const cols = new Float32Array(count * 3);
    const colorBlue = new THREE.Color("#2563eb");
    const colorPurple = new THREE.Color("#a855f7");

    for (let i = 0; i < count; i++) {
      // Build an immersive infinite tunnel shape extending back into space
      const radius = 1.8 + Math.random() * 4.0;
      const angle = Math.random() * Math.PI * 2;
      
      pos[i * 3] = Math.cos(angle) * radius;
      pos[i * 3 + 1] = Math.sin(angle) * radius;
      pos[i * 3 + 2] = (Math.random() - 0.5) * 15;

      const finalColor = Math.random() > 0.5 ? colorBlue : colorPurple;
      cols[i * 3] = finalColor.r;
      cols[i * 3 + 1] = finalColor.g;
      cols[i * 3 + 2] = finalColor.b;
    }
    return [pos, cols];
  }, [count]);

  useFrame((state) => {
    const time = state.clock.getElapsedTime();
    if (pointsRef.current) {
      pointsRef.current.rotation.z = time * 0.03;
    }
    if (ringRef1.current) {
      ringRef1.current.rotation.y = time * 0.06;
      ringRef1.current.rotation.x = Math.sin(time * 0.1) * 0.1;
    }
    if (ringRef2.current) {
      ringRef2.current.rotation.y = -time * 0.04;
      ringRef2.current.rotation.z = Math.cos(time * 0.1) * 0.1;
    }
  });

  return (
    <group position={[0, 0, -2]}>
      {/* High Density Star Streams */}
      <points ref={pointsRef}>
        <bufferGeometry>
          <bufferAttribute attach="attributes-position" args={[positions, 3]} count={count} array={positions} itemSize={3} />
          <bufferAttribute attach="attributes-color" args={[colors, 3]} count={count} array={colors} itemSize={3} />
        </bufferGeometry>
        <pointsMaterial size={0.04} vertexColors transparent opacity={0.7} blending={THREE.AdditiveBlending} depthWrite={false} />
      </points>

      {/* Massive Neon Energy Rings */}
      <mesh ref={ringRef1} rotation={[Math.PI / 4, 0, 0]}>
        <torusGeometry args={[2.6, 0.012, 8, 80]} />
        <meshBasicMaterial color="#3b82f6" transparent opacity={0.3} wireframe />
      </mesh>
      <mesh ref={ringRef2} rotation={[-Math.PI / 3, Math.PI / 6, 0]}>
        <torusGeometry args={[2.2, 0.008, 8, 70]} />
        <meshBasicMaterial color="#a855f7" transparent opacity={0.2} wireframe />
      </mesh>
    </group>
  );
}

// --- LAYER 4: FLOATING HOLOGRAPHIC GEOMETRY ---
function HolographicNodes() {
  const groupRef = useRef<THREE.Group>(null);

  useFrame((state) => {
    if (groupRef.current) {
      groupRef.current.rotation.y = state.clock.getElapsedTime() * 0.08;
    }
  });

  return (
    <group ref={groupRef}>
      <mesh position={[-2.5, 1.2, -2]}>
        <boxGeometry args={[0.25, 0.25, 0.25]} />
        <meshBasicMaterial color="#3b82f6" wireframe transparent opacity={0.35} />
      </mesh>
      <mesh position={[2.4, -1.0, -1.5]}>
        <icosahedronGeometry args={[0.2, 0]} />
        <meshBasicMaterial color="#d946ef" wireframe transparent opacity={0.35} />
      </mesh>
    </group>
  );
}

// --- ENGINE CONTROLLER WITH CINEMATIC LIGHTING & NEBULA FOG ---
export default function ScrollStage() {
  const { camera } = useThree();
  const scrollPercent = useRef(0);
  const mouse = useRef({ x: 0, y: 0 });

  useEffect(() => {
    const calculateScroll = () => {
      const pixelsScrolled = window.scrollY;
      const totalScrollableHeight = document.documentElement.scrollHeight - window.innerHeight;
      if (totalScrollableHeight > 0) {
        scrollPercent.current = pixelsScrolled / totalScrollableHeight;
      }
    };
    const handleMouseMove = (e: MouseEvent) => {
      mouse.current.x = (e.clientX / window.innerWidth) - 0.5;
      mouse.current.y = (e.clientY / window.innerHeight) - 0.5;
    };
    window.addEventListener("scroll", calculateScroll, { passive: true });
    window.addEventListener("mousemove", handleMouseMove, { passive: true });
    return () => {
      window.removeEventListener("scroll", calculateScroll);
      window.removeEventListener("mousemove", handleMouseMove);
    };
  }, []);

  useFrame(() => {
    const currentProgress = scrollPercent.current;
    
    // Smooth cinematic tracking matrices
    let targetX = THREE.MathUtils.lerp(mouse.current.x * 0.5, -0.2, currentProgress);
    let targetY = THREE.MathUtils.lerp(-mouse.current.y * 0.4, 0.1, currentProgress);
    let targetZ = THREE.MathUtils.lerp(3.5, 5.0, currentProgress);

    camera.position.x = THREE.MathUtils.lerp(camera.position.x, targetX, 0.05);
    camera.position.y = THREE.MathUtils.lerp(camera.position.y, targetY, 0.05);
    camera.position.z = THREE.MathUtils.lerp(camera.position.z, targetZ, 0.05);
    camera.lookAt(0, 0, -2);
  });

  return (
    <>
      {/* Volumetric ambient colors serving as our dark nebula environment background */}
      <color attach="background" args={["#020409"]} />
      
      <ambientLight intensity={0.4} />
      <pointLight position={[2, 3, 2]} intensity={2.0} color="#2563eb" />
      <pointLight position={[-2, -3, 2]} intensity={2.5} color="#9333ea" />

      <HighDensityOrbitalTunnel count={1000} />
      <HolographicNodes />
    </>
  );
}