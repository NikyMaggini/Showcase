import React from 'react'
import { RigidBody } from '@react-three/rapier'
export default function Level() {
  return (
    <RigidBody type="fixed" restitution={0} friction={1}>
      <mesh rotation={[-Math.PI / 2, 0, 0]} receiveShadow>
        <planeGeometry args={[100, 100]} />
        <meshStandardMaterial color="#222" />
      </mesh>
    </RigidBody>
  )
}
