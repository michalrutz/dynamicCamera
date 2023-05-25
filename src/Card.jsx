import { Html, useGLTF, useTexture } from "@react-three/drei";
import { useFrame } from "@react-three/fiber";
import { easing } from "maath";
import { useMemo, useRef } from "react";
import { DoubleSide, MeshBasicMaterial } from "three";
import { useSnapshot } from "valtio";
import { state } from "./store";


export function Card ({ moveCamera, cardClicked, emoji, cardParams, id}) {
  
  const paper = useTexture("./Watercolor_Paper_001_NORM.jpg")
  useTexture.preload("./Watercolor_Paper_001_NORM.jpg")
  const { nodes, materials } = useGLTF("/karta.glb");
  const rX = useMemo( ()=> Math.random(), [] )
  const rY = useMemo( ()=> Math.random(), [] )

  const basic = new MeshBasicMaterial
  basic.DoubleSide

  const { deck } = useSnapshot(state)
  let selectedCard = deck.find( e=> e.id === id)
  const grpRef = useRef()
  const mshRef = useRef()

  const htmlRef = useRef()

  
        useFrame( (state, delta)=>{
          easing.dampE (
            grpRef.current.rotation,
            deck.find( e=> e.id === id).rotation || [0,0,0],
            0.15,
            delta
          );
          easing.dampC (
            mshRef.current.material.color,
            selectedCard.color,
            0.2,
            delta
          );
          easing.damp3(
            grpRef.current.position,
            deck.find( e=> e.id === id).position,
            0.3,
            delta
          );
        } )

        return (<>
        <group
          scale={[0.4,0.4,0.01]}
          // starting postion -> swtich to the generated for each card
          position = {
            [ rX*10,
              -rY*20, 
              -rY*10
            ] }
          dispose ={null}
          ref     ={grpRef}
          onClick = {
            () => {
              cardClicked( id, emoji, grpRef.current );
              }
            }
          >
          <mesh
            
            ref = { mshRef }
            geometry={nodes.Back.geometry}
          >
            <meshStandardMaterial
              side={DoubleSide}
              metalness={0.8}
              roughness={0.4}
              normalMap={paper}
              bumpScale={2}
              bumpMap={paper}
            />
          </mesh>
          <mesh
            geometry={nodes.Border.geometry}
            material={materials["Material.001"]}
          ><meshStandardMaterial
            side={DoubleSide}
            metalness={1}
            roughness={0.2}
          /></mesh>
          <Html scale={3} 
                ref={htmlRef} wrapperClass="emoji" 
                position={[0,0.08,0.01]} 
                center occlude transform
          >
            {emoji}
          </Html>
        </group>
        </>)
      }

 