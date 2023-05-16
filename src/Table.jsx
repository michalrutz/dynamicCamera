export function Table() {
        return <mesh
                position = {[ 0, 0, 0.5]}
                rotateX  = { Math.PI*2 }
        >
                <boxGeometry args={[10,10,0.1]} />
                <meshStandardMaterial color={"purple"} />
        </mesh>
}