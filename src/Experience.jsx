import { useFrame, useThree } from "@react-three/fiber";
import { easing } from "maath";
import { useEffect, useRef, useState } from "react";

export function Expereience() {
  const { camera } = useThree()
  const meshRef = useRef()

  const [ newCameraPosition, cameraSetPosition ] = useState(camera.position)

  function handleClick (mesh) {
    // Focus the camera on the mesh
    cameraSetPosition( [mesh.position.x, mesh.position.y, (mesh.position.z)-5] ) 
  };

  useFrame(
    (state, delta) => { 
      easing.damp3(
        camera.position,
        newCameraPosition,
        0.3,
        delta
      )
    }
  )

  return (
    <>
      <Object1 handleClick = { handleClick } position = {[2,1, 0]} color={"red"}/>
      <Object1 handleClick = { handleClick } position = {[3,2,-2]} color={"green"}/>
      <Object1 handleClick = { handleClick } position = {[0,1,-4]} color={"blue"}/>
    </>
  );
}

function Object1 ({handleClick, position, color}) {
  const meshRef = useRef()

  return (
    <mesh
      position = {position}
      ref={meshRef}
      onClick={ () => { handleClick(meshRef.current)} } >
        <boxGeometry />
        <meshBasicMaterial color={color} />
      </mesh>
  )
}
