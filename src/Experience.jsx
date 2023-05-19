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
import { Group, Box3 } from "three";

//generate doubles


//diffculty 6 8 12

function setXposOfaCard (i, cardsPerRow, width, gap ) {
  let singleSpace = width+gap
  let row = cardsPerRow*singleSpace;
  let index = i

  let x = (width + singleSpace*i)
  while ( index>cardsPerRow-1 ) {
    x = x - row 
    index = index-cardsPerRow
  }
  return x
}

export function Expereience() {

  const { pair, count, deck } = useSnapshot(state)
  const { camera, viewport } = useThree()
  const [ newCameraPosition, cameraSetPosition ] = useState(camera.position)
  const rectRef = useRef()
  let emojis = emos.concat(emos)

  //emojis = emos.splice( 0, difficulty )

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

  /*CARDS*/
  function cardClicked ( id, emoji, mesh ) {
    //1.get the card
    let selectedCard = findCardByID( state.deck, id ) 
    //2. block click on rotation and check if the card is alredy selected
    if( 
      selectedCard.isAnimated === false && selectedCard.selected === false ){
      state.count += 1
      if( 
        pair.length === 0 ){ //check if first or second card was selected
        selectedCard.setSelected(true)
        state.pair = state.pair.concat(selectedCard)
        animate (mesh, selectedCard)
        state.deck[ deck.findIndex( (e)=> e.id === id) ].position[2] = -0.2;
      } else if (pair.length === 1 && pair[0].id !== id){
        selectedCard.setSelected(true)
        state.pair = state.pair.concat(selectedCard) //second card added
        animate (mesh, selectedCard)
        state.deck[
          deck.findIndex( (e)=> e.id === id) ]
            .position[2] = -0.3;
        {
          setTimeout(() => {
            if (state.pair[0].value !== state.pair[1].value ){
              state.pair.forEach( (card, i) =>{
                animate( 0, card );
                card.position[2] = 0.2;
                card.setSelected(false)
              } )
            }else{
              state.pair.forEach( card =>{
                card.setColor("black");
                card.position[2] = 0.2;
              } ) 
            }
            state.pair=[]
          }, 1100 );
        } 
      }
    }
  }

  function animate (mesh, selectedCard ) {
    selectedCard.setAnimated() //set isAnimated to true
      changeRotationValue( mesh, selectedCard )
      selectedCard.setAnimated() //set isAnimated back to false
      console.log(selectedCard.position)
  }


  /*SHUFFLE ONCE IMMIDATELY AFTER THE LOADING*/
  useEffect( ()=> {
    state.deck =
      generateCardsOfClass_from_(
        SingleCard,
        shuffle(shuffle(emojis)) );
  }, [])

  useEffect( ()=> {
    for (let i = 0; i < state.deck.length; i++) {
      if ( i%cardsPerRow === 0 ) { row = row+1 }
      state.deck[i].position = [ 
        setXposOfaCard( i, cardsPerRow, cardParams.width, cardParams.gap ), 
        col - (row*1.075* cardParams.height),  
        0.2
      ]
    } 
  },[viewport])  

  let cardParams = {
    width: 0.9,
    height:1.07,
    gap: 0.05
  }
  
  let row = 0
  let cardsPerRow = 6

  let col = Math.floor( emojis.length / cardsPerRow )/2

  
  if (viewport.height > viewport.width){ cardsPerRow = 4, camera.position.z = -15 }
  else if( emojis.length == 6*2 ){ cardsPerRow = 3 }
  else if( emojis.length == 12*2 ){ cardsPerRow = 8 }
  


  return (  
    <>
      <ambientLight intensity={0.1}/>

      <spotLight color={"pink"}   intensity={0.8} position={[ 0, 1, -9]}  ref={rectRef} castShadow/>
      <spotLight color={"red"}  intensity={0.2} position={[ 1, 1, -20]}   castShadow/>

      <group position={[
        -(cardsPerRow+0.7)/2, 
        viewport.height > viewport.width ? col+0.5 : col-1.5  ,
        0
      ]}>
       {state.deck.map( ( {id, value, position} ,i, a ) => {
          
          {/*GENERATE CARDS*/}
            return (
              <Card
                key = {i}
                id = {id}
                moveCamera  = { changeCamXYZtoMeshXYZ }
                cardClicked = { cardClicked }
                cardParams  = { cardParams }
                position    = { position }
                color = {"orange"}
                emoji = { value }
              />)
        })}
        </group>
        <Table />
    </>
  );
}


