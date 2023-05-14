import { useFrame, useThree } from "@react-three/fiber";
import { easing } from "maath";
import { useEffect, useRef, useState } from "react";

export function Expereience() {
  const { camera, viewport } = useThree()
  const { width, height } = viewport;

  const [ newCameraPosition, cameraSetPosition ] = useState(camera.position)


  function changeCamXYZtoMeshXYZ (mesh) {
    // Focus the camera on the mesh
    cameraSetPosition( [mesh.position.x, mesh.position.y, (mesh.position.z)-5] );
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

  return (
    <>
      <Object1 handleClick = { changeCamXYZtoMeshXYZ } position = {[width/4+1, 1, 0]} color={"red"}/>
      <Object1 handleClick = { changeCamXYZtoMeshXYZ } position = {[width/4, height/4,-2]} color={"green"}/>
      <Object1 handleClick = { changeCamXYZtoMeshXYZ } position = {[width/4+2,1,-4]} color={"blue"}/>
    </>
  );
}

function Object1 ({handleClick, position, color}) {

  const meshRef = useRef()
  const [ newRotation, setRotation ] = useState( [10,0,0] )

  function rotateMesh (mesh) {
    setRotation( [mesh.rotation.x+10, 0, 0] )
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
    <mesh
      position    = {position}
      ref         = {meshRef}
      onClick     = { () => {
        handleClick(meshRef.current);
        rotateMesh(meshRef.current) }
      }
    >
        <boxGeometry />
        <meshBasicMaterial color={color} />
      </mesh>
  )
}
