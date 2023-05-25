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
                        this.color = "gray";
                }
                setSelected(Boolean){
                        this.selected = Boolean;
                }
                setColor() {
                        this.color = "rgb(0,100,0)";
                }
                setAnimated(){
                        this.isAnimated = !this.isAnimated
                }
                setRotation( rotation ) {
                        this.rotation = rotation
                }
        }

        export { SingleCard }