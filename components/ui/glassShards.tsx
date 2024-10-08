import React, { useRef, useMemo, useCallback, useState } from 'react'
import { Canvas, useFrame, RootState } from '@react-three/fiber'
import { MeshTransmissionMaterial, Environment } from '@react-three/drei'
import * as THREE from 'three'

interface ShardProps {
  position: [number, number, number]
  rotation: [number, number, number]
  scale: [number, number, number]
  shape: THREE.Shape
}

const shardShapes = [ [ [0, 0], [0.5, 0.2], 
[0.7, 0.7], [0.2, 0.5], ], [ [0, 0], [0.8, 0.1], 
[0.6, 0.6], [0.1, 0.4], ], [ [0, 0], [0.6, 0.3], 
[0.4, 0.7], [0.1, 0.5], ], [ [0, 0], [0.7, 0.2], 
[0.5, 0.8], [0.1, 0.6], ], [ [0, 0], [0.9, 0.1], 
[0.7, 0.5], [0.3, 0.7], [0.1, 0.3], ], ]

const shape = new THREE.Shape()
const createRandomShape = (() => {
  return () => {
    const shardPoints = shardShapes[Math.floor(Math.random() * shardShapes.length)]
    const scale = 2 + Math.random() * 5.5
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

  // State to hold the current resolution
  const [resolution, setResolution] = useState(360)

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

    // Calculate FPS
    const fps = 1 / delta

    // Adjust resolution based on FPS
    if (fps > 50) {
      setResolution(360)
    } else if (fps > 30) {
      setResolution(180)
    } else {
      setResolution(90)
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
        resolution={resolution} // dynamic resolution here
      />
    </mesh>
  )
}

const Shards = React.memo(() => {
  const shards = useMemo(() => {
    return Array.from({ length: 7 }, () => {
      const size = Math.random() * 1 + 1.5
      return {
        position: [
          (Math.random() - 0.5) * 30,
          Math.random() * 30,
          (Math.random() - 0.5) * 25
        ] as [number, number, number],
        rotation: [Math.random() * Math.PI, Math.random() * Math.PI, Math.random() * Math.PI] as [number, number, number],
        scale: [size, size, size] as [number, number, number],
        shape: createRandomShape(),
      }
    })
  }, [])
  Shards.displayName = 'Shards'

  return (
    <>
      {shards.map((props, i) => (
        <Shard key={i} {...props} />
      ))}
    </>
  )
})

const Lighting = React.memo(() => (
  <ambientLight intensity={0.2} />
))
Lighting.displayName = 'Lighting'

const cameraSettings = {
  position: [0, 0, 20] as [number, number, number],
  fov: 50,
}

export default function GlassShards() {
  const updateCamera = useCallback((state: RootState) => {
    if (state.camera instanceof THREE.PerspectiveCamera) {
      state.camera.position.set(cameraSettings.position[0], cameraSettings.position[1], cameraSettings.position[2])
      state.camera.fov = cameraSettings.fov
      state.camera.updateProjectionMatrix()
    }
  }, [])

  return (
    <div className="w-full h-screen">
      <Canvas onCreated={updateCamera}>
        <Lighting />
        <Shards />
        <Environment preset="sunset" blur={0.2} backgroundBlurriness={1} />
      </Canvas>
    </div>
  )
}