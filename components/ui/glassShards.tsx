"use client"

import React, { useRef, useMemo } from 'react'
import { Canvas, useFrame } from '@react-three/fiber'
import { OrbitControls } from '@react-three/drei'
import * as THREE from 'three'

// Custom shader for glass-like material
const glassShaderMaterial = {
  uniforms: {
    time: { value: 0 },
  },
  vertexShader: `
    varying vec3 vNormal;
    varying vec3 vViewPosition;
    
    void main() {
      vNormal = normalize(normalMatrix * normal);
      vec4 mvPosition = modelViewMatrix * vec4(position, 1.0);
      vViewPosition = -mvPosition.xyz;
      gl_Position = projectionMatrix * mvPosition;
    }
  `,
  fragmentShader: `
    uniform float time;
    varying vec3 vNormal;
    varying vec3 vViewPosition;
    
    void main() {
      vec3 normal = normalize(vNormal);
      vec3 viewDir = normalize(vViewPosition);
      float fresnel = pow(1.0 + dot(viewDir, normal), 3.0);
      vec3 color = vec3(0.8, 0.9, 1.0);
      gl_FragColor = vec4(color * fresnel, 0.5);
    }
  `,
}

interface ShardProps {
  position: [number, number, number]
  rotation: [number, number, number]
  scale: [number, number, number]
}

function Shard({ position, rotation, scale }: ShardProps) {
  const mesh = useRef<THREE.Mesh>(null)
  const material = useRef<THREE.ShaderMaterial>(null)
  const fallSpeed = useRef(0.005 + Math.random() * 0.01) // Varying fall speed

  useFrame((state) => {
    if (mesh.current) {
      mesh.current.position.y -= fallSpeed.current
      if (mesh.current.position.y < -10) {
        mesh.current.position.y = 10
      }
      mesh.current.rotation.x += 0.005
      mesh.current.rotation.y += 0.005
    }
    if (material.current) {
      material.current.uniforms.time.value = state.clock.getElapsedTime()
    }
  })

  return (
    <mesh ref={mesh} position={position} rotation={rotation} scale={scale}>
      <boxGeometry args={[1, 1, 0.05]} /> {/* Thinner depth for more shard-like appearance */}
      <shaderMaterial ref={material} attach="material" args={[glassShaderMaterial]} transparent />
    </mesh>
  )
}

function Shards() {
  const shards = useMemo(() => {
    return Array.from({ length: 10 }, (_, i) => {
      const size = Math.random() * 1.5 + 0.5 // Sizes between 0.5 and 2
      return {
        position: [
          (Math.random() - 0.5) * 35, // Spread more horizontally
          Math.random() * 20,     // Start higher up
          (Math.random() - 0.5) * 30  // Spread more in depth
        ] as [number, number, number],
        rotation: [Math.random() * Math.PI, Math.random() * Math.PI, Math.random() * Math.PI] as [number, number, number],
        scale: [size, size, size] as [number, number, number], // Uniform scaling for each shard
      }
    })
  }, [])

  return (
    <>
      {shards.map((props, i) => (
        <Shard key={i} {...props} />
      ))}
    </>
  )
}

export default function GlassShards() {
  return (
    <div className="w-full h-screen">
      <Canvas camera={{ position: [0, 0, 15], fov: 60 }}>
        <ambientLight intensity={0.5} />
        <pointLight position={[10, 10, 10]} />
        <Shards />
        <OrbitControls enableZoom={false} />
      </Canvas>
    </div>
  )
}