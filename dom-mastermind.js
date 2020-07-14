
let gameRow=0;
let arrayforSolution=['a','b','c','d'];
let arrayComputerPick =['a','b','c','d'];
let gameLength=0;
let arrayTotal=[0,0,0,0];
let arrayTemp;


const handleClick = (element) => {
    // check to see if the square clicked has anything in it, if not continue
    // this prevents an X being changed to an O

  if (gameRow==10){alert("Reset the board to play again")}
   const column= parseInt(element.id.charAt(2));
   const row=parseInt(element.id.charAt(0));
   if (column!=gameRow){document.getElementById("message-center").innerHTML=(`currently on gamemove column ${gameRow} make move on proper column`)
    
  }
   
   else {document.getElementById("message-center").innerHTML=element.id
    let colorMarker = document.getElementById("colors").value
    document.getElementById(element.id).style.background= colorMarker;
    placeMarker(row, colorMarker);


    }  
      
  }

  const placeMarker = (row,colorMarker) =>{
     
    if (colorMarker=="red"){arrayforSolution[row]="a"
        arrayTotal[row]=1;}
    if (colorMarker=="blue"){arrayforSolution[row]="b"
       arrayTotal[row]=1;}
    if (colorMarker=="yellow"){arrayforSolution[row]="c"
    arrayTotal[row]=1;}
    if (colorMarker=="green"){arrayforSolution[row]="d"
    arrayTotal[row]=1;}
    if (colorMarker=="orange"){arrayforSolution[row]="e"
    arrayTotal[row]=1;}
    if (colorMarker=="pink"){arrayforSolution[row]="f"
    arrayTotal[row]=1;}
    if (colorMarker=="black"){arrayforSolution[row]="g"
    arrayTotal[row]=1;}
    if (colorMarker=="purple"){arrayforSolution[row]="h"
    arrayTotal[row]=1;}
  }

  function myAddFunc(total, num) {
    return total + num;}


  const checkGuess = () => {

    if (gameRow>9){alert("Reset the board and try again");}

    gameMarkers=arrayTotal.reduce(myAddFunc);

    if (gameMarkers!=4){
        document.getElementById("message-center").innerHTML="NEED TO SELECT ALL 4 SPACES";
        return; }

    if (gameLength==0){

        solution=makeCode(4);
        arrayComputerPick=solution.split("");  

        for (let ii=0; ii<4; ii++){
         if (arrayComputerPick[ii]=='a'){
            document.getElementById("c-"+ii).style.background="red";
        }
         if (arrayComputerPick[ii]=='b'){
            document.getElementById("c-"+ii).style.background="blue";
        }
         if (arrayComputerPick[ii]=='c'){
            document.getElementById("c-"+ii).style.background="yellow";
        }
        if (arrayComputerPick[ii]=='d')     {
            document.getElementById("c-"+ii).style.background="green";
        }
        if (arrayComputerPick[ii]=='e')     {
          document.getElementById("c-"+ii).style.background="orange";
        }
        if (arrayComputerPick[ii]=='f')     {
          document.getElementById("c-"+ii).style.background="pink";
        }
        if (arrayComputerPick[ii]=='g')     {
          document.getElementById("c-"+ii).style.background="black";
        }
        if (arrayComputerPick[ii]=='h')     {
          document.getElementById("c-"+ii).style.background="purple";
        } 
    
          } }
    
     if (arrayComputerPick.join()==arrayforSolution.join()){
            alert("you won");
          gameRow=10;}
     generateHint()
     gameRow++;
     if (gameRow>9){alert("Reset the board and try again you have used all yours trys.  Click the Cheat button to reveal the code you were trying to find.");}
     arrayTotal=[0,0,0,0];
  }

  //random code generator for computer to pick
  function makeCode(length) {
    var result           = '';
    var characters       = 'abcdefgh';
    var charactersLength = characters.length;
    for ( var i = 0; i < length; i++ ) {
       result += characters.charAt(Math.floor(Math.random() * charactersLength));
    }
    return result;
 }
  
////generate Hint here
 const generateHint = () =>  {
  arrayTemp=Array.from(arrayComputerPick);
  arrayTempS=Array.from(arrayforSolution)
  let correctLetterLocations=0;
  let correctLetters=0;
  gameLength++;
  for (let i=0; i<4; i++)
  {if (arrayTemp[i]==arrayTempS[i]){
      correctLetterLocations++
      arrayTemp[i]=null;
      arrayTempS[i]="X";}            
  }
  console.log (arrayTempS +'  ' + arrayTemp)

  for (let numberof=0; numberof<correctLetterLocations;numberof++){
  document.getElementById('g'+numberof+'-'+gameRow).style.background= 'red';
  }
    

  for (let x=0; x<4; x++){
     
     let targetIndex=arrayTemp.indexOf(arrayTempS[x])     
     if (targetIndex!=-1){correctLetters++                 
    arrayTemp[targetIndex]=null;
  }

  }
  for (let numberof2=correctLetterLocations; numberof2<(correctLetterLocations+correctLetters);numberof2++){
    document.getElementById('g'+numberof2+'-'+gameRow).style.background= 'white';
    }  
  document.getElementById("message-center").innerHTML=(`You got ${correctLetterLocations} exact and ${correctLetters} others just not in the right spot`)
  return `${correctLetterLocations}-${correctLetters}`
}

const resetAll = ()=>{

  for (let i=0; i<4; i++){
       for(let z=0; z<10; z++){
        document.getElementById(i+"-"+z).style.background="lightgoldenrodyellow"
        document.getElementById('g'+i+"-"+z).style.background="lightgoldenrodyellow"
       }
      
  } 
  gameRow=0;
  gameLength=0;
  arrayTotal=[0,0,0,0];

}

const revealPick = () =>{
  document.getElementById("computerpicks").style.display = "block";
  setTimeout(function(){document.getElementById("computerpicks").style.display = "none";},3000);

}