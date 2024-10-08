"use client"

import React, { useRef, useMemo, useCallback, useState, useEffect } from 'react'
import { Canvas, useFrame, useThree, RootState } from '@react-three/fiber'
import { MeshTransmissionMaterial, Environment, useDetectGPU } from '@react-three/drei'
import * as THREE from 'three'

interface ShardProps {
  position: [number, number, number]
  rotation: [number, number, number]
  scale: [number, number, number]
  shape: THREE.Shape
}

const shardShapes = [
  [[0, 0], [0.5, 0.2], [0.7, 0.7], [0.2, 0.5]],
  [[0, 0], [0.8, 0.1], [0.6, 0.6], [0.1, 0.4]],
  [[0, 0], [0.6, 0.3], [0.4, 0.7], [0.1, 0.5]],
  [[0, 0], [0.7, 0.2], [0.5, 0.8], [0.1, 0.6]],
  [[0, 0], [0.9, 0.1], [0.7, 0.5], [0.3, 0.7], [0.1, 0.3]],
]

const shape = new THREE.Shape()
const createRandomShape = (() => {
  return (isMobile: boolean) => {
    const shardPoints = shardShapes[Math.floor(Math.random() * shardShapes.length)]
    const scale = isMobile ? 2 + Math.random() * 4 : 2 + Math.random() * 5.5
    shape.curves = []
    shardPoints.forEach((point, index) => {
      const [x, y] = point
      const scaledX = x * scale
      const scaledY = y * scale
      if (index === 0) {
        shape.moveTo(scaledX, scaledY)
      } else {
        shape.lineTo(scaledX, scaledY)
      }
    })
    shape.closePath()
    return shape
  }
})()

const extrudeSettings = {
  steps: 1,
  depth: 0.15,
  bevelEnabled: false,
}

function Shard({ position, rotation, scale, shape }: ShardProps) {
  const mesh = useRef<THREE.Mesh>(null)
  const fallSpeed = useRef(0.005 + Math.random() * 0.01)
  const rotationSpeed = useRef({
    x: (Math.random() - 0.5) * 0.01,
    y: (Math.random() - 0.5) * 0.01,
    z: (Math.random() - 0.5) * 0.01,
  })

  const [resolution, setResolution] = useState(360)
  const fpsHistory = useRef<number[]>([])

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

    // Calculate FPS and update resolution less frequently
    const fps = 1 / delta
    fpsHistory.current.push(fps)
    if (fpsHistory.current.length > 10) {
      fpsHistory.current.shift()
      const avgFps = fpsHistory.current.reduce((sum, fps) => sum + fps, 0) / fpsHistory.current.length
      if (avgFps > 50) {
        setResolution(360)
      } else if (avgFps > 30) {
        setResolution(180)
      } else {
        setResolution(90)
      }
    }
  })

  const geometry = useMemo(() => new THREE.ExtrudeGeometry(shape, extrudeSettings), [shape])

  return (
    <mesh ref={mesh} position={position} rotation={rotation} scale={scale} geometry={geometry}>
      <MeshTransmissionMaterial
        backside
        backsideThickness={0.2}
        thickness={0.1}
        chromaticAberration={0.05}
        transmission={0.95}
        ior={1.5}
        distortion={0.1}
        distortionScale={0.1}
        temporalDistortion={0.02}
        attenuationDistance={2}
        attenuationColor="#ffffff"
        color="#9333ea"
        reflectivity={0.9}
        roughness={0.2}
        clearcoat={0.1}
        clearcoatRoughness={0.1}
        resolution={resolution}
      />
    </mesh>
  )
}

interface ShardsProps {
  count: number
  isMobile: boolean
}

const Shards = React.memo(({ count, isMobile }: ShardsProps) => {
  const shards = useMemo(() => {
    return Array.from({ length: count }, () => {
      const size = isMobile ? Math.random() * 0.7 + 1.2 : Math.random() * 1 + 1.5
      return {
        position: [
          (Math.random() - 0.5) * (isMobile ? 18 : 30),
          Math.random() * (isMobile ? 18 : 30),
          (Math.random() - 0.5) * (isMobile ? 12 : 25)
        ] as [number, number, number],
        rotation: [Math.random() * Math.PI, Math.random() * Math.PI, Math.random() * Math.PI] as [number, number, number],
        scale: [size, size, size] as [number, number, number],
        shape: createRandomShape(isMobile),
      }
    })
  }, [count, isMobile])

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
  <ambientLight intensity={0.2} />
))
Lighting.displayName = 'Lighting'

function CameraAdjuster({ isMobile }: { isMobile: boolean }) {
  const { camera } = useThree()

  useEffect(() => {
    if (camera instanceof THREE.PerspectiveCamera) {
      if (isMobile) {
        camera.position.set(0, 0, 16)
        camera.fov = 70
      } else {
        camera.position.set(0, 0, 20)
        camera.fov = 50
      }
      camera.updateProjectionMatrix()
    }
  }, [camera, isMobile])

  return null
}

export default function GlassShards() {
  const [shardCount, setShardCount] = useState(7)
  const [isMobile, setIsMobile] = useState(false)
  const gpu = useDetectGPU()

  useEffect(() => {
    const checkMobile = () => {
      const mobile = /iPhone|iPad|iPod|Android/i.test(navigator.userAgent) || window.innerWidth < 768
      setIsMobile(mobile)
      
      const isLowEnd = gpu.tier < 2
      if (mobile) {
        setShardCount(isLowEnd ? 5 : 6)
      } else {
        setShardCount(isLowEnd ? 5 : 7)
      }
    }

    checkMobile()
    window.addEventListener('resize', checkMobile)
    return () => window.removeEventListener('resize', checkMobile)
  }, [gpu])

  return (
    <div className="w-full h-screen">
      <Canvas>
        <CameraAdjuster isMobile={isMobile} />
        <Lighting />
        <Shards count={shardCount} isMobile={isMobile} />
        <Environment preset="sunset" blur={0.2} backgroundBlurriness={1} />
      </Canvas>
    </div>
  )
}