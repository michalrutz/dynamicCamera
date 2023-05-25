import { useTexture } from "@react-three/drei"

export function Table() {
        const normal = useTexture("./Meat_Raw_001_basecolor.jpg");


        return <mesh
                castShadow receiveShadow
                position = {[ 0, 0, 0.6]}
                rotateX  = { Math.PI*2 }
                scale={0.5}

        >
                <boxGeometry args={[35,25,0.1]} />
                <meshStandardMaterial
                        map = {normal} roughness={1} color={"green"}
                />
        </mesh>
}