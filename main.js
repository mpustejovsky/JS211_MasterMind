'use strict';

const assert = require('assert');
const readline = require('readline');
const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout
});

let board = [];
let letters = ['a', 'b', 'c', 'd', 'e', 'f', 'g', 'h'];
let solution = 'abcd'
let gameLength=0;
const printBoard = () =>  {
  for (let i = 0; i < board.length; i++) {
    console.log(board[i]);
  }
}
 const generateSolution = () =>  {makeCode(4)}
//   for (let i = 0; i < 4; i++) {
//     const randomIndex = getRandomInt(0, letters.length);
//     solution += letters[randomIndex];
//   }
// }

// const getRandomInt = (min, max) => {
//   return Math.floor(Math.random() * (max - min)) + min;
// }   used makeCode(instead)

function makeCode(length) {
  var result           = '';
  var characters       = 'abcdefgh';
  var charactersLength = characters.length;
  for ( var i = 0; i < length; i++ ) {
     result += characters.charAt(Math.floor(Math.random() * charactersLength));
  }
  return result;
}

const generateHint = (guess) =>  {
 
  let arrayGuess = guess.split("");
  let arraySolution=solution.split("");
  let correctLetterLocations=0;
  let correctLetters=0;
  gameLength++;
  for (let i=0; i<4; i++)
  {if (arrayGuess[i]==arraySolution[i]){
      correctLetterLocations++
      arraySolution[i]=null;
      arrayGuess[i]="X";
      }            
  }
  
  for (let x=0; x<4; x++){
     let targetIndex=arraySolution.indexOf(arrayGuess[x])
     if (targetIndex!=-1){correctLetters++
     arraySolution[targetIndex]=null;}

  }
 
  console.log("");
  console.log("");
  console.log("");
  console.log("BOARD BELOW")
  console.log(`You have ${correctLetterLocations} exact matchs and ${correctLetters} others not in the proper location`)
  console.log("You get 10 turns.  You just used your " + gameLength);
  let addedBoardInfo = board.pop()
  board.push(`${addedBoardInfo}  ${correctLetterLocations}-${correctLetters}`);
  
  return `${correctLetterLocations}-${correctLetters}`


 
 

}

const mastermind =(guess) =>{
  
 if (gameLength==0){solution=makeCode(4)
                     console.log(`If you want to cheat the code is ${solution}`)}

 if (guess.length>4||guess.length<4){
     console.log ("You must enter exactly 4 letters.  You entered " + guess.length)
     return
 }

  
   for (let zz=0; zz<4; zz++){
  
   
       if (!letters.includes(guess[zz])){
           console.log (`Only a, b, c, d, e, f, g, or h may be used.  You entered a ${guess[zz]}`);
           return;
       }
   }
   
   board.push(guess);


     if (guess==solution){
         console.log('You guessed it and are the winner!!!!!!!!!!!!!!!!!');
         console.log("A NEW GAME WILL START");
         gameLength=0;
         board = [];
         return 'You guessed it!';
     }
     else {
         if (gameLength<9){
         generateHint(guess);
         return 'wrong try again';}
         else {console.log ("You are out of guesses.  A new game will re-start.  The winning solution was "+solution)
               gameLength=0;
               board = [];
               return 'Big Losser'}
     }

}


const getPrompt = () =>  {
  rl.question('guess: ', (guess) => {
    mastermind(guess);
    printBoard();
    getPrompt();
  });
}

// Tests

if (typeof describe === 'function') {
  solution = 'abcd';
  describe('#mastermind()', () => {
    it('should register a guess and generate hints', () => {
      mastermind('aabb');
      assert.equal(board.length, 1);
    });
    it('should be able to detect a win', () => {
      assert.equal(mastermind(solution), 'You guessed it!');
    });
  });

  describe('#generateHint()', () => {
    it('should generate hints', () => {
      solution = 'abcd';
      gameLength=1;
      assert.equal(generateHint('abdc'), '2-2');
    });
    it('should generate hints if solution has duplicates', () => {
      solution = 'abcd';
      gameLength=1;
      assert.equal(generateHint('aabb'), '1-1');
    });

  });

} else {

  generateSolution();
  getPrompt();
}