class SingleCard {
        constructor( id="", value="", selected=false, isAnimated=false ){
                this.id = id;
                this.value = value;
                this.selected = selected;
                this.focused = false;
                this.isAnimated = isAnimated;
                this.rotation = [0,0,0];
                this.color = "orange";
        }
        setSelected(Boolean){
                this.selected = Boolean
        }
        setColor() {
                this.color = "gray"
        }
        setAnimated(){
                this.isAnimated = !this.isAnimated
        }
        setRotation( rotation ) {
                this.rotation = rotation
        }
      }

export { SingleCard }