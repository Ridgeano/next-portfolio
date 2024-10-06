"use client"

import React, { useRef, useMemo, useCallback } from 'react'
import { Canvas, useFrame, useThree } from '@react-three/fiber'
import { InstancedMesh, MeshPhysicalMaterial, SphereGeometry, Vector3, Matrix4, Color, Frustum, Matrix4 as ThreeMatrix4 } from 'three'
import { Environment, PerspectiveCamera } from '@react-three/drei'

const PARTICLE_COUNT = 50
const BOUNDS = { x: 35, y: 25, z: 5 }
const GRAVITY = 0.0002
const RESISTANCE = 0.995
const MIN_PARTICLE_SIZE = 0.02
const MAX_PARTICLE_SIZE = 0.8

const Particles = () => {
  const meshRef = useRef<InstancedMesh>(null)
  const colorArray = useMemo(() => new Float32Array(PARTICLE_COUNT * 3), [])
  const sizeArray = useMemo(() => new Float32Array(PARTICLE_COUNT), [])
  const { camera } = useThree()

  const resetParticle = useCallback((index: number, positions: Float32Array, velocities: Float32Array) => {
    const side = Math.floor(Math.random() * 4) // 0: top, 1: right, 2: bottom, 3: left
    switch(side) {
      case 0: // top
        positions[index * 3] = (Math.random() - 0.5) * BOUNDS.x
        positions[index * 3 + 1] = BOUNDS.y / 2
        velocities[index * 3] = (Math.random() - 0.5) * 0.03
        velocities[index * 3 + 1] = -Math.random() * 0.03
        break
      case 1: // right
        positions[index * 3] = BOUNDS.x / 2
        positions[index * 3 + 1] = (Math.random() - 0.5) * BOUNDS.y
        velocities[index * 3] = -Math.random() * 0.03
        velocities[index * 3 + 1] = (Math.random() - 0.5) * 0.03
        break
      case 2: // bottom
        positions[index * 3] = (Math.random() - 0.5) * BOUNDS.x
        positions[index * 3 + 1] = -BOUNDS.y / 2
        velocities[index * 3] = (Math.random() - 0.5) * 0.03
        velocities[index * 3 + 1] = Math.random() * 0.03
        break
      case 3: // left
        positions[index * 3] = -BOUNDS.x / 2
        positions[index * 3 + 1] = (Math.random() - 0.5) * BOUNDS.y
        velocities[index * 3] = Math.random() * 0.03
        velocities[index * 3 + 1] = (Math.random() - 0.5) * 0.03
        break
    }
    positions[index * 3 + 2] = (Math.random() - 0.5) * BOUNDS.z
    velocities[index * 3 + 2] = (Math.random() - 0.5) * 0.002
    sizeArray[index] = Math.random() * (MAX_PARTICLE_SIZE - MIN_PARTICLE_SIZE) + MIN_PARTICLE_SIZE
  }, [sizeArray])

  const [positions, velocities] = useMemo(() => {
    const positions = new Float32Array(PARTICLE_COUNT * 3)
    const velocities = new Float32Array(PARTICLE_COUNT * 3)
    const stainedGlassColors = [
      '#ff2d55', // Pink
      '#5856d6', // Purple
      '#ff9500', // Orange
      '#ffcc00', // Yellow
      '#ff3b30', // Red
      '#5ac8fa', // Teal
      '#007aff', // Blue
      '#4cd964', // Green 
    ]
    for (let i = 0; i < PARTICLE_COUNT; i++) {
      resetParticle(i, positions, velocities)
      const color = new Color(stainedGlassColors[Math.floor(Math.random() * stainedGlassColors.length)])
      color.toArray(colorArray, i * 3)
    }
    return [positions, velocities]
  }, [resetParticle, colorArray])

  const frustum = useMemo(() => new Frustum(), [])
  const projScreenMatrix = useMemo(() => new ThreeMatrix4(), [])

  useFrame(() => {
    if (!meshRef.current) return
    const tempVector = new Vector3()
    const tempMatrix = new Matrix4()
    const tempScale = new Vector3()

    projScreenMatrix.multiplyMatrices(camera.projectionMatrix, camera.matrixWorldInverse)
    frustum.setFromProjectionMatrix(projScreenMatrix)

    for (let i = 0; i < PARTICLE_COUNT; i++) {
      tempVector.set(positions[i * 3], positions[i * 3 + 1], positions[i * 3 + 2])
      
      // Apply gravity and resistance
      velocities[i * 3 + 1] -= GRAVITY
      velocities[i * 3] *= RESISTANCE
      velocities[i * 3 + 1] *= RESISTANCE
      velocities[i * 3 + 2] *= RESISTANCE
      
      // Update position
      tempVector.x += velocities[i * 3]
      tempVector.y += velocities[i * 3 + 1]
      tempVector.z += velocities[i * 3 + 2]
      
      // Check if particle is out of camera frustum
      if (!frustum.containsPoint(tempVector)) {
        resetParticle(i, positions, velocities)
      } else {
        positions[i * 3] = tempVector.x
        positions[i * 3 + 1] = tempVector.y
        positions[i * 3 + 2] = tempVector.z
      }
      
      tempScale.setScalar(sizeArray[i])
      tempMatrix.compose(tempVector, meshRef.current.quaternion, tempScale)
      meshRef.current.setMatrixAt(i, tempMatrix)
    }
    meshRef.current.instanceMatrix.needsUpdate = true
  })

  return (
    <instancedMesh ref={meshRef} args={[undefined, undefined, PARTICLE_COUNT]}>
      <sphereGeometry args={[1, 32, 32]} />
      <meshPhysicalMaterial
        vertexColors
        transmission={0.6}
        thickness={0.5}
        roughness={0.2}
        envMapIntensity={1.5}
        clearcoat={0.1}
        clearcoatRoughness={0.1}
        ior={1.5}
        transparent
        opacity={0.8}
        metalness={0.1}
        toneMapped={false}
      />
      <instancedBufferAttribute
        attach="geometry-attributes-color"
        args={[colorArray, 3]}
      />
    </instancedMesh>
  )
}

export default function StainedGlassParticles() {
  return (
    <div className="w-full h-full absolute top-0 left-0">
      <Canvas>
        <PerspectiveCamera makeDefault position={[0, 0, 30]} fov={45} />
        <ambientLight intensity={0.5} />
        <pointLight position={[10, 10, 10]} intensity={1} />
        <Particles />
        <Environment preset="sunset" background={false} />
      </Canvas>
    </div>
  )
}