function createColumn(x,y,state,index,isStable)
{
    this.x=x;
    this.y=y;
    this.state=state;
    this.fillColor='white';
    this.index=index;
    this.textColor='black';
    this.isStable=isStable;
    // this.isChecking=false;

    this.display=function()
    {
       stroke(0);
       strokeWeight(2);
       fill(this.fillColor);
       rect(this.x,this.y,unit,unit);
       noStroke()
       fill(this.textColor);
       textAlign(CENTER,CENTER)
       textSize(30)
       if(this.state!=0)
       text(`${this.state}`,this.x+(unit/2),this.y+(unit/2));

    }
    this.update=function()
    {
        this.x=Math.floor(this.index/9)*unit+unit+(this.index%27<9?2:0)+2;
        this.y=(this.index%9)*unit+unit+(this.index%3==0?2:0)+2;
        if(focusedColumn!=this.index&&!this.isChecking)
        this.fillColor='white';
        else if(focused)
        this.fillColor='gray';
        // else if(this.isChecking)
        // {
        //     this.fillColor='red';
        //     this.isChecking=false;
        // }
        else
        this.fillColor='white';
    }

    
}