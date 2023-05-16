const shuffle = function (array) {
        if(!array){
          console.log("provide an array to shuffle!")
        }
        else{
          let schuffled = [];
          let unschuffled = array;
          let numOfCards = unschuffled.length;
          //1 losowa liczba -> max aktualna wielkosc grupy
          //2 dodaj karte do losowyhc -> usun karte z nielosowych
          for (let i = 0; i < numOfCards; i++) {
            let randomIndex = Math.floor(Math.random()*unschuffled.length);
      
            schuffled.push( unschuffled[randomIndex] )
            unschuffled.splice(randomIndex,1)
          }
          return schuffled
        }
      }


const generateCardsOfClass_from_ = function ( bluePrint , array ) {
        let cards = [];
        for (let i = 0; i < array.length; i++) {
          cards.push( new bluePrint ( "cart_"+i, array[i], false ) )
        }
        return cards
    }

const findCardByID = function  ( array, id ) {
      return array.find( e => e.id === id)
    }

const changeRotationValue = function ( mesh=0, card , rotation=1 ) {
      let y = card.rotation[1] - Math.PI*rotation;
      card.rotation = [0, y ,0]
    }

const changePositionZ = function ( mesh=0, card , rotation=1 ) {
      let y = card.rotation[1] - 1;
      card.rotation = [0, y ,0]
  }

export { shuffle, generateCardsOfClass_from_, findCardByID, changeRotationValue }