var wordNum =0;
var numGuesses = 0;
var numMisses = 0;
var Wins = 0;
var Losses = 0;
var word;
var lettersChosen;
var displaySol;

// Word bank, chosen from 'word of the day' in dictionary app

var wordBank =['AVATAR', 'LEMON', 'KUMQUAT', 'TACO', 'BANAUSIC', 'DAYMARE', 'KIBITZER', 'PALUDAL', 'NIMBUS', 'ERGATE', 'MUSIC', 'SANDWICH'];
var wordBank2 =[ 'FLOWER', 'POLEMIC', 'PALINDROME', 'MANGO', 'URCHIN', 'QUARK', 'PULSAR', 'BANK', 'EGGROLL'];


var begin = prompt("Press any letter to begin guessing");
    
 // have the player guess a letter
document.getElementById("message1").innerHTML = 'Guess a letter: ';
    
document.onkeyup = function(event) {        //this is where iterations begin --word and blanks are set already

  if(numGuesses == 0) {   //if we are starting a new round
    word = ranWord();     //select a new word
    lettersChosen = [];   //zero out string of guesses
     //initialize the solution display (all blanks)
    displaySol= initBlanks(word);     //set up an array of the correct # of blanks
    console.log
    document.getElementById("incWord").innerHTML = displaySol;  //display the blanks
  }


  // Determines which letter was selected.
    var userLet = event.key;
    console.log(userLet);
  
  //store each guess into a new string for on-screen display of all guesses

  userLet = userLet.toUpperCase();    //all uppercase letters
  lettersChosen.push(userLet)   //append array for display
  console.log(lettersChosen);
    
    match = false;   // set to false until proven otherwise

// reset the displayed partial word to include correctly guessed letters.  If none, count as a miss

    for (var j=0; j < word.length; j++){      //this area has troubles.  Was a function, didn't work.  Try here.
      if(word[j]==userLet) {
        console.log(displaySol[j]);
        displaySol[j] = userLet;
        match = true;
      }
    }
    console.log(displaySol);

    //count misses and determine if game is over
    if (match == false) {   //if not in word, increment misses up to max value of 10
      numMisses += 1;
    if (numMisses == 10) {
       document.getElementById("message1").innerHTML = 'Game Over';
     }
   }

   numGuesses +=1;
  
  //keep stats current

  Stats(10-numMisses, lettersChosen, displaySol,Wins,Losses);
  
  
  
  // if the entire word is solved before guesses have been used up, increment
  // 'wins' by 1 and set up a new word. (or prompt for another game)
    if (isSolved() == true){
      document.getElementById("message1").innerHTML = 'Congratulations!  You win!';
      document.getElementById("message2").innerHTML = 'Start a new word?';
      numMisses = 0;
      numGuesses = 0;
      lettersChosen = []; 
      Wins += 1;
    }
// if all guesses have been used up before the word is solved, show answer, 
  // increment 'losses' by 1 and offer to start a new game.

  
  
    if(numMisses == 10){
       document.getElementById("message1").innerHTML = 'No more guesses! Your word was: ' + word;
       document.getElementById("message2").innerHTML = 'Start a new word?';
       numMisses = 0;
       numGuesses = 0;
       lettersChosen = []; 
       Losses += 1;  
    }
  
  //update display

  document.getElementById("incWord").innerHTML = displaySol;
  
  //keep stats current

  Stats(10-numMisses, lettersChosen, displaySol,Wins,Losses);


  
}   // end of new letter function

//-------------------------begin function definitions------------------------------------
  // function for keeping stats updated

  function Stats( m,letters,inc,w,l){     
    document.getElementById("misses").innerHTML = m;
    document.getElementById("letterslist").innerHTML = letters;
    document.getElementById("incWord").innerHTML = inc;
    document.getElementById("wins").innerHTML = w;
    document.getElementById("losses").innerHTML = l;
  }

  function ranWord(){
    randomWord = wordBank[Math.floor(Math.random()*wordBank.length)] ;   //new randomly selected word
    console.log(randomWord);
  return randomWord;
 }


  //function for updating display after each new word is selected
  function initBlanks(answer){
    var blanks = [];
    for (var index= 0; index < answer.length; index++){
        blanks.push('_');
    }
    return blanks;
  }

  //function for checking if word is completely solved
   function isSolved(){
     complete = true;
     for(var k =0; k < word.length; k++){
        if (word[k] != displaySol[k]) {
          complete = false;
        }
     }
     return complete;
   }
