class SingleCard {
        constructor( id="", value="", selected=false, isAnimated=false ){
                this.id = id;
                this.value = value;
                this.selected = selected;
                this.focused = false;
                this.isAnimated = isAnimated;
                this.rotation = [0, 0, 0];
                this.position;
                this.color = "white";
        }
        setSelected(Boolean){
                this.selected = Boolean
        }
        setColor() {
                this.color = "GreenYellow"
        }
        setAnimated(){
                this.isAnimated = !this.isAnimated
        }
        setRotation( rotation ) {
                this.rotation = rotation
        }
      }

export { SingleCard }