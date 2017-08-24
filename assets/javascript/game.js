var wordNum =0;
var numGuesses = 8;
var Wins = 0;
var Losses = 0;
var word;
var lettersChosen;

// Word bank, chosen from 'word of the day' in dictionary app

var wordBank =['AVATAR', 'LEMON', 'KUMQUAT', 'TACO', 'BANAUSIC', 'DAYMARE', 'KIBITZER', 'PALUDAL', 'NIMBUS', 'ERGATE', 'MUSIC', 'SANDWICH'];
var wordBank2 =[ 'FLOWER', 'POLEMIC', 'PALINDROME', 'MANGO', 'URCHIN', 'QUARK', 'PULSAR', 'BANK', 'EGGROLL'];

var begin = prompt("Press any key to begin");
    
//select the words in order, to avoid repetition
//determine the word length and write the correct # of blanks onscreen

for (var i = 0; i < wordBank.length; i++) {

  word = wordBank[i];   //new word
  console.log(word);

  lettersChosen = [];   //zero out string of guesses
  //var indexArray = [];      //zero out indices of correct guesses

 

  //initialize the solution display (all blanks)
  var displaySol= initBlanks(word);
  document.getElementById("incWord").innerHTML = displaySol;
 

    // have the player guess a letter
  document.getElementById("message1").innerHTML = 'Guess a letter: ';

  document.onkeyup = function(event) {        //this is where iterations begin --word and blanks are set already

  // Determines which letter was selected.
  var userLet = event.key;
    console.log(userLet);
  
  //store each guess into a new string for on-screen display of all guesses

  userLet = userLet.toUpperCase();    //all uppercase letters
  lettersChosen += userLet;   //append array for display

  wordSolution(word,displaySol,userLet)
  document.getElementById("incWord").innerHTML = displaySol;
   
  
  // Turn the word (string) into an array. loop through word to find all matches;
    for (j=0; j< word.length; j++){
      if (userLet== word[j]){
        indexArray += j.toString(); //concatenate indices of solved letters.
      }
        //  store locations of each match, if there is one or more matches.
        // (sort this array each time for simplicity?...)
        
        // OR... just count how many characters have been guessed and compare that count
        // to word.length.  I think this will be easier.  This won't protect them from guessin
        //the same letter twice, though.

        // if no matches, decrement 'guesses remaining' by one and prompt for another guess
      
    }
  

} //end of 'new letter' block


  // if all guesses have been used up before the word is solved, show answer, 
  // increment 'losses' by 1 and offer to start a new game.

  // if the entire word is solved before guesses have been used up, increment
  // 'wins' by 1 and set up a new word. (or prompt for another game)


}   // end of for loop - new word is chosen once I get to here


  // function for keeping stats updated

  function Stats( w,l,n){     
    document.getElementById("wintext").innerHTML = w;
    document.getElementById("losstext").innerHTML = l;
    document.getElementById("remtext").innerHTML = 3-n;
  }

  //function for updating display after each new word is selected
  function initBlanks(answer){
    var blanks = [];
    for (var index= 0; index < answer.length; index++){
        blanks.push = '_';
    }
    return blanks;
  }

//modify displayed solution if their guess is correct

  function wordSolution(answer,dispSol,currLetter) {
    
    for (var index=0; index < answer.length; index++){
      if(answer[index]==currLetter) {
        dispSol[index] = currLetter;
      }
    }
  }
  