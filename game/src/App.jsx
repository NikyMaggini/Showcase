import { Canvas, useFrame } from '@react-three/fiber'
import { OrbitControls } from '@react-three/drei'
import { Suspense, useRef } from 'react'
import * as THREE from 'three'
import NeuralNetwork from './NeuralNetwork'

function SpinningBox(props) {
  const ref = useRef()
  useFrame((_state, dt) => {
    if (!ref.current) return
    ref.current.rotation.x += dt * 0.6
    ref.current.rotation.y += dt * 0.9
  })
  return (
    <mesh ref={ref} {...props} castShadow receiveShadow>
      <boxGeometry args={[1, 1, 1]} />
      <meshStandardMaterial color="#8ac" metalness={0.1} roughness={0.6} />
    </mesh>
  )
}

export default function App() {
  return (
    <Canvas
      shadows
      style={{ width: '100%', height: '100%', display: 'block' }}
      camera={{ position: [5, 5, 5], fov: 60 }}
      onCreated={({ gl }) => {
        gl.setPixelRatio(Math.min(window.devicePixelRatio, 1.5))
      }}
    >
      <color attach="background" args={['#0e1116']} />
      <hemisphereLight intensity={0.6} />
      <directionalLight position={[5, 5, 5]} castShadow intensity={1.1} />
      <Suspense fallback={null}>
        <SpinningBox position={[0, 0.5, 0]} />
        <mesh rotation={[-Math.PI / 2, 0, 0]} receiveShadow>
          <planeGeometry args={[20, 20]} />
          <meshStandardMaterial color="#222" />
        </mesh>
      </Suspense>
      <OrbitControls makeDefault />
    </Canvas>
  )
}
