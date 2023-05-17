import { state } from "./store"

export default function Overlay() {
  const difficulties = [ { name:"easy",difficulty:6 }, { name:"medium",difficulty:8 }, { name:"hard",difficulty:12 } ] 

  return (
    <div className="container">
      <div id="intro">
        <h1>LET'S PLAY!</h1>
        <nav>
          <button id="reset" onClick={ ()=> window.location.reload() }>
            restart
          </button>
          {/*{difficulties.map( (e)=> (
            <button key={e.name} className="difficulty" onClick={ () => { 
              state.difficulty = e.difficulty;
              console.log(e.difficulty)  
            } }>
              {e.name}
          </button>
            ))}*/}
        </nav>
      </div>
    </div>
  )
}
