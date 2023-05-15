import React from 'react'
import ReactDOM from 'react-dom/client'
import './styles.css'
import Overlay from './Overlay'
import { Expereience } from './Experience'
import { Canvas } from '@react-three/fiber'
import { OrbitControls } from '@react-three/drei'

ReactDOM.createRoot(document.getElementById('root')).render(
  <>
    <Canvas
      camera={
        { position : [0, 0.1,-10],
          fov: 35
        } 
      }
      shadows
      eventSource={document.getElementById('root')}
      eventPrefix="client">
        <Expereience/>
    </Canvas>
    <Overlay />
  </>
)
