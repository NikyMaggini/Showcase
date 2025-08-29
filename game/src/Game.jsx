import React from "react";
import { Canvas } from "@react-three/fiber";
import { OrbitControls, KeyboardControls } from "@react-three/drei";
import { Physics } from "@react-three/rapier";
import { Suspense } from "react";
import * as THREE from "three";
import Player from "./components/Player.jsx";
import Level from "./components/Level.jsx";
import HUD from "./components/HUD.jsx";
import { Stats } from "@react-three/drei";
import { Text, Billboard } from "@react-three/drei";

export default function Game() {
  return (
    <>
      <Canvas
        style={{ width: "100%", height: "100%" }}
        shadows
        gl={{ antialias: true }}
        dpr={[1, 1.75]}
        camera={{ position: [0, 12, 8], fov: 55 }}
        onCreated={({ gl }) => {
          gl.outputColorSpace = THREE.SRGBColorSpace;
          gl.toneMapping = THREE.ACESFilmicToneMapping;
        }}
      >
        <color attach="background" args={["#0e1116"]} />
        <hemisphereLight intensity={0.6} />
        <directionalLight position={[5, 5, 5]} castShadow intensity={1.1} />

        <KeyboardControls
          map={[
            { name: "forward", keys: ["KeyW", "ArrowUp"] },
            { name: "back", keys: ["KeyS", "ArrowDown"] },
            { name: "left", keys: ["KeyA", "ArrowLeft"] },
            { name: "right", keys: ["KeyD", "ArrowRight"] },
            { name: "jump", keys: ["Space"] },
          ]}
        >
          <Physics gravity={[0, -9.81, 0]}>
            <Suspense fallback={null}>
              <Level />
              <Player />
              <Billboard follow lockX lockY position={[0, 2, 0]}>
                <Text
                  fontSize={2.5}
                  color="red"
                  outlineWidth={0.02}
                  outlineColor="#000"
                  anchorX="center"
                  anchorY="middle"
                  rotation={[30, 0, 0]}
                >
                  IN SVILUPPO!
                </Text>
              </Billboard>
            </Suspense>
          </Physics>
        </KeyboardControls>
        <axesHelper args={[2]} position={[0, 0.01, 0]} />
        <gridHelper args={[20, 20]} />
      </Canvas>
      <HUD />
      <Stats />
      {/* <div
        style={{
          position: "absolute",
          top: "50%",
          left: "50%",
          transform: "translate(-50%, -50%)",
          color: "red",
          fontSize: "10rem",
          fontWeight: "bold",
          zIndex: 1000,
          pointerEvents: "none",
        }}
      >
        IN SVILUPPO!
      </div> */}
    </>
  );
}
