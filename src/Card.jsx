import { Html } from "@react-three/drei";
import { useFrame } from "@react-three/fiber";
import { easing } from "maath";
import { useRef, useState } from "react";
import { DoubleSide } from "three";
import { useSnapshot } from "valtio";
import { state } from "./store";

export function Card ({ moveCamera, cardClicked, position, color, emoji, cardParams, id}) {
        
        const { deck } = useSnapshot(state)
        const meshRef = useRef()

        useFrame( (state, delta)=>{
          easing.dampE (
            meshRef.current.rotation,
            deck.find( e=> e.id === id).rotation || [0,0,0],
            0.3,
            delta
          )
        } )

      
        return (<>
          <mesh
            position    = {position}
            ref         = {meshRef}
            onClick     = {
              () => {
                moveCamera(meshRef.current)
                cardClicked( id, emoji, meshRef.current)
              }
             }
          >
            <boxGeometry args={[cardParams.width,cardParams.height, 0.01]} />
            <meshStandardMaterial color = {color} side = {DoubleSide} roughness={0.4} metalness={0.5} />
            <Html wrapperClass="emoji" position={[0,0,0.2]} center occlude transform  >
              {emoji}
            </Html>
          </mesh>
        </>)
      }