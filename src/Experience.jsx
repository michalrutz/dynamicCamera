import { useFrame, useThree } from "@react-three/fiber";
import { easing } from "maath";
import { useEffect, useRef, useState } from "react";
import { useSnapshot } from "valtio";
import { state } from "./store";
//COMPONENETS
import { Table } from "./Table";
import { Card } from "./Card";
import { SingleCard } from "./assets/classes";
import { emos } from "./assets/emojis";
import { changeRotationValue, findCardByID, generateCardsOfClass_from_, shuffle } from "./assets/functions";
import { cardParams , cardsPerRow } from "./assets/config"

//generate doubles
let emojis = emos.concat(emos);


function setXPostionInARow (i, cardsPerRow, width, gap ) {
  let singleSpace = width+gap
  let row = cardsPerRow+1*singleSpace
  let x = (width + singleSpace*i) - (row)*0.5
  return x 
}

export function Expereience() {

  const { pair} = useSnapshot(state)
  const { camera } = useThree()
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

  let cardsSelected = 0;
  /*CARDS*/
  function cardClicked ( id, emoji, mesh ) {
    //1.get the card
    let selectedCard = findCardByID( state.deck, id ) 
    //2. block click on rotation and check if the card is alredy selected
    if(
        selectedCard.isAnimated === false
      && selectedCard.selected === false ){ 
      if( pair.length === 0 ){ //check if first or second card was selected
        selectedCard.setSelected()
        state.pair = state.pair.concat(selectedCard)
        animate (mesh, selectedCard)
      } else if (pair.length === 1 && pair[0].id !== id){
        selectedCard.setSelected()
        state.pair = state.pair.concat(selectedCard)
        animate (mesh, selectedCard)
        cardsSelected = 2
        //compare
        if (cardsSelected === 2) {
          setTimeout(() => {
            if (state.pair[0].value !== state.pair[1].value ){
              state.pair.forEach( (card, i) =>{ animate( 0, card, i ); card.setSelected() } )
            }
            state.pair=[]
          }, 1200 );
        } 
      }
    }
  }

  function animate (mesh, selectedCard, i ) {
    selectedCard.setAnimated() //set isAnimated to true
      changeRotationValue( mesh, selectedCard )
      setTimeout(() => {
        selectedCard.setAnimated() //set isAnimated back to false
      }, 2000*i )
  }

  /*SHUFFLE ONCE IMMIDATELY AFTER THE LOADING*/
  useEffect( ()=> {
    emojis = shuffle(emojis);
    state.deck = generateCardsOfClass_from_( SingleCard, emojis )
  }, [])

  let row = 0
  let col = Math.floor( emojis.length / cardsPerRow )/2

  return (
    <>
      <ambientLight intensity={0.1}/>
      <spotLight color={"pink"}  intensity={0.5} position={[ 5, 0.2, -10]}  ref={rectRef} />
      <spotLight color={"red"}   intensity={0.5} position={[-5, 0.2, -5]}   ref={rectRef} />
      <spotLight color={"blue"}  intensity={0.5} position={[ 5, 0.2, -5]}   ref={rectRef} />

       {state.deck.map( ( {id, value} ,i, a ) => {
          if ( i%cardsPerRow === 0 & i!==0) { row = row+1 }
          {/*GENERATE CARDS*/}
            return (
              <Card
                key = {i}
                id = {id}
                moveCamera  = { changeCamXYZtoMeshXYZ }
                cardClicked = { cardClicked }
                cardParams  = { cardParams }
                position    = {[ 
                  setXPostionInARow( i, cardsPerRow, cardParams.width, cardParams.gap ) - row*cardsPerRow , 
                  col - (row*1.075* cardParams.height),  
                  0
                ]}
                color = {"orange"}
                emoji = { value }
              />)
        })}
        <Table />
    </>
  );
}


