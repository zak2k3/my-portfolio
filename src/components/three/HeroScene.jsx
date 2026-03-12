import { useRef, useMemo } from 'react'
import { Canvas, useFrame } from '@react-three/fiber'
import { Float, Torus, Octahedron, Box, Sphere, MeshDistortMaterial, GradientTexture } from '@react-three/drei'
import * as THREE from 'three'

function FloatingCube({ position, scale, speed, color }) {
  const meshRef = useRef()
  useFrame((state) => {
    meshRef.current.rotation.x = state.clock.elapsedTime * speed * 0.5
    meshRef.current.rotation.y = state.clock.elapsedTime * speed * 0.7
  })
  return (
    <Float floatIntensity={2} rotationIntensity={1} speed={speed}>
      <mesh ref={meshRef} position={position} scale={scale}>
        <boxGeometry args={[1, 1, 1]} />
        <meshStandardMaterial
          color={color}
          emissive={color}
          emissiveIntensity={0.3}
          transparent
          opacity={0.7}
          wireframe
        />
      </mesh>
    </Float>
  )
}

function FloatingTorus({ position, scale, speed }) {
  const meshRef = useRef()
  useFrame((state) => {
    meshRef.current.rotation.x = state.clock.elapsedTime * speed * 0.3
    meshRef.current.rotation.z = state.clock.elapsedTime * speed * 0.5
  })
  return (
    <Float floatIntensity={1.5} speed={speed}>
      <mesh ref={meshRef} position={position} scale={scale}>
        <torusGeometry args={[1, 0.3, 16, 100]} />
        <meshStandardMaterial
          color="#00f5ff"
          emissive="#00f5ff"
          emissiveIntensity={0.4}
          transparent
          opacity={0.6}
          wireframe
        />
      </mesh>
    </Float>
  )
}

function FloatingOctahedron({ position, scale, speed }) {
  const meshRef = useRef()
  useFrame((state) => {
    meshRef.current.rotation.y = state.clock.elapsedTime * speed
    meshRef.current.rotation.x = Math.sin(state.clock.elapsedTime * 0.5) * 0.3
  })
  return (
    <Float floatIntensity={2} speed={speed * 0.8}>
      <mesh ref={meshRef} position={position} scale={scale}>
        <octahedronGeometry args={[1, 0]} />
        <meshStandardMaterial
          color="#bf00ff"
          emissive="#bf00ff"
          emissiveIntensity={0.5}
          transparent
          opacity={0.8}
          wireframe
        />
      </mesh>
    </Float>
  )
}

function CentralSphere() {
  const meshRef = useRef()
  useFrame((state) => {
    meshRef.current.rotation.y = state.clock.elapsedTime * 0.2
    meshRef.current.rotation.x = state.clock.elapsedTime * 0.1
  })
  return (
    <mesh ref={meshRef} position={[0, 0, 0]} scale={1.5}>
      <sphereGeometry args={[1, 32, 32]} />
      <MeshDistortMaterial
        color="#050d14"
        emissive="#00f5ff"
        emissiveIntensity={0.1}
        distort={0.4}
        speed={2}
        transparent
        opacity={0.6}
      />
    </mesh>
  )
}

function RingParticles() {
  const count = 200
  const positions = useMemo(() => {
    const arr = new Float32Array(count * 3)
    for (let i = 0; i < count; i++) {
      const angle = (i / count) * Math.PI * 2
      const radius = 3 + Math.random() * 2
      arr[i * 3] = Math.cos(angle) * radius
      arr[i * 3 + 1] = (Math.random() - 0.5) * 1
      arr[i * 3 + 2] = Math.sin(angle) * radius
    }
    return arr
  }, [])

  const pointsRef = useRef()
  useFrame((state) => {
    pointsRef.current.rotation.y = state.clock.elapsedTime * 0.05
  })

  return (
    <points ref={pointsRef}>
      <bufferGeometry>
        <bufferAttribute
          attach="attributes-position"
          count={count}
          array={positions}
          itemSize={3}
        />
      </bufferGeometry>
      <pointsMaterial
        color="#00f5ff"
        size={0.05}
        transparent
        opacity={0.8}
        sizeAttenuation
      />
    </points>
  )
}

export default function HeroScene() {
  return (
    <Canvas
      camera={{ position: [0, 0, 8], fov: 60 }}
      style={{ background: 'transparent' }}
      gl={{ alpha: true, antialias: true }}
    >
      {/* Lights */}
      <ambientLight intensity={0.3} />
      <pointLight position={[10, 10, 10]} color="#00f5ff" intensity={1} />
      <pointLight position={[-10, -10, -10]} color="#bf00ff" intensity={0.5} />
      <pointLight position={[0, 5, 0]} color="#ff0080" intensity={0.3} />

      {/* Central distorted sphere */}
      <CentralSphere />

      {/* Ring particles */}
      <RingParticles />

      {/* Floating geometric objects */}
      <FloatingCube position={[-4, 2, -2]} scale={0.5} speed={0.5} color="#00f5ff" />
      <FloatingCube position={[4, -2, -1]} scale={0.4} speed={0.7} color="#bf00ff" />
      <FloatingCube position={[-3, -2, -3]} scale={0.3} speed={0.4} color="#ff0080" />
      <FloatingCube position={[3, 3, -2]} scale={0.6} speed={0.3} color="#00ff9f" />

      <FloatingTorus position={[-2.5, 0, -1]} scale={0.4} speed={0.6} />
      <FloatingTorus position={[2.5, 1, -2]} scale={0.3} speed={0.9} />

      <FloatingOctahedron position={[0, 3, -2]} scale={0.5} speed={0.7} />
      <FloatingOctahedron position={[-1, -3, -1]} scale={0.4} speed={0.5} />
    </Canvas>
  )
}
