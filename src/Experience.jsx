import { ContactShadows, Html } from "@react-three/drei";
import { useFrame, useThree } from "@react-three/fiber";
import { easing } from "maath";
import { useEffect, useRef, useState } from "react";
import { DoubleSide } from "three";


const card = {
  width:0.9,
  height:1.4
}

export function Expereience() {
  const { camera, viewport } = useThree()
  const { width, height } = viewport;

  const [ newCameraPosition, cameraSetPosition ] = useState(camera.position)
  const rectRef = useRef();

  function changeCamXYZtoMeshXYZ (mesh) {
    // Focus the camera on the mesh
    cameraSetPosition( [0, mesh.position.y*0.2, (mesh.position.z)-15] );
  };

  useFrame(
    (state, delta) => { 
      easing.damp3(
        camera.position,
        newCameraPosition,
        0.3,
        delta
      );
    }
  )

  useEffect( ()=> { rectRef.current.lookAt([0,0.5,0]) }, [])

  const emojis = ["🏀","⚽", "🏐","🍍","🍉","🍈","💀","🧠", "🎸","🧭","🚀", "🏀","⚽", "🏐","🍍","🍉","🍈","💀","🧠", "🎸","🧭","🚀","💡","💡"];
  const cardsPerRow = 8;

  function xPos (index, cardsPerRow, gap ) {
    let x = (card.width + index) - (cardsPerRow+1*card.width+gap)*0.5
    return x 
  }
  function yPos (params) {
    let y = (card.height + index) - (cardsPerRow+1*card.width+gap)*0.5
    return y 
  }

  let row = 0
  let col = Math.floor( emojis.length / cardsPerRow )/2
  console.log(row)

  return (
    <>
      <ambientLight intensity={0.1}/>
      <spotLight color={"pink"}  intensity={0.5} position={[ 5, 0.2, -10]} ref={rectRef} />
      <spotLight color={"red"}   intensity={0.5} position={[-5, 0.2, -5]} ref={rectRef} />
      <spotLight color={"blue"}  intensity={0.5} position={[ 5, 0.2, -5]} ref={rectRef} />

       {emojis.map( (e,i,a) => {
          if (i%cardsPerRow===0 & i!==0){ row = row+1 } 
          return <Object1
            handleClick = { changeCamXYZtoMeshXYZ }
            position = {[ 
              xPos(i, cardsPerRow, 0.1) - row*cardsPerRow , 
              col - (row*1.075* card.height),  
              0
            ]}
            color = {"orange"}
            emoji = { e }
          />
        })}


      <mesh
        position = {[ 0, 0, 0.5]}
        rotateX={Math.PI*2}
      >
        <boxGeometry args={[10,10,0.1]} />
        <meshStandardMaterial color={"purple"} roughness={0.5}/>
      </mesh>
    </>
  );
}

function Object1 ({handleClick, position, color, emoji}) {

  const meshRef = useRef()
  const [ newRotation, setRotation ] = useState( [0,0,0] )
  const [ isActive, setIsActive ] = useState( false )

  function rotateMesh (mesh) {
    let x = mesh.rotation.x-Math.PI;
    let y = mesh.rotation.y-Math.PI;
    let z = mesh.rotation.z-Math.PI;
    setRotation( [0, y, 0] )   
  }

  useFrame( (s, d)=>{
    easing.dampE (
      meshRef.current.rotation,
      newRotation,
      0.3,
      d
    )
  } )


  return (
    <>
    <mesh
      castShadow
      recieveShadow
      position    = {position}
      ref         = {meshRef}
      onClick     = { (event) => { event.stopPropagation( )
        if (!isActive){
          setIsActive(true)
          handleClick(meshRef.current);
          rotateMesh(meshRef.current);
          setTimeout(() => {
            setIsActive(false)
          }, 1200 )
        }

      }
      }
    >
        <boxGeometry args={[card.width,card.height, 0.05]} />
        <meshStandardMaterial
          color={color}
          side={DoubleSide}
          roughness={0.4}
          metalness={0.5}
          
        />
        <Html 
          center occlude transform wrapperClass="emoji"
          position={[0,0,0.2]}

        >
          {emoji}
        </Html>
      </mesh>
      </>
  )
}
