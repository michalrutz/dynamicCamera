import { useTexture } from "@react-three/drei"




export function Table() {
        const normal = useTexture("./Fabric_Lace_025_normal.jpg")

        return <mesh
                castShadow receiveShadow
                position = {[ 0, 0, 0.6]}
                rotateX  = { Math.PI*2 }
                scale={2}
        >
                <boxGeometry args={[10,10,0.1]} />
                <meshStandardMaterial color={"purple"}
                        normalMap={normal}
                        bumpMap={normal}
                        bumpScale={100}
                        roughnessMap={normal}
                />
        </mesh>
}