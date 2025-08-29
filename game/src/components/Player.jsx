import React from 'react'
import { RigidBody, CapsuleCollider } from '@react-three/rapier'
import { useFrame } from '@react-three/fiber'
import { useKeyboardControls } from '@react-three/drei'
import { useRef } from 'react'
import * as THREE from 'three'

export default function Player() {
  const ref = useRef()
  const [, get] = useKeyboardControls()

  useFrame((_, dt) => {
    const body = ref.current
    if (!body) return
    const vel = body.linvel()
    const speed = 6
    const dir = new THREE.Vector3(
      (get().right ? 1 : 0) - (get().left ? 1 : 0),
      0,
      (get().back ? 1 : 0) - (get().forward ? 1 : 0),
    )
    if (dir.lengthSq() > 0) dir.normalize().multiplyScalar(speed)
    body.setLinvel({ x: dir.x, y: vel.y, z: dir.z }, true)
    if (get().jump && Math.abs(vel.y) < 0.05) {
      body.applyImpulse({ x: 0, y: 4.5, z: 0 }, true)
    }
  })

  return (
    <RigidBody ref={ref} position={[0, 0, 5]} canSleep={false} enabledRotations={[false, false, false]}>
      <CapsuleCollider args={[0.5, 0.35]} />
      <mesh castShadow>
        <capsuleGeometry args={[0.35, 0.5, 8, 16]} />
        <meshStandardMaterial color="#4ade80" />
      </mesh>
    </RigidBody>
  )
}
