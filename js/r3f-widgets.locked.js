// /js/r3f-widgets.locked.js (pinned deps, pure ESM, no JSX, SES-friendly)
import React, { Suspense } from "https://esm.sh/react@18.2.0";
import { createRoot } from "https://esm.sh/react-dom@18.2.0/client";
// Pin three & pass as dep to fiber/drei so they all share the same React/three
import * as THREE from "https://esm.sh/three@0.161.0";
import { Canvas } from "https://esm.sh/@react-three/fiber@8.15.14?deps=react@18.2.0,react-dom@18.2.0,three@0.161.0";
import { OrbitControls, useGLTF, Bounds } from "https://esm.sh/@react-three/drei@9.105.6?deps=react@18.2.0,react-dom@18.2.0,three@0.161.0,@react-three/fiber@8.15.14";

const h = React.createElement;

// helpers
const parseVec3 = (str, def) => {
  if (str === undefined) return def;
  const p = String(str).split(",").map(Number);
  return [p[0] ?? def[0], p[1] ?? def[1], p[2] ?? def[2]];
};
const parseOptBool = (v) => (v === undefined ? undefined : (v === "" || v === "true" || v === true));
const parseOptNum  = (v) => (v === undefined ? undefined : Number(v));
const parseOptDeg  = (v) => (v === undefined ? undefined : Number(v) * Math.PI / 180); // gradi → radianti für *Angle props

function GLTFModel({ url, scale = [1,1,1], rotation = [0,0,0], position = [0,0,0] }) {
  const { scene } = useGLTF(url, true);
  return h("primitive", { object: scene, scale, rotation, position, dispose: null });
}

function Widget({
  url, scale, rotation, position,
  // Camera
  zoom = 3,
  fov = 45,
  cameraPosition,
  // Bounds
  // fit = true, clip = true, observe = true, margin = 1.1,
  // Controls
  enableZoom = true,
  enablePan = true,
  enableRotate = true,
  autoRotate = true,
  autoRotateSpeed = 2.0,
  minDistance, maxDistance,
  minPolarAngle, maxPolarAngle,
  minAzimuthAngle, maxAzimuthAngle,
  target
}) {
  const camPos = cameraPosition ?? [0, 0, Number(zoom)];

  return h(
    Canvas,
    { dpr: [1, 2], camera: { position: camPos, fov }, style: { width: "100%", height: "100%" } },
    h("ambientLight", { intensity: 5 }),
    h("directionalLight", { position: [2, 2, 3], intensity: 1.2 }),
    h(
      Suspense,
      { fallback: null },
      h(Bounds, { fit: true, clip: true, observe: false, margin: 1.1 },
        h(GLTFModel, { url, scale, rotation, position })
      )
    ),
    h(OrbitControls, {
      makeDefault: true,
      enableZoom,
      enablePan,
      enableRotate,
      autoRotate,
      autoRotateSpeed,
      minDistance,
      maxDistance,
      minPolarAngle,
      maxPolarAngle,
      minAzimuthAngle,
      maxAzimuthAngle,
      target
    })
  );
}

function mountWidget(el) {
  const url = el.dataset.model;
  const scale = parseVec3(el.dataset.scale, [1, 1, 1]);
  const rotation = parseVec3(el.dataset.rotation, [0, 0, 0]);
  const position = parseVec3(el.dataset.position, [0, 0, 0]);

  // Camera
  const zoom = parseOptNum(el.dataset.zoom) ?? 3;
  const fov = parseOptNum(el.dataset.fov) ?? 45;
  const cameraPosition = parseVec3(el.dataset.cameraPosition, undefined);

  // Bounds
  const fit = parseOptBool(el.dataset.fit);
  const clip = parseOptBool(el.dataset.clip);
  const observe = parseOptBool(el.dataset.observe);
  const margin = parseOptNum(el.dataset.margin);

  // Controls
  const enableZoom = parseOptBool(el.dataset.enableZoom);
  const enablePan = parseOptBool(el.dataset.enablePan);
  const enableRotate = parseOptBool(el.dataset.enableRotate);
  const autoRotate = parseOptBool(el.dataset.autoRotate);
  const autoRotateSpeed = parseOptNum(el.dataset.autoRotateSpeed);
  const minDistance = parseOptNum(el.dataset.minDistance);
  const maxDistance = parseOptNum(el.dataset.maxDistance);
  const minPolarAngle = parseOptDeg(el.dataset.minPolarAngle);
  const maxPolarAngle = parseOptDeg(el.dataset.maxPolarAngle);
  const minAzimuthAngle = parseOptDeg(el.dataset.minAzimuthAngle);
  const maxAzimuthAngle = parseOptDeg(el.dataset.maxAzimuthAngle);
  const target = parseVec3(el.dataset.target, undefined);

  try { useGLTF.preload(url); } catch {}

  const root = createRoot(el);
  const ro = new ResizeObserver(() => {});
  ro.observe(el);

  root.render(
    h(Widget, {
      url, scale, rotation, position,
      zoom, fov, cameraPosition,
      fit, clip, observe, margin,
      enableZoom, enablePan, enableRotate,
      autoRotate, autoRotateSpeed,
      minDistance, maxDistance,
      minPolarAngle, maxPolarAngle,
      minAzimuthAngle, maxAzimuthAngle,
      target
    })
  );
  el.dataset.mounted = "true";
}

function init() {
  document.querySelectorAll(".r3f-widget:not([data-mounted])").forEach(mountWidget);
}

if (document.readyState === "loading") {
  document.addEventListener("DOMContentLoaded", init);
} else {
  init();
}
document.addEventListener("r3f:mount", init);
new MutationObserver(() => init()).observe(document.body, { childList: true, subtree: true });

// Debug helpers (optional)
// console.log("React version:", React.version);
// import * as ReactDomClient from "https://esm.sh/react-dom@18.2.0/client";
// console.log("ReactDOM client keys:", Object.keys(ReactDomClient));
