let cnvs;
let unit=Math.floor(window.innerHeight/11);
const states={EMPTY:0,ONE:1,TWO:2,THREE:3,FOUR:4,FIVE:5,SIX:6,SEVEN:7,EIGHT:8,NINE:9};
let columns=[];
let generating=true;
let focused=false;
let focusedColumn;
let confirmation;
let solving=false;
let steps=[];
let columnToCalculate=0;
let redoing=false;
let error=false;
let testPassed=true;
let startTime;
let overAllTime=0;


function setup() {
	
	// alert('Right-click fields to edit the number in it\nPress BACKSPACE to delete the number you entered\nPress WASD or the arrow keys to move around easier in the grid\nThe solver will present you the first solution it computes\nIf you find any major bugs or issues, please contact me')
	cnvs=createCanvas(windowHeight, windowHeight);
	columns[0]=new createColumn(10,10,states.EMPTY);
	for(let i=0;i<81;i++)
	{
		columns[i]=new createColumn(Math.floor(i/9)*unit+unit+(this.i%27<9?2:0)+2,(i%9)*unit+unit+(i%3==0?2:0)+2,0,i,false)
	}
	frameRate(60);
}
function draw() {
myMillis=millis();
background(60);
cnvs.position(windowWidth/2-(windowHeight/2),0)
unit=Math.floor(windowHeight/11);
if(confirmation)
{
	startTime=millis();
	solving=true;
	confirmation=false;
	focused=false;
	let currentCycle;
	for(let i=0;i<81;i++)
	{
		if(columns[i].state==0)
		continue;
		else
		currentCycle=new doCycle(columns[i],true)
		currentCycle.checkAgainstRules();
	}
	if(!testPassed)
	{
		solving=false;
		error=true;
		alert('The sudoku you entered cannot be solved\nPlease reload the page and enter the correct sudoku')
	}
}

if(solving&&!error)
{
	for(let runs=0;runs<500;runs++)
	{redoing=false;
	while(!(columnToCalculate>80)&&columns[columnToCalculate].state!=states.EMPTY)
	{
		columnToCalculate++;
		if(columnToCalculate>80)
		{
			
			console.log((millis()-startTime)/1000)
			solving=false;
			columnToCalculate=0;
			break;
		}
	}
	
	for(let i=0;i<steps.length;i++)
	{
		
		if(steps[i].hasToRedo)
		{
			if(i==0&&steps[0].currentNumber==9)
			{
				solving=false;
				redoing=false;
				steps[0].hasToRedo=false;
				error=true;
				alert('The sudoku you entered cannot be solved\nPlease reload the page and enter the correct sudoku');
				break;
			}
			else{
			steps[i].hasToRedo=false;
			steps[i].redo();
			
			redoing=true;
			break;
		}
		}
		
	}if(!solving)
	break;
	if(solving&&!redoing)
	{
		steps.push(new doCycle(columns[columnToCalculate],false))
		steps[steps.length-1].checkAgainstRules();
	}}

}
for(let i=0;i<columns.length;i++)
	{
		columns[i].update();
		columns[i].display();
	}

}




function mouseClicked()
{
	if(mouseX>unit-2&&mouseY>unit-2&&mouseX<(unit*10-2)&&mouseY<(unit*10-2)&&!solving&&!error)
	{
		focused=true;
		focusedColumn=(Math.floor(((mouseY-unit)+(mouseY<(unit*4)?-2:mouseY>(unit*7)?2:0))/unit))+(Math.floor(((mouseX-unit)+(mouseX<(unit*4)?-2:mouseX>(unit*7)?2:0))/unit)*9);
	}
	else
	focused=false;
}

function keyPressed()
{
	if(keyCode==ENTER&&!solving&&!error)
	confirmation=confirm('Do you really want to proceed?\nYour computer will calculate the data you entered');

	if(keyCode==ENTER&&solving&&!error)
	alert('Your computer is already calculating the sudoku! \nPlease wait until it`s done')
	
	if(focused&&!solving)
	{
		switch(keyCode)
		{
			case 49:
				columns[focusedColumn].state=states.ONE;
				columns[focusedColumn].isStable=true;
				break;
			case 50:
				columns[focusedColumn].state=states.TWO;
				columns[focusedColumn].isStable=true;
				break;
			case 51:
				columns[focusedColumn].state=states.THREE;
				columns[focusedColumn].isStable=true;
				break;
			case 52:
				columns[focusedColumn].state=states.FOUR;
				columns[focusedColumn].isStable=true;
				break;
			case 53:
				columns[focusedColumn].state=states.FIVE;
				columns[focusedColumn].isStable=true;
				break;
			case 54:
				columns[focusedColumn].state=states.SIX;
				columns[focusedColumn].isStable=true;
				break;
			case 55:
				columns[focusedColumn].state=states.SEVEN;
				columns[focusedColumn].isStable=true;
				break;
			case 56:
				columns[focusedColumn].state=states.EIGHT;
				columns[focusedColumn].isStable=true;
				break;
			case 57:
				columns[focusedColumn].state=states.NINE;
				columns[focusedColumn].isStable=true;
				break;
			case BACKSPACE:
				columns[focusedColumn].state=states.EMPTY;
				break;
			case LEFT_ARROW:
				if(Math.floor(focusedColumn/9)-1>=0)
				focusedColumn-=9;
				break;
			case RIGHT_ARROW:
				if(Math.floor(focusedColumn/9)+1<=8)
				focusedColumn+=9;
				break;
			case UP_ARROW:
				if(focusedColumn%9-1>=0)
				focusedColumn-=1;
				break;
			case DOWN_ARROW:
				if(focusedColumn%9+1<=8)
				focusedColumn+=1;
				break;
			case 65:
				if(Math.floor(focusedColumn/9)-1>=0)
				focusedColumn-=9;
				break;
			case 68:
				if(Math.floor(focusedColumn/9)+1<=8)
				focusedColumn+=9;
				break;
			case 87:
				if(focusedColumn%9-1>=0)
				focusedColumn-=1;
				break;
			case 83:
				if(focusedColumn%9+1<=8)
				focusedColumn+=1;
				break;
			default:
				break;
		}
	}
}