class SingleCard {
        constructor( id="", value="", selected=false, isAnimated=false ){
                this.id = id;
                this.value = value;
                this.selected = selected;
                this.focused = false;
                this.isAnimated = isAnimated;
                this.rotation = [0, 0, 0];
                this.position = 
                        [ (Math.random()-0.5)*20,
                          -(Math.random())*10, 
                          0
                        ] ;
                this.color = "black";
        }
        setSelected(Boolean){
                this.selected = Boolean;
        }
        setColor(color) {
                this.color = color;
        }
        setAnimated(){
                this.isAnimated = !this.isAnimated
        }
        setRotation( rotation ) {
                this.rotation = rotation
        }
      }

export { SingleCard }