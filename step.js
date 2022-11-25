function doCycle(column,tester)
{
    this.column=column;
    this.currentNumber=1;
    this.hasToRedo=false;
    this.isTester=tester;
    if(this.isTester)
    this.currentNumber=this.column.state;

    if(!this.isTester)
    {
        columns[this.column.index].state=this.currentNumber;
        columns[this.column.index].textColor='blue';
    }

    this.redo=function()
    {
        if(this.currentNumber!=9)
        {
            this.currentNumber++;
            columns[this.column.index].state=this.currentNumber;
            this.checkAgainstRules();
        }
        else
        {
            columns[this.column.index].state=states.EMPTY;
            steps[steps.length-2].hasToRedo=true;
            this.delete();
        }
    }
    this.checkAgainstRules=function()
    {
        for(let x=1;x<9;x++)
        {
            // columns[((this.column.index)+(x*9))%81].isChecking=true;
            if(columns[((this.column.index)+(x*9))%81].state==this.currentNumber/* &&x!=Math.floor(this.column.index/9) */)
               {
                   if(!this.isTester)
                   this.hasToRedo=true;
                   else
                   testPassed=false;
                   
                   break;
               } 
        }
        for(let y=1;y<9;y++)
        {
            // columns[(this.column.index+y)-(Math.floor((this.column.index+y)/9-(Math.floor((this.column.index)/9)))*9)].isChecking=true;
            if(columns[((this.column.index+y)-(Math.floor((this.column.index+y)/9-(Math.floor((this.column.index)/9)))*9))%81].state==this.currentNumber/*&&y!=this.column.index%9*/)
            {
                if(!this.isTester)
                   this.hasToRedo=true;
                   else
                   testPassed=false;
                break;
            } 
        }
        for(let i=0;i<9;i++)
        {
            let areaX=Math.floor(this.column.index/27);
            let areaY=Math.floor((this.column.index%9)/3);

            // columns[areaY*3+areaX*27+(Math.floor(i/3))*6+i].isChecking=true;
            // columns[this.column.index].isChecking=false;
            if(columns[areaY*3+areaX*27+(Math.floor(i/3))*6+i].state==this.currentNumber&&areaY*3+areaX*27+(Math.floor(i/3))*6+i!=this.column.index)
            {
                if(!this.isTester)
                   this.hasToRedo=true;
                   else
                   testPassed=false;
                break;
            }

        }
    }
    this.delete=function()
    {
        steps.pop();
        do
        {
            columnToCalculate--;
        }
        while(columns[columnToCalculate].isStable)
        
    }

}