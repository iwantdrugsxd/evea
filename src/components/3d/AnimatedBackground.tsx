'use client';

import { useRef, useEffect } from 'react';
import { Canvas, useFrame, useLoader } from '@react-three/fiber';
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader';
import { OrbitControls, Environment, Stars } from '@react-three/drei';
import * as THREE from 'three';

interface DiscoBallProps {
  modelPath: string;
}

function DiscoBall({ modelPath }: DiscoBallProps) {
  const gltf = useLoader(GLTFLoader, modelPath);
  const meshRef = useRef<THREE.Group>(null);

  useFrame((state) => {
    if (meshRef.current) {
      // Only rotate the disco ball - no position changes
      meshRef.current.rotation.y += 0.02; // Smooth rotation
      meshRef.current.rotation.x = Math.sin(state.clock.elapsedTime * 0.2) * 0.02; // Subtle tilt
    }
  });

  useEffect(() => {
    if (gltf.scene) {
      // Fixed scale - no size changes
      gltf.scene.scale.setScalar(3.0);
      
      // Original white disco ball material with subtle illumination
      gltf.scene.traverse((child) => {
        if (child instanceof THREE.Mesh) {
          child.material = new THREE.MeshStandardMaterial({
            color: 0xffffff, // White color
            metalness: 0.95,
            roughness: 0.05,
            envMapIntensity: 2.0,
            emissive: 0x333333, // Subtle white emissive
            emissiveIntensity: 0.2,
          });
        }
      });
    }
  }, [gltf]);

  return (
    <primitive 
      ref={meshRef}
      object={gltf.scene} 
      position={[0, 2, 0]} // Fixed position in center
    />
  );
}

// Enhanced disco lights component with blue theme
function DiscoLights() {
  const lightsRef = useRef<THREE.Group>(null);

  useFrame((state) => {
    if (lightsRef.current) {
      // Animate the lights around the disco ball in a fixed pattern
      lightsRef.current.children.forEach((light, index) => {
        const time = state.clock.elapsedTime;
        const angle = (time * 0.3 + index * Math.PI * 2 / 12) % (Math.PI * 2);
        const radius = 4; // Fixed radius
        
        light.position.x = Math.cos(angle) * radius;
        light.position.y = 2 + Math.sin(angle) * radius * 0.3;
        light.position.z = Math.sin(time * 2 + index) * 1.5;
      });
    }
  });

  return (
    <group ref={lightsRef}>
      {Array.from({ length: 12 }, (_, i) => (
        <pointLight
          key={i}
          position={[0, 0, 0]}
          intensity={3}
          color={['#3b82f6', '#1d4ed8', '#2563eb', '#1e40af', '#60a5fa', '#93c5fd', '#3b82f6', '#1d4ed8', '#2563eb', '#1e40af', '#60a5fa', '#93c5fd'][i]}
          distance={8}
        />
      ))}
    </group>
  );
}

interface AnimatedBackgroundProps {
  className?: string;
}

export default function AnimatedBackground({ className = "" }: AnimatedBackgroundProps) {
  return (
    <div className={`absolute inset-0 ${className}`}>
      <Canvas
        camera={{ position: [0, 0, 8], fov: 60 }}
        style={{ background: '#000000' }}
      >
        {/* Ambient lighting */}
        <ambientLight intensity={0.2} />
        
        {/* Blue disco lighting effects */}
        <directionalLight 
          position={[15, 15, 10]} 
          intensity={2} 
          color="#3b82f6"
        />
        <directionalLight 
          position={[-15, 15, 10]} 
          intensity={1.5} 
          color="#1d4ed8"
        />
        <directionalLight 
          position={[0, -15, 10]} 
          intensity={1.8} 
          color="#2563eb"
        />
        <directionalLight 
          position={[10, 0, 15]} 
          intensity={1.2} 
          color="#1e40af"
        />
        <directionalLight 
          position={[-10, 0, 15]} 
          intensity={1.2} 
          color="#60a5fa"
        />
        
        {/* Point lights for disco effect */}
        <pointLight 
          position={[0, 2, 2]} 
          intensity={4} 
          color="#3b82f6"
          distance={12}
        />
        <pointLight 
          position={[2, 2, 1]} 
          intensity={3} 
          color="#1d4ed8"
          distance={10}
        />
        <pointLight 
          position={[-2, 2, 3]} 
          intensity={3} 
          color="#2563eb"
          distance={10}
        />
        
        {/* Stars background */}
        <Stars 
          radius={100} 
          depth={50} 
          count={3000} 
          factor={4} 
          saturation={0} 
          fade 
          speed={0.5}
        />
        
        {/* Disco ball */}
        <DiscoBall modelPath="/images/hero/pretty_simple_discoball_gltf/scene.gltf" />
        
        {/* Animated disco lights */}
        <DiscoLights />
        
        {/* Environment for reflections */}
        <Environment preset="night" />
        
        {/* Disco ball reflections */}
        <mesh position={[0, 2, -2]} rotation={[0, 0, 0]}>
          <sphereGeometry args={[0.1, 16, 16]} />
          <meshStandardMaterial 
            color="#ffffff" 
            emissive="#ffffff"
            emissiveIntensity={0.3}
            transparent
            opacity={0.8}
          />
        </mesh>
        
        {/* Subtle camera controls */}
        <OrbitControls 
          enableZoom={false}
          enablePan={false}
          autoRotate
          autoRotateSpeed={0.3}
          maxPolarAngle={Math.PI / 2}
          minPolarAngle={Math.PI / 2}
        />
      </Canvas>
      
      {/* Minimal overlay for text readability */}
      <div className="absolute inset-0 bg-gradient-to-br from-black/20 via-transparent to-black/30 pointer-events-none" />
    </div>
  );
}
