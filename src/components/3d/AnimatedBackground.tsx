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
      // Rotate the disco ball
      meshRef.current.rotation.y += 0.01;
      meshRef.current.rotation.x = Math.sin(state.clock.elapsedTime * 0.3) * 0.05;
      
      // Add some floating motion
      meshRef.current.position.y = Math.sin(state.clock.elapsedTime * 0.6) * 0.1;
    }
  });

  useEffect(() => {
    if (gltf.scene) {
      // Scale the model larger for better visibility
      gltf.scene.scale.setScalar(2.5);
      
      // Add stunning disco ball material
      gltf.scene.traverse((child) => {
        if (child instanceof THREE.Mesh) {
          child.material = new THREE.MeshStandardMaterial({
            color: 0xffffff,
            metalness: 0.95,
            roughness: 0.05,
            envMapIntensity: 3.0,
            emissive: 0x666666,
            emissiveIntensity: 0.3,
          });
        }
      });
    }
  }, [gltf]);

  return (
    <primitive 
      ref={meshRef}
      object={gltf.scene} 
      position={[-4, 3, 0]} // Position in top left corner
    />
  );
}

// Animated disco lights component
function DiscoLights() {
  const lightsRef = useRef<THREE.Group>(null);

  useFrame((state) => {
    if (lightsRef.current) {
      // Animate the lights around the disco ball
      lightsRef.current.children.forEach((light, index) => {
        const time = state.clock.elapsedTime;
        const angle = (time * 0.5 + index * Math.PI * 2 / 8) % (Math.PI * 2);
        const radius = 3 + Math.sin(time * 2 + index) * 0.5;
        
        light.position.x = -4 + Math.cos(angle) * radius;
        light.position.y = 3 + Math.sin(angle) * radius * 0.5;
        light.position.z = Math.sin(time * 3 + index) * 2;
      });
    }
  });

  return (
    <group ref={lightsRef}>
      {Array.from({ length: 8 }, (_, i) => (
        <pointLight
          key={i}
          position={[0, 0, 0]}
          intensity={2}
          color={['#ff6b6b', '#4ecdc4', '#ffd93d', '#ff8e8e', '#8e8eff', '#ff69b4', '#00ff88', '#ffa500'][i]}
          distance={6}
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
        
        {/* Stunning disco lighting effects */}
        <directionalLight 
          position={[15, 15, 10]} 
          intensity={2} 
          color="#ff6b6b"
        />
        <directionalLight 
          position={[-15, 15, 10]} 
          intensity={1.5} 
          color="#4ecdc4"
        />
        <directionalLight 
          position={[0, -15, 10]} 
          intensity={1.8} 
          color="#ffd93d"
        />
        <directionalLight 
          position={[10, 0, 15]} 
          intensity={1.2} 
          color="#ff8e8e"
        />
        <directionalLight 
          position={[-10, 0, 15]} 
          intensity={1.2} 
          color="#8e8eff"
        />
        
        {/* Point lights for disco effect */}
        <pointLight 
          position={[-3, 2, 2]} 
          intensity={3} 
          color="#ffffff"
          distance={10}
        />
        <pointLight 
          position={[-2, 3, 1]} 
          intensity={2} 
          color="#ff6b6b"
          distance={8}
        />
        <pointLight 
          position={[-4, 1, 3]} 
          intensity={2} 
          color="#4ecdc4"
          distance={8}
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
        <mesh position={[-4, 3, -2]} rotation={[0, 0, 0]}>
          <sphereGeometry args={[0.1, 16, 16]} />
          <meshStandardMaterial 
            color="#ffffff" 
            emissive="#ffffff"
            emissiveIntensity={0.5}
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
