import React, { useState, useEffect, Suspense, lazy, useRef } from 'react'
import { Canvas, useFrame } from '@react-three/fiber'
import { OrbitControls } from '@react-three/drei'

// Carica il gioco solo dopo Play (bundle più leggero all'avvio)
const Game = lazy(() => import('./Game.jsx'))

function SpinningBox(props) {
  const ref = useRef()
  useFrame((_, dt) => {
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

function StartBackground() {
  return (
    <Canvas
      shadows
      style={{ width: '100%', height: '100%', display: 'block' }}
      onCreated={({ gl }) => {
        gl.setPixelRatio(Math.min(window.devicePixelRatio, 1.5))
      }}
    >
      <color attach="background" args={['#0e1116']} />
       <directionalLight position={[5, 5, 5]} castShadow intensity={1.1} />
      <SpinningBox position={[0, 2, 0]} />
      {/* <mesh rotation={[-Math.PI / 2, 0, 0]} receiveShadow>
        <planeGeometry args={[20, 20]} />
        <meshStandardMaterial color="#222" />
      </mesh>
      <OrbitControls makeDefault /> */}
      <axesHelper args={[1]} position={[0, -3, 0]} />

    </Canvas>
  )
}

function StartOverlay({ onStart }) {
  useEffect(() => {
    const onKey = (e) => ((e.key === 'Enter' || e.key === ' ') && onStart())
    window.addEventListener('keydown', onKey)
    return () => window.removeEventListener('keydown', onKey)
  }, [onStart])

  return (
    <div style={{
      position:'fixed', inset:0, display:'grid', placeItems:'center',
      pointerEvents:'none'
    }}>
      <div style={{
        pointerEvents:'auto', textAlign:'center', fontFamily:'system-ui', color:'#fff',
        background:'rgba(0,0,0,0.35)', padding:'24px 28px', borderRadius:16,
        border:'1px solid rgba(255,255,255,0.15)'
      }}>
        <h1 style={{fontSize:28, margin:'0 0 8px'}}>My 3D Game</h1>
        <p style={{opacity:0.8, margin:'0 0 16px'}}>Premi Play per iniziare</p>
        <button
          onClick={onStart}
          style={{
            padding:'12px 24px', fontSize:16, fontWeight:700, borderRadius:12,
            border:'1px solid rgba(255,255,255,0.2)', background:'rgba(255,255,255,0.08)',
            color:'#fff', cursor:'pointer'
          }}
        >
          ▶︎ Play
        </button>
        <div style={{marginTop:10, opacity:0.7, fontSize:12}}>(Invio o Space)</div>
      </div>
    </div>
  )
}

function Loading() {
  return (
    <div style={{
      position:'fixed', inset:0, display:'grid', placeItems:'center',
      background:'#0b0f14', color:'#fff', fontFamily:'system-ui'
    }}>
      Caricamento…
    </div>
  )
}

export default function App() {
  const [started, setStarted] = useState(false)
  if (!started) {
    return (
      <>
        <StartBackground />
        <StartOverlay onStart={() => setStarted(true)} />
      </>
    )
  }
  return (
    <Suspense fallback={<Loading />}>
      <Game />
    </Suspense>
  )
}
