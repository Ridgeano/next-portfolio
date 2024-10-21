'use client'

import { motion, useInView } from 'framer-motion'
import { useRef, useState, useEffect, useMemo } from 'react'
import { Canvas, useFrame, useThree, ThreeEvent } from '@react-three/fiber'
import { PerspectiveCamera } from '@react-three/drei'
import { Montserrat } from 'next/font/google'
import * as THREE from 'three'
import { useSpring, animated, config } from '@react-spring/three'

const montserrat = Montserrat({ subsets: ['latin'] })

function CrystalShape() {
  const [detail, setDetail] = useState(0)
  const meshRef = useRef<THREE.Mesh>(null)
  const [isTransitioning, setIsTransitioning] = useState(false)
  const { viewport } = useThree()
  const [rotation, setRotation] = useState<[number, number, number]>([0, 0, 0])
  const [isDragging, setIsDragging] = useState(false)
  const previousMousePosition = useRef({ x: 0, y: 0 })
  const autoRotationSpeed = useRef<[number, number]>([0.001, 0.002])

  const gradientTexture = useMemo(() => {
    const canvas = document.createElement('canvas')
    canvas.width = 1
    canvas.height = 256
    const ctx = canvas.getContext('2d')
    if (ctx) {
      const gradient = ctx.createLinearGradient(0, 0, 0, 256)
      gradient.addColorStop(0, '#2563eb')
      gradient.addColorStop(0.5, '#7c3aed')
      gradient.addColorStop(1, '#c026d3')
      ctx.fillStyle = gradient
      ctx.fillRect(0, 0, 1, 256)
    }
    const texture = new THREE.CanvasTexture(canvas)
    texture.needsUpdate = true
    return texture
  }, [])

  const [spring, api] = useSpring(() => ({
    scale: 1,
    config: { ...config.gentle, clamp: true }
  }))

  useFrame(() => {
    if (meshRef.current) {
      if (!isDragging) {
        meshRef.current.rotation.x += autoRotationSpeed.current[0]
        meshRef.current.rotation.y += autoRotationSpeed.current[1]
      } else {
        meshRef.current.rotation.x += rotation[0] * 0.01
        meshRef.current.rotation.y += rotation[1] * 0.01
      }
    }
  })

  const handleClick = (event: ThreeEvent<MouseEvent>) => {
    event.stopPropagation()
    if (isTransitioning) return

    setIsTransitioning(true)

    const currentScale = spring.scale.get()
    const targetScale = currentScale * 0.8 // Shrink to 80% temporarily

    api.start({
      to: async (next) => {
        await next({ scale: targetScale, config: { tension: 300, friction: 10 } })
        setDetail((prevDetail) => (prevDetail === 2 ? 0 : prevDetail + 1))
        await new Promise(resolve => setTimeout(resolve, 100))
        await next({ scale: currentScale, config: { tension: 200, friction: 10 } })
      },
      onRest: () => setIsTransitioning(false)
    })
  }

  useEffect(() => {
    if (meshRef.current) {
      meshRef.current.geometry.dispose()
      meshRef.current.geometry = new THREE.IcosahedronGeometry(1, detail)
    }
  }, [detail])

  const handlePointerDown = (event: ThreeEvent<PointerEvent>) => {
    setIsDragging(true)
    previousMousePosition.current = { x: event.clientX, y: event.clientY }
  }

  const handlePointerUp = () => {
    setIsDragging(false)
  }

  const handlePointerMove = (event: ThreeEvent<PointerEvent>) => {
    if (isDragging) {
      const deltaX = event.clientX - previousMousePosition.current.x
      const deltaY = event.clientY - previousMousePosition.current.y

      setRotation([
        rotation[0] + deltaY * 0.005,
        rotation[1] + deltaX * 0.005,
        0
      ])

      previousMousePosition.current = { x: event.clientX, y: event.clientY }
    }
  }

  return (
    <animated.mesh 
      ref={meshRef} 
      onClick={handleClick} 
      onPointerDown={handlePointerDown}
      onPointerUp={handlePointerUp}
      onPointerOut={handlePointerUp}
      onPointerMove={handlePointerMove}
      scale={spring.scale.to(s => s * (viewport.width < 4 ? 1.5 : 2))}
      position={[0, 0, 0]}
    >
      <icosahedronGeometry args={[1, detail]} />
      <shaderMaterial
        uniforms={{
          gradientMap: { value: gradientTexture }
        }}
        vertexShader={`
          varying vec3 vPosition;
          void main() {
            vPosition = position;
            gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
          }
        `}
        fragmentShader={`
          uniform sampler2D gradientMap;
          varying vec3 vPosition;
          void main() {
            vec3 color = texture2D(gradientMap, vec2(0.5, (vPosition.y + 1.0) * 0.5)).rgb;
            gl_FragColor = vec4(color, 1.0);
          }
        `}
        wireframe={true}
        wireframeLinewidth={1}
      />
    </animated.mesh>
  )
}

function Scene() {
  return (
    <>
      <PerspectiveCamera makeDefault position={[0, 0, 12]} />
      <CrystalShape />
    </>
  )
}

export default function Summary() {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, amount: 0.3 })

  const containerVariants = {
    hidden: {},
    visible: {
      transition: {
        staggerChildren: 0.1,
        delayChildren: 0.3
      }
    }
  }

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.5 }
    }
  }

  return (
    <div className="w-full bg-zinc-900 py-24 md:py-32 lg:py-40" id="summary">
      <motion.section 
        ref={ref}
        className="w-full mx-auto px-4 sm:px-6 lg:px-8"
        variants={containerVariants}
        initial="hidden"
        animate={isInView ? "visible" : "hidden"}
      >
        <div className="flex flex-col md:flex-row items-start justify-between gap-12">
          <motion.div 
            className="w-full md:w-1/2 order-2 md:order-1"
            variants={itemVariants}
          >
            <div className="h-[350px] sm:h-[450px] md:h-[550px]">
              <Canvas dpr={[1, 2]} performance={{ min: 0.5 }}>
                <Scene />
              </Canvas>
            </div>
            <motion.p 
              className="text-center text-white mt-4 text-sm font-medium"
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 1, duration: 0.5 }}
            >
              Click to transform or drag to rotate the shape
            </motion.p>
          </motion.div>
          <motion.div className="w-full md:w-1/2 space-y-6 order-1 md:order-2 md:-mt-12" variants={itemVariants}>
            <h2 className={`${montserrat.className} text-4xl md:text-5xl lg:text-6xl font-bold text-white leading-tight`}>
              Crafting Digital <span className="text-violet-500">Experiences</span> That Inspire
            </h2>
            <p className="text-xl text-zinc-400 max-w-2xl">
              I focus on creating holistic digital solutions that seamlessly integrate frontend aesthetics with robust backend functionality. By prioritizing both technical excellence and user-centric design, I deliver exceptional web experiences.
            </p>
            <ul className="grid grid-cols-2 gap-4 text-zinc-300">
              <li className="flex items-center space-x-2">
                <span className="w-2 h-2 bg-violet-500 rounded-full"></span>
                <span>React & Next.js</span>
              </li>
              <li className="flex items-center space-x-2">
                <span className="w-2 h-2 bg-violet-500 rounded-full"></span>
                <span>Three.js & WebGL</span>
              </li>
              <li className="flex items-center space-x-2">
                <span className="w-2 h-2 bg-violet-500 rounded-full"></span>
                <span>Node.js & Express</span>
              </li>
              <li className="flex items-center space-x-2">
                <span className="w-2 h-2 bg-violet-500 rounded-full"></span>
                <span>UI/UX Design</span>
              </li>
            </ul>
          </motion.div>
        </div>
      </motion.section>
    </div>
  )
}