"use client"

import React, { useRef, useMemo, useState, useEffect, useTransition } from 'react'
import { Canvas, useFrame, useThree } from '@react-three/fiber'
import { MeshTransmissionMaterial, Environment, useDetectGPU, Text } from '@react-three/drei'
import * as THREE from 'three'

interface ShardProps {
  position: [number, number, number]
  rotation: [number, number, number]
  scale: [number, number, number]
  shape: THREE.Shape
  isLowEnd: boolean
}

const shardShapes = [
  [[0, 0], [0.5, 0.2], [0.7, 0.7], [0.2, 0.5]],
  [[0, 0], [0.8, 0.1], [0.6, 0.6], [0.1, 0.4]],
  [[0, 0], [0.6, 0.3], [0.4, 0.7], [0.1, 0.5]],
  [[0, 0], [0.7, 0.2], [0.5, 0.8], [0.1, 0.6]],
  [[0, 0], [0.9, 0.1], [0.7, 0.5], [0.3, 0.7], [0.1, 0.3]],
]

const createRandomShape = (isLowEnd: boolean) => {
  const shardPoints = shardShapes[Math.floor(Math.random() * shardShapes.length)]
  const scale = isLowEnd ? 2 + Math.random() * 3 : 2 + Math.random() * 5.5
  const shape = new THREE.Shape()
  
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

const extrudeSettings = {
  steps: 1,
  depth: 0.15,
  bevelEnabled: false,
}

function Shard({ position, rotation, scale, shape, isLowEnd }: ShardProps) {
  const mesh = useRef<THREE.Mesh>(null)
  const fallSpeed = useRef(0.005 + Math.random() * 0.01)
  const rotationSpeed = useRef({
    x: (Math.random() - 0.5) * 0.01,
    y: (Math.random() - 0.5) * 0.01,
    z: (Math.random() - 0.5) * 0.01,
  })

  const [resolution, setResolution] = useState(isLowEnd ? 90 : 360)
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

    if (!isLowEnd) {
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
    }
  })

  const geometry = useMemo(() => new THREE.ExtrudeGeometry(shape, extrudeSettings), [shape])

  return (
    <mesh ref={mesh} position={position} rotation={rotation} scale={scale} geometry={geometry}>
      <MeshTransmissionMaterial
        backside
        backsideThickness={0.2}
        thickness={0.1}
        chromaticAberration={isLowEnd ? 0 : 0.05}
        transmission={0.95}
        ior={1.5}
        distortion={isLowEnd ? 0.05 : 0.1}
        distortionScale={isLowEnd ? 0.05 : 0.1}
        temporalDistortion={isLowEnd ? 0 : 0.02}
        attenuationDistance={2}
        attenuationColor="#ffffff"
        color="#9333ea"
        reflectivity={isLowEnd ? 0.7 : 0.9}
        roughness={0.2}
        clearcoat={isLowEnd ? 0 : 0.1}
        clearcoatRoughness={0.1}
        resolution={resolution}
      />
    </mesh>
  )
}

interface ShardsProps {
  count: number
  isLowEnd: boolean
}

const Shards = React.memo(({ count, isLowEnd }: ShardsProps) => {
  const [shards, setShards] = useState<ShardProps[]>([])
  const [isPending, startTransition] = useTransition()

  useEffect(() => {
    startTransition(() => {
      const newShards = Array.from({ length: count }, () => {
        const size = isLowEnd ? Math.random() * 0.5 + 1 : Math.random() * 1 + 1.5
        return {
          position: [
            (Math.random() - 0.5) * (isLowEnd ? 15 : 30),
            Math.random() * (isLowEnd ? 15 : 30),
            (Math.random() - 0.5) * (isLowEnd ? 10 : 25)
          ] as [number, number, number],
          rotation: [Math.random() * Math.PI, Math.random() * Math.PI, Math.random() * Math.PI] as [number, number, number],
          scale: [size, size, size] as [number, number, number],
          shape: createRandomShape(isLowEnd),
          isLowEnd: isLowEnd
        }
      })
      setShards(newShards)
    })
  }, [count, isLowEnd])

  if (isPending) {
    return <Text color="white" anchorX="center" anchorY="middle" position={[0, 0, 0]}>Loading shards...</Text>
  }

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

function CameraAdjuster({ isLowEnd }: { isLowEnd: boolean }) {
  const { camera } = useThree()

  useEffect(() => {
    if (camera instanceof THREE.PerspectiveCamera) {
      if (isLowEnd) {
        camera.position.set(0, 0, 15)
        camera.fov = 75
      } else {
        camera.position.set(0, 0, 20)
        camera.fov = 50
      }
      camera.updateProjectionMatrix()
    }
  }, [camera, isLowEnd])

  return null
}

export default function GlassShards() {
  const [shardCount, setShardCount] = useState(7)
  const [isLowEnd, setIsLowEnd] = useState(false)
  const gpu = useDetectGPU()

  useEffect(() => {
    const checkDevice = () => {
      const isMobile = /iPhone|iPad|iPod|Android/i.test(navigator.userAgent)
      const isLowEndDevice = gpu.tier < 2 || (isMobile && gpu.tier < 3)
      setIsLowEnd(isLowEndDevice)
      
      if (isLowEndDevice) {
        setShardCount(4)
      } else if (isMobile || gpu.tier === 2) {
        setShardCount(5)
      } else {
        setShardCount(7)
      }
    }

    checkDevice()
    window.addEventListener('resize', checkDevice)
    return () => window.removeEventListener('resize', checkDevice)
  }, [gpu])

  return (
    <div className="w-full h-screen">
      <Canvas dpr={isLowEnd ? 1 : [1, 2]}>
        <CameraAdjuster isLowEnd={isLowEnd} />
        <Lighting />
        <Shards count={shardCount} isLowEnd={isLowEnd} />
        <Environment preset="sunset" blur={isLowEnd ? 0.1 : 0.2} backgroundBlurriness={isLowEnd ? 0.5 : 1} />
      </Canvas>
    </div>
  )
}