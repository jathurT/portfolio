"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import { Canvas, useFrame, useThree } from "@react-three/fiber";
import { Text, OrbitControls, MeshDistortMaterial, Sphere, Stars } from "@react-three/drei";
import { motion, AnimatePresence } from "framer-motion";
import * as THREE from "three";

// Enhanced particles with mouse interaction
function Particles({ mousePosition }: { mousePosition: { x: number; y: number } }) {
  const particlesRef = useRef<THREE.Points>(null);
  const particleCount = 3000; // Increased from 1000

  const positions = useMemo(() => {
    const pos = new Float32Array(particleCount * 3);
    for (let i = 0; i < particleCount * 3; i++) {
      pos[i] = (Math.random() - 0.5) * 80;
    }
    return pos;
  }, [particleCount]);

  const colors = useMemo(() => {
    const col = new Float32Array(particleCount * 3);
    for (let i = 0; i < particleCount; i++) {
      const colorChoice = Math.random();
      if (colorChoice < 0.33) {
        // Forest Green: #2E6F40
        col[i * 3] = 0.18;
        col[i * 3 + 1] = 0.44;
        col[i * 3 + 2] = 0.25;
      } else if (colorChoice < 0.66) {
        // Emerald Green: #00674F
        col[i * 3] = 0.0;
        col[i * 3 + 1] = 0.4;
        col[i * 3 + 2] = 0.31;
      } else {
        // Lincoln Green: #214C00
        col[i * 3] = 0.13;
        col[i * 3 + 1] = 0.3;
        col[i * 3 + 2] = 0.0;
      }
    }
    return col;
  }, [particleCount]);

  useFrame((state) => {
    if (particlesRef.current) {
      particlesRef.current.rotation.y = state.clock.elapsedTime * 0.08;
      particlesRef.current.rotation.x = Math.sin(state.clock.elapsedTime * 0.3) * 0.2;

      // React to mouse movement
      particlesRef.current.rotation.z = mousePosition.x * 0.1;
    }
  });

  return (
    <points ref={particlesRef}>
      <bufferGeometry>
        <bufferAttribute
          attach="attributes-position"
          count={particleCount}
          array={positions}
          itemSize={3}
          args={[positions, 3]}
        />
        <bufferAttribute
          attach="attributes-color"
          count={particleCount}
          array={colors}
          itemSize={3}
          args={[colors, 3]}
        />
      </bufferGeometry>
      <pointsMaterial
        size={0.08}
        vertexColors
        sizeAttenuation
        transparent
        opacity={0.8}
        blending={THREE.AdditiveBlending}
      />
    </points>
  );
}

// Bold, Interactive 3D Text
function AnimatedText({ mousePosition }: { mousePosition: { x: number; y: number } }) {
  const textRef = useRef<THREE.Mesh>(null);
  const [hovered, setHovered] = useState(false);
  const [clicked, setClicked] = useState(false);

  useFrame((state) => {
    if (textRef.current) {
      // More dramatic rotation
      textRef.current.rotation.y = Math.sin(state.clock.elapsedTime * 0.8) * 0.3 + mousePosition.x * 0.5;
      textRef.current.rotation.x = Math.cos(state.clock.elapsedTime * 0.5) * 0.1 + mousePosition.y * 0.3;

      // Floating animation
      textRef.current.position.y = Math.sin(state.clock.elapsedTime * 1.2) * 0.3;

      // Scale pulse effect
      const scale = 1 + Math.sin(state.clock.elapsedTime * 2) * 0.05;
      textRef.current.scale.set(scale, scale, scale);

      // Click effect
      if (clicked) {
        const clickScale = 1.2 - (state.clock.elapsedTime % 1) * 0.2;
        textRef.current.scale.multiplyScalar(clickScale);
      }
    }
  });

  return (
    <Text
      ref={textRef}
      fontSize={3.5}
      color={hovered ? "#2E6F40" : "#00674F"}
      anchorX="center"
      anchorY="middle"
      onPointerEnter={() => setHovered(true)}
      onPointerLeave={() => setHovered(false)}
      onClick={() => {
        setClicked(true);
        setTimeout(() => setClicked(false), 1000);
      }}
      letterSpacing={0.15}
      maxWidth={10}
    >
      JATHUR
      <meshStandardMaterial
        color={hovered ? "#2E6F40" : "#00674F"}
        emissive={hovered ? "#214C00" : "#355749"}
        emissiveIntensity={hovered ? 1.2 : 0.8}
        metalness={0.9}
        roughness={0.1}
        envMapIntensity={1.5}
      />
    </Text>
  );
}

// Bold, Interactive floating orbs
function FloatingOrb({
  position,
  color,
  mousePosition
}: {
  position: [number, number, number];
  color: string;
  mousePosition: { x: number; y: number };
}) {
  const meshRef = useRef<THREE.Mesh>(null);
  const [hovered, setHovered] = useState(false);

  useFrame((state) => {
    if (meshRef.current) {
      // More dramatic floating
      meshRef.current.position.y =
        position[1] + Math.sin(state.clock.elapsedTime * 2 + position[0]) * 1.2;
      meshRef.current.position.x =
        position[0] + Math.cos(state.clock.elapsedTime * 1.5) * 0.5;

      // Rotation
      meshRef.current.rotation.x = state.clock.elapsedTime * 0.8;
      meshRef.current.rotation.y = state.clock.elapsedTime * 0.5;

      // React to mouse
      meshRef.current.position.z = position[2] + mousePosition.x * 2;

      // Scale on hover
      const targetScale = hovered ? 1.5 : 1;
      meshRef.current.scale.lerp(
        new THREE.Vector3(targetScale, targetScale, targetScale),
        0.1
      );
    }
  });

  return (
    <Sphere
      ref={meshRef}
      args={[0.8, 64, 64]} // Larger and more detailed
      position={position}
      onPointerEnter={() => setHovered(true)}
      onPointerLeave={() => setHovered(false)}
    >
      <MeshDistortMaterial
        color={color}
        attach="material"
        distort={hovered ? 0.6 : 0.4}
        speed={hovered ? 4 : 2}
        roughness={0.1}
        metalness={0.9}
        emissive={color}
        emissiveIntensity={hovered ? 0.5 : 0.2}
      />
    </Sphere>
  );
}

// Main 3D Scene with mouse tracking
function Scene({ mousePosition }: { mousePosition: { x: number; y: number } }) {
  return (
    <>
      {/* Enhanced Lighting with Green tones */}
      <ambientLight intensity={0.3} />
      <pointLight position={[10, 10, 10]} intensity={2} color="#2E6F40" />
      <pointLight position={[-10, -10, -10]} intensity={1.5} color="#00674F" />
      <pointLight position={[0, 0, 10]} intensity={1} color="#355749" />
      <spotLight
        position={[0, 15, 0]}
        angle={0.5}
        penumbra={1}
        intensity={2}
        color="#ffffff"
        castShadow
      />
      <spotLight
        position={[-10, 5, 5]}
        angle={0.4}
        penumbra={1}
        intensity={1.5}
        color="#214C00"
      />

      {/* Background stars */}
      <Stars
        radius={100}
        depth={50}
        count={5000}
        factor={4}
        saturation={0}
        fade
        speed={1}
      />

      {/* Enhanced Particles */}
      <Particles mousePosition={mousePosition} />

      {/* Bold 3D Text */}
      <AnimatedText mousePosition={mousePosition} />

      {/* Interactive Floating Orbs - Green palette */}
      <FloatingOrb position={[-5, 0, -2]} color="#2E6F40" mousePosition={mousePosition} />
      <FloatingOrb position={[5, 0, -2]} color="#00674F" mousePosition={mousePosition} />
      <FloatingOrb position={[0, 4, -3]} color="#355749" mousePosition={mousePosition} />
      <FloatingOrb position={[-3, -2, 0]} color="#214C00" mousePosition={mousePosition} />
      <FloatingOrb position={[3, -2, 0]} color="#023020" mousePosition={mousePosition} />

      {/* Interactive Controls */}
      <OrbitControls
        enableZoom={false}
        enablePan={false}
        autoRotate
        autoRotateSpeed={1.5} // Faster rotation
        maxPolarAngle={Math.PI / 1.8}
        minPolarAngle={Math.PI / 2.5}
      />
    </>
  );
}

export default function IntroAnimation({ onComplete }: { onComplete: () => void }) {
  const [progress, setProgress] = useState(0);
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const [canSkip, setCanSkip] = useState(false);

  // Track mouse movement for interactive effects
  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      setMousePosition({
        x: (e.clientX / window.innerWidth) * 2 - 1,
        y: -(e.clientY / window.innerHeight) * 2 + 1,
      });
    };

    window.addEventListener("mousemove", handleMouseMove);
    return () => window.removeEventListener("mousemove", handleMouseMove);
  }, []);

  useEffect(() => {
    // Enable skip after 2 seconds
    const skipTimer = setTimeout(() => {
      setCanSkip(true);
    }, 2000);

    // Extended progress animation - 8 seconds total (increased from 3)
    const interval = setInterval(() => {
      setProgress((prev) => {
        if (prev >= 100) {
          clearInterval(interval);
          // Wait a bit before transitioning
          setTimeout(() => {
            onComplete();
          }, 800);
          return 100;
        }
        return prev + 0.5; // Slower progression (was +1)
      });
    }, 40); // Increased from 30ms

    return () => {
      clearInterval(interval);
      clearTimeout(skipTimer);
    };
  }, [onComplete]);

  const handleSkip = () => {
    if (canSkip) {
      setProgress(100);
      setTimeout(() => onComplete(), 300);
    }
  };

  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0, scale: 1.2 }}
        transition={{ duration: 0.8 }}
        className="fixed inset-0 z-50"
        style={{
          backgroundImage: "linear-gradient(to bottom right, #0a0a0a, #023020, #355749)"
        }}
      >
        {/* 3D Canvas */}
        <Canvas
          camera={{ position: [0, 0, 10], fov: 60 }}
          className="absolute inset-0"
          gl={{ antialias: true, alpha: true }}
        >
          <Scene mousePosition={mousePosition} />
        </Canvas>

        {/* Overlay content */}
        <div className="absolute inset-0 flex flex-col items-center justify-center pointer-events-none">
          {/* Title hint */}
          <motion.div
            initial={{ opacity: 0, y: -50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3, duration: 0.8 }}
            className="absolute top-20 text-center"
          >
            <p className="text-white/60 text-lg md:text-xl font-light tracking-widest">
              WELCOME TO
            </p>
          </motion.div>

          {/* Tagline */}
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5, duration: 0.8 }}
            className="mt-80 text-center"
          >
            <p className="text-white/90 text-2xl md:text-3xl font-light tracking-wider mb-2">
              Computer Engineering Undergraduate
            </p>
            <p className="text-white/60 text-sm md:text-base font-light tracking-wide">
              Building the future, one line at a time
            </p>
          </motion.div>

          {/* Loading bar */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 1, duration: 0.5 }}
            className="absolute bottom-24 w-80 max-w-[90vw]"
          >
            <div className="w-full h-2 bg-white/20 rounded-full overflow-hidden backdrop-blur-sm">
              <motion.div
                className="h-full"
                style={{
                  width: `${progress}%`,
                  backgroundImage: "linear-gradient(to right, #2E6F40, #00674F, #214C00)"
                }}
                transition={{ duration: 0.1 }}
              />
            </div>
            <div className="flex justify-between mt-3">
              <p className="text-white/60 text-sm font-light">
                Loading Experience... {Math.round(progress)}%
              </p>
              {canSkip && (
                <motion.button
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  onClick={handleSkip}
                  className="text-white/80 text-sm font-light hover:text-white transition-colors pointer-events-auto underline"
                >
                  Skip →
                </motion.button>
              )}
            </div>
          </motion.div>

          {/* Interactive hints */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: [0, 0.7, 0] }}
            transition={{ delay: 1.5, duration: 3, repeat: Infinity }}
            className="absolute bottom-10 text-center space-y-2"
          >
            <p className="text-white/50 text-sm">
              Click the text • Hover the orbs • Drag to rotate
            </p>
          </motion.div>
        </div>

        {/* Animated gradient overlay */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent pointer-events-none" />

        {/* Vignette effect */}
        <div className="absolute inset-0 shadow-[inset_0_0_100px_rgba(0,0,0,0.5)] pointer-events-none" />
      </motion.div>
    </AnimatePresence>
  );
}
