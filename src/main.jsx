import React from 'react'
import ReactDOM from 'react-dom/client'
import './styles.css'
import Overlay from './Overlay'
import { Expereience } from './Experience'
import { Canvas } from '@react-three/fiber'

ReactDOM.createRoot(document.getElementById('root')).render(
  <>
    <Canvas
      camera={
        { position : [ 0, -3,-12],
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
