"use client"

import React, { useRef, useMemo, useCallback, useState, useEffect } from 'react'
import { Canvas, useFrame, RootState } from '@react-three/fiber'
import { Environment, useDetectGPU } from '@react-three/drei'
import * as THREE from 'three'

// Custom shader material
const glassShaderMaterial = {
  uniforms: {
    uTime: { value: 0 },
    uColorA: { value: new THREE.Color('#4a0e4e') },
    uColorB: { value: new THREE.Color('#3700b3') },
  },
  vertexShader: `
    varying vec2 vUv;
    varying vec3 vNormal;
    void main() {
      vUv = uv;
      vNormal = normalize(normalMatrix * normal);
      gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
    }
  `,
  fragmentShader: `
    uniform float uTime;
    uniform vec3 uColorA;
    uniform vec3 uColorB;
    varying vec2 vUv;
    varying vec3 vNormal;

    void main() {
      vec3 gradientColor = mix(uColorA, uColorB, smoothstep(0.0, 1.0, vUv.x + sin(vUv.y * 5.0 + uTime * 0.5) * 0.1));
      
      vec3 lightDir = normalize(vec3(0.5, 1.0, 0.5));
      float diffuse = max(0.5, dot(vNormal, lightDir));
      
      vec3 finalColor = gradientColor * diffuse;
      
      gl_FragColor = vec4(finalColor, 0.9);
    }
  `,
}

const shardShapes = [
  [[0, 0], [0.5, 0.2], [0.7, 0.7], [0.2, 0.5]],
  [[0, 0], [0.8, 0.1], [0.6, 0.6], [0.1, 0.4]],
  [[0, 0], [0.6, 0.3], [0.4, 0.7], [0.1, 0.5]],
  [[0, 0], [0.7, 0.2], [0.5, 0.8], [0.1, 0.6]],
  [[0, 0], [0.9, 0.1], [0.7, 0.5], [0.3, 0.7], [0.1, 0.3]],
]

const createRandomShape = () => {
  const shape = new THREE.Shape()
  const shardPoints = shardShapes[Math.floor(Math.random() * shardShapes.length)]
  shardPoints.forEach((point, index) => {
    const [x, y] = point
    if (index === 0) {
      shape.moveTo(x, y)
    } else {
      shape.lineTo(x, y)
    }
  })
  shape.closePath()
  return shape
}

const extrudeSettings = {
  steps: 1,
  depth: 0.05,
  bevelEnabled: false,
}

interface ShardProps {
  position: [number, number, number]
  rotation: [number, number, number]
  scale: number
  shape: THREE.Shape
  colorA: THREE.Color
  colorB: THREE.Color
}

function Shard({ position, rotation, scale, shape, colorA, colorB }: ShardProps) {
  const mesh = useRef<THREE.Mesh>(null)
  const material = useRef<THREE.ShaderMaterial>(null)
  const fallSpeed = useRef(0.005 + Math.random() * 0.01)
  const rotationSpeed = useRef({
    x: (Math.random() - 0.5) * 0.01,
    y: (Math.random() - 0.5) * 0.01,
    z: (Math.random() - 0.5) * 0.01,
  })

  const geometry = useMemo(() => {
    return new THREE.ExtrudeGeometry(shape, extrudeSettings)
  }, [shape])

  useFrame((state, delta) => {
    if (mesh.current) {
      mesh.current.position.y -= fallSpeed.current
      if (mesh.current.position.y < -10) {
        mesh.current.position.y = 10
      }
      mesh.current.rotation.x += rotationSpeed.current.x
      mesh.current.rotation.y += rotationSpeed.current.y
      mesh.current.rotation.z += rotationSpeed.current.z
    }
    if (material.current) {
      material.current.uniforms.uTime.value += delta
    }
  })

  return (
    <mesh ref={mesh} position={position} rotation={rotation} scale={[scale, scale, scale]} geometry={geometry}>
      <shaderMaterial
        ref={material}
        attach="material"
        args={[{
          ...glassShaderMaterial,
          uniforms: {
            ...glassShaderMaterial.uniforms,
            uColorA: { value: colorA },
            uColorB: { value: colorB },
          },
        }]}
        transparent
      />
    </mesh>
  )
}

interface ShardsProps {
  count: number
}

const Shards = React.memo(({ count }: ShardsProps) => {
  const shards = useMemo(() => {
    const colorPairs = [
      [new THREE.Color('#4a0e4e'), new THREE.Color('#3700b3')],
      [new THREE.Color('#590d82'), new THREE.Color('#4361ee')],
      [new THREE.Color('#7b2cbf'), new THREE.Color('#3a0ca3')],
      [new THREE.Color('#9d4edd'), new THREE.Color('#4895ef')],
    ]
    return Array.from({ length: count }, () => {
      const scale = 2 + Math.random() * 3
      const [colorA, colorB] = colorPairs[Math.floor(Math.random() * colorPairs.length)]
      return {
        position: [
          (Math.random() - 0.5) * 30,
          Math.random() * 30,
          (Math.random() - 0.5) * 25
        ] as [number, number, number],
        rotation: [Math.random() * Math.PI, Math.random() * Math.PI, Math.random() * Math.PI] as [number, number, number],
        scale,
        shape: createRandomShape(),
        colorA,
        colorB,
      }
    })
  }, [count])

  return (
    <>
      {shards.map((props, i) => (
        <Shard key={i} {...props} />
      ))}
    </>
  )
})
Shards.displayName = 'Shards'

const Lighting = React.memo(() => (
  <>
    <ambientLight intensity={0.5} />
    <directionalLight position={[5, 5, 5]} intensity={0.8} />
  </>
))
Lighting.displayName = 'Lighting'

const cameraSettings = {
  position: [0, 0, 20] as [number, number, number],
  fov: 50,
}

export default function GlassShards() {
  const [shardCount, setShardCount] = useState(15)
  const gpu = useDetectGPU()

  useEffect(() => {
    const isMobile = /iPhone|iPad|iPod|Android/i.test(navigator.userAgent)
    const isLowEnd = gpu.tier < 2
    if (isMobile || isLowEnd) {
      setShardCount(7)
    }
  }, [gpu])

  const updateCamera = useCallback((state: RootState) => {
    if (state.camera instanceof THREE.PerspectiveCamera) {
      state.camera.position.set(...cameraSettings.position)
      state.camera.fov = cameraSettings.fov
      state.camera.updateProjectionMatrix()
    }
  }, [])

  return (
    <div className="w-full h-screen">
      <Canvas onCreated={updateCamera}>
        <Lighting />
        <Shards count={shardCount} />
        <Environment preset="sunset" blur={0.2} backgroundBlurriness={1} />
      </Canvas>
    </div>
  )
}