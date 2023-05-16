import { AccumulativeShadows, Html, RandomizedLight } from "@react-three/drei";
import { useFrame } from "@react-three/fiber";
import { easing } from "maath";
import { useEffect, useRef, useState } from "react";
import { DoubleSide } from "three";
import { useSnapshot } from "valtio";
import { state } from "./store";

export function Card ({ moveCamera, cardClicked, position, emoji, cardParams, id}) {
        
        const { deck } = useSnapshot(state)
        let selectedCard = deck.find( e=> e.id === id)
        const meshRef = useRef()
        const htmlRef = useRef()
        const [ posZ , setPosZ ] = useState(0)


        useFrame( (state, delta)=>{
          easing.dampE (
            meshRef.current.rotation,
            deck.find( e=> e.id === id).rotation || [0,0,0],
            0.15,
            delta
          );
          easing.dampC (
            meshRef.current.material.color,
            selectedCard.color,
            0.4,
            delta
          )
        } )

        useFrame(
          (state, delta) => { 
            easing.damp3(
              meshRef.current.position,
              [meshRef.current.position.x,meshRef.current.position.y, posZ],
              0.3,
              delta
            );
            
          }
        )


          return (<>
          <mesh
            castShadow   
            position    = {position}
            ref         = {meshRef}
            onClick     = {
              () => {
                cardClicked( id, emoji, meshRef.current)
              }
             }

          >
            <boxGeometry args={[cardParams.width,cardParams.height, 0.01]} />
            <meshStandardMaterial side = {DoubleSide} roughness={0.4} metalness={0.5} />
            <Html ref={htmlRef} wrapperClass="emoji" position={[0,0,0.2]} center occlude transform  >
              {emoji}
            </Html>
          </mesh>
        </>)
      }

 