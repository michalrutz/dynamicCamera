import { useSnapshot } from "valtio"
import { state } from "./store"
import { useThree } from "@react-three/fiber"
import { useEffect, useState } from "react"
import { ImSpinner11 } from "react-icons/im";


export default function Overlay() {
  const { count } = useSnapshot(state)
  const difficulties = [ { name:"easy",difficulty:6 }, { name:"medium",difficulty:8 }, { name:"hard",difficulty:12 } ] 

  const [isVisible, setIsVisible] = useState(false);

  function setVisibility( setter ) {
    if (window.innerHeight > window.innerWidth){
      setter(false)
    } else {
      setter(true)
    }
  }

  useEffect( ()=>{
      setVisibility( setIsVisible )
  }, [])
  window.addEventListener("resize", (event) => {
    setVisibility( setIsVisible )
  });

  return (
    <div className="container">
      { isVisible ?  <h1  className="title">LET'S PLAY!</h1> : "" }

      <div id="intro">  
        <h1 id="count" >{count}</h1>
      </div>
      <nav>
        <button id="reset" onClick={ () => {window.location.reload()} }>
        <ImSpinner11 size={"30px"}/>
        </button>
      </nav>
    </div>
  )
}
