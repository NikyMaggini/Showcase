import React from 'react'
export default function HUD() {
  return (
    <div style={{position:'fixed', inset:10, color:'#fff', fontFamily:'system-ui', pointerEvents:'none'}}>
      <div style={{fontWeight:600}}>Score: 0</div>
      <div style={{opacity:0.7, fontSize:12}}>WASD/Arrows to move, Space to jump</div>
    </div>
  )
}
