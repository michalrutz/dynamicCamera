class SingleCard {
        constructor( id="", value="", selected=false, isAnimated=false ){
                this.id = id;
                this.value = value;
                this.selected = selected;
                this.isAnimated = isAnimated;
                this.rotation = [0,0,0]
        }
        setSelected(){
                this.selected = !this.selected
        }
        setAnimated(){
                this.isAnimated = !this.isAnimated
        }
        setRotation( rotation ) {
                this.rotation = rotation
        }
      }

export { SingleCard }