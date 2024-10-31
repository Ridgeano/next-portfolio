'use client'

import { useRef, useState, useEffect, useMemo, useCallback } from 'react'
import { useFrame, useThree, ThreeEvent } from '@react-three/fiber'
import * as THREE from 'three'
import { useSpring, animated, config } from '@react-spring/three'

export default function CrystalShape() {
  const [detail, setDetail] = useState(0)
  const meshRef = useRef<THREE.Mesh>(null)
  const [isTransitioning, setIsTransitioning] = useState(false)
  const { viewport } = useThree()
  const [rotation, setRotation] = useState<[number, number, number]>([0, 0, 0])
  const [isDragging, setIsDragging] = useState(false)
  const previousMousePosition = useRef({ x: 0, y: 0 })
  const autoRotationSpeed = useRef<[number, number]>([0.001, 0.002])

  // Memoize geometry to prevent recreation on every render
  const geometry = useMemo(() => new THREE.IcosahedronGeometry(1, detail), [detail])

  // Memoize gradient texture creation
  const gradientTexture = useMemo(() => {
    const canvas = document.createElement('canvas')
    canvas.width = 1
    canvas.height = 256
    const ctx = canvas.getContext('2d')
    if (!ctx) return new THREE.Texture()

    const gradient = ctx.createLinearGradient(0, 0, 0, 256)
    gradient.addColorStop(0, '#2563eb')
    gradient.addColorStop(0.5, '#7c3aed')
    gradient.addColorStop(1, '#c026d3')
    ctx.fillStyle = gradient
    ctx.fillRect(0, 0, 1, 256)

    const texture = new THREE.CanvasTexture(canvas)
    texture.needsUpdate = true
    return texture
  }, [])

  // Memoize shader material to prevent recreation
  const shaderMaterial = useMemo(() => {
    return new THREE.ShaderMaterial({
      uniforms: {
        gradientMap: { value: gradientTexture }
      },
      vertexShader: `
        varying vec3 vPosition;
        void main() {
          vPosition = position;
          gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
        }
      `,
      fragmentShader: `
        uniform sampler2D gradientMap;
        varying vec3 vPosition;
        void main() {
          vec3 color = texture2D(gradientMap, vec2(0.5, (vPosition.y + 1.0) * 0.5)).rgb;
          gl_FragColor = vec4(color, 1.0);
        }
      `,
      wireframe: true,
      wireframeLinewidth: 1
    })
  }, [gradientTexture])

  const [spring, api] = useSpring(() => ({
    scale: 1,
    config: { ...config.gentle, clamp: true }
  }))

  // Optimize animation frame updates
  useFrame(() => {
    if (!meshRef.current) return

    if (!isDragging) {
      meshRef.current.rotation.x += autoRotationSpeed.current[0]
      meshRef.current.rotation.y += autoRotationSpeed.current[1]
    } else {
      meshRef.current.rotation.x += rotation[0] * 0.01
      meshRef.current.rotation.y += rotation[1] * 0.01
    }
  })

  // Memoize event handlers
  const handleClick = useCallback((event: ThreeEvent<MouseEvent>) => {
    event.stopPropagation()
    if (isTransitioning) return

    setIsTransitioning(true)
    const currentScale = spring.scale.get()
    const targetScale = currentScale * 0.8

    api.start({
      to: async (next) => {
        await next({ scale: targetScale, config: { tension: 300, friction: 10 } })
        setDetail((prevDetail) => (prevDetail === 2 ? 0 : prevDetail + 1))
        await new Promise(resolve => setTimeout(resolve, 100))
        await next({ scale: currentScale, config: { tension: 200, friction: 10 } })
      },
      onRest: () => setIsTransitioning(false)
    })
  }, [isTransitioning, spring.scale, api])

  const handlePointerDown = useCallback((event: ThreeEvent<PointerEvent>) => {
    setIsDragging(true)
    previousMousePosition.current = { x: event.clientX, y: event.clientY }
  }, [])

  const handlePointerUp = useCallback(() => {
    setIsDragging(false)
  }, [])

  const handlePointerMove = useCallback((event: ThreeEvent<PointerEvent>) => {
    if (!isDragging) return

    const deltaX = event.clientX - previousMousePosition.current.x
    const deltaY = event.clientY - previousMousePosition.current.y

    setRotation(prev => [
      prev[0] + deltaY * 0.005,
      prev[1] + deltaX * 0.005,
      0
    ])

    previousMousePosition.current = { x: event.clientX, y: event.clientY }
  }, [isDragging])

  // Cleanup resources
  useEffect(() => {
    return () => {
      geometry.dispose()
      shaderMaterial.dispose()
      gradientTexture.dispose()
    }
  }, [geometry, shaderMaterial, gradientTexture])

  const scale = spring.scale.to(s => s * (viewport.width < 4 ? 1.5 : 2))

  return (
    <animated.mesh 
      ref={meshRef} 
      onClick={handleClick} 
      onPointerDown={handlePointerDown}
      onPointerUp={handlePointerUp}
      onPointerOut={handlePointerUp}
      onPointerMove={handlePointerMove}
      scale={scale}
      geometry={geometry}
      material={shaderMaterial}
    />
  )
}