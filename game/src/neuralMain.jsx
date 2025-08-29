import React from 'react'
import ReactDOM from 'react-dom/client'
import { Canvas } from '@react-three/fiber'
import { OrbitControls } from '@react-three/drei'
import { Suspense } from 'react'
import NeuralNetwork from './NeuralNetwork.jsx'

ReactDOM.createRoot(document.getElementById('root')).render(
  <Canvas camera={{ position: [-15, 12, 12], fov: 60 }} style={{ width: '100%', height: '100%' }} gl={{ alpha: true }}>
    <hemisphereLight intensity={0.1} />
    <directionalLight position={[5, 5, 5]} castShadow intensity={1.1} />
    <Suspense fallback={null}>
      <NeuralNetwork />
    </Suspense>
  </Canvas>
)
