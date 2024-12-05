import React, { useRef, useEffect, useState } from 'react';
import { useFrame } from '@react-three/fiber';
import { Sphere, MeshDistortMaterial } from '@react-three/drei';
import * as THREE from 'three';

const StableCoinGlobe = () => {
  const sphereRef = useRef<THREE.Mesh>(null);

  useFrame(({ clock }) => {
    if (sphereRef.current) {
      sphereRef.current.rotation.x = clock.getElapsedTime() * 0.2;
      sphereRef.current.rotation.y = clock.getElapsedTime() * 0.3;
    }
  });

  return (
    <>
      <ambientLight intensity={0.5} />
      <pointLight position={[10, 10, 10]} intensity={1} />
      <Sphere ref={sphereRef} args={[2, 64, 64]}>
        <MeshDistortMaterial
          color="#4299e1"
          attach="material"
          distort={0.4}
          speed={2}
          roughness={0.5}
          metalness={0.8}
        />
      </Sphere>
    </>
  );
};

export default StableCoinGlobe;