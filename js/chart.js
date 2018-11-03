class Chart{
    constructor(element){
        this.el = element;
        this.ctx = this.el.getContext("2d");
        this.height = this.el.height;
        this.width = this.el.width;
        this.data = [];

        this.margin = 20;
        this.cutOffHeight = 40;
        this.valueSteps = 2;
    }

    add_data(data){
        var obj  = JSON.parse(data);
        this.data = obj.data;
        this.spacesX = this.data.length + 1;    
        this.cutOffStepsPx = this.cutOffHeight / 9;
        this.leftMargin = this.margin * 3;

        this.calc_highest_lowest()
    }

    init(){
        this.render()
    }

    calc_highest_lowest(){
        if(!this.data){ 
            console.log("data variable is empty!")
            return;
        }

        var first = true;

        for(let i = 0; i < this.data.length; i++){ 
            if(first == true){
                var highest = this.data[i].value;
                var lowest = this.data[i].value;
                first = false;
            } else {
                if(this.data[i].value > highest){
                    highest = this.data[i].value; 
                }
                if(this.data[i].value < lowest){
                    lowest = this.data[i].value;
                }
            }
        }

        this.highest = highest;
        this.lowest = lowest;

        this.spacesY = Math.floor((highest - lowest) / this.valueSteps) + 2;
        this.offsetY = Math.floor(lowest / 2) * 2;
        this.spacesYPx = (this.height - 2 * this.margin) / this.spacesY;
        this.spacesXPx = (this.width - this.leftMargin) / this.spacesX;
    }

    render(){

        this.ctx.moveTo(this.leftMargin, 0);
        this.ctx.lineTo(this.leftMargin, this.height - this.margin - this.cutOffHeight);
        for(let i = 0; i < 9; i++){
            if(i & 1){
            // ODD
            this.ctx.lineTo(this.leftMargin - 4, this.height - this.margin - this.cutOffHeight + (i + 1) * this.cutOffStepsPx);
            }
            else{
            // EVEN
            this.ctx.lineTo(this.leftMargin + 4, this.height - this.margin - this.cutOffHeight + (i + 1) * this.cutOffStepsPx);
            }
        }

        this.ctx.lineTo(this.width - this.margin, this.height - this.margin);
        this.ctx.stroke();

        //Grace the graph
        this.ctx.font = "12px Arial";

        for(let i = 1; i <= this.spacesY; i++){
            var invI = this.spacesY - i;
            this.ctx.strokeText(String(this.offsetY + invI * this.valueSteps), this.margin, this.margin + this.spacesYPx * (i - 1));
        }  
        
        for(let i = 1; i <= this.data.length; i++){ 
            console.log(this.data[i - 1].value);
            var x = this.leftMargin + i  * this.spacesXPx;
            var y = this.margin + ( (this.spacesYPx / this.valueSteps)  * (this.spacesY * this.valueSteps - (this.data[i - 1].value - this.offsetY + this.valueSteps) ) );
            console.log("x:" + x + " y:" + y);
            this.ctx.beginPath(); 
            this.ctx.arc( x, y, 4, 0, 2*Math.PI);
            this.ctx.stroke();
            this.ctx.strokeText(String(this.data[i-1].value), x + 10, y - 10);
        }


        

    }


}