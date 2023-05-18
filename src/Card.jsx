import { AccumulativeShadows, ContactShadows, Html, RandomizedLight, useGLTF, useTexture } from "@react-three/drei";
import { useFrame } from "@react-three/fiber";
import { easing } from "maath";
import { useEffect, useRef, useState } from "react";
import { DoubleSide } from "three";
import { useSnapshot } from "valtio";
import { state } from "./store";


export function Card ({ moveCamera, cardClicked, position, emoji, cardParams, id}) {
  
  const paper = useTexture("./Watercolor_Paper_001_NORM.jpg")
  useTexture.preload("./Watercolor_Paper_001_NORM.jpg")
  const model = useGLTF("./card.glb")
  console.log(model.scene.children[0].geometry)

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
            0.2,
            delta
          )
        } )

 


          return (<>
          <mesh
          geometry={model.scene.children[0].geometry}
            scale={2}
            rotation={[ 0, 0 , 0 ]}
            castShadow   
            position    = {position}
            ref         = {meshRef}
            onClick     = {
              () => {
                cardClicked( id, emoji, meshRef.current)
              }
             }

          >
            <meshStandardMaterial roughness={0.3} metalness={0.8} side={DoubleSide} normalMap={paper} bumpMap={paper} bumpScale={0.5}/>

            <Html scale={0.8} ref={htmlRef} wrapperClass="emoji" position={[0,0,0.03]} center occlude transform >
              {emoji}
            </Html>
          </mesh>

        </>)
      }

 