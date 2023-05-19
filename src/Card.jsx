import { AccumulativeShadows, Clone, ContactShadows, Html, RandomizedLight, useGLTF, useTexture } from "@react-three/drei";
import { useFrame } from "@react-three/fiber";
import { easing } from "maath";
import { useEffect, useMemo, useRef, useState } from "react";
import { DoubleSide } from "three";
import { useSnapshot } from "valtio";
import { state } from "./store";
import { findCardByID } from "./assets/functions";



export function Card ({ moveCamera, cardClicked, emoji, cardParams, id}) {
  
  const paper = useTexture("./Watercolor_Paper_001_NORM.jpg")
  useTexture.preload("./Watercolor_Paper_001_NORM.jpg")
  const { nodes, materials } = useGLTF("/card.glb");
  const rX = useMemo( ()=> Math.random(), [] )
  const rY = useMemo( ()=> Math.random(), [] )


  materials.Material.normalMap = paper;   
  materials.Material.bumpMap = paper;
  materials.Material.bumpScale=3
  materials.Material.roughness=0.6


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
            meshRef.current.children[0].material.color,
            selectedCard.color,
            0.2,
            delta
          );
          easing.damp3(
            meshRef.current.position,
            deck.find( e=> e.id === id).position,
            0.3,
            delta
          );
        } )


 

        return (<>
        <group
          scale={2.0}
          // starting postion -> swtich to the generated for each card
          position = {
            [ rX*10,
              -rY*10, 
              0
            ] }
          dispose ={null}
          ref     ={meshRef}
          onClick = {
            () => {
              cardClicked( id, emoji, meshRef.current );
              }
            }
          >
          <mesh
            castShadow
            geometry={nodes.Cube_1.geometry}
            material={materials.Material}
          />
          <mesh
            castShadow        
            geometry={nodes.Cube_2.geometry}
            material={materials["Material.001"]}
          />
          <Html scale={0.9} 
                ref={htmlRef} wrapperClass="emoji" 
                position={[0,0.03,0.01]} 
                center occlude transform
          >
            {emoji}
          </Html>
        </group>
        </>)
      }

 