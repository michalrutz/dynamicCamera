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
import { Center } from "@react-three/drei";

//generate doubles
let emojis = emos.concat(emos);


function setXPostionInARow (i, cardsPerRow, width, gap ) {
  let singleSpace = width+gap
  let row = cardsPerRow+singleSpace
  let x = (width + singleSpace*i) - (row)*0.5
  return x 
}

export function Expereience() {

  const { pair} = useSnapshot(state)
  const { camera, viewport } = useThree()
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
        console.log("clicked")
      if( pair.length === 0 ){ //check if first or second card was selected
        selectedCard.setSelected(true)
        state.pair = state.pair.concat(selectedCard)
        animate (mesh, selectedCard)
      } else if (pair.length === 1 && pair[0].id !== id){
        selectedCard.setSelected(true)
        state.pair = state.pair.concat(selectedCard)
        animate (mesh, selectedCard)
        cardsSelected = 2
        //compare
        if (cardsSelected === 2) {
          setTimeout(() => {
            if (state.pair[0].value !== state.pair[1].value ){
              state.pair.forEach( (card, i) =>{
                animate( 0, card );
                card.setSelected(false)
              } )
            }else{
              state.pair.forEach( card =>{
                card.setColor("green")
              } )
            }
            state.pair=[]
          }, 1200 );
        } 
      }
    }
  }

  function animate (mesh, selectedCard ) {
    selectedCard.setAnimated() //set isAnimated to true
      changeRotationValue( mesh, selectedCard )
      selectedCard.setAnimated() //set isAnimated back to false
  }

  /*SHUFFLE ONCE IMMIDATELY AFTER THE LOADING*/
  useEffect( ()=> {
    emojis = shuffle(emojis);
    state.deck = generateCardsOfClass_from_( SingleCard, emojis )
  }, [])

  let cardParams = {
    width:0.9,
    height:1.4,
    gap: 0.1
  }
  
  let row = 0
  let cardsPerRow = 8
  let col = Math.floor( emojis.length / cardsPerRow )/2
  console.log(viewport)

  if (viewport.height > viewport.width){
    cardsPerRow = 4
  }

  if (viewport.width < 5) {
    cardParams.width = 0.9
    cardParams.height = 1
  }



  return (
    <>
      <ambientLight intensity={0.0}/>
      <spotLight color={"pink"}  intensity={0.5} position={[ 5, 0.2, -10]}  ref={rectRef} castShadow/>

      <Center>
       {state.deck.map( ( {id, value} ,i, a ) => {
          if ( i%cardsPerRow === 0 ) { row = row+1 }
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
        </Center>
        <Table />
    </>
  );
}


