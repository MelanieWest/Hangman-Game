var wordNum = 0;
var numGuesses = 0;
var numMisses = 0;
var Wins = 0;
var Losses = 0;
var word = '';
var lettersChosen = [];
var displaySol = [];
var solutionShow = '';

// Word bank, chosen from 'word of the day' in dictionary app
// word banks for life and science have been added for future options (not yet used)

var wordBank = ['FUNSTER', 'GRAVID', 'COMSTOCKERY', 'THEINE', 'CONFABULATE', 'ULULATE', 'ICONOCLASTIC',
  'ARVO', 'VENTIFACT', 'PALINDROME', 'POLEMIC', 'KUMQUAT', 'TACO', 'BANAUSIC', 'DAYMARE',
  'KIBITZER', 'PALUDAL', 'NIMBUS', 'ERGATE', 'MUSSITATION', 'FRUCTIFY', 'CONSUETUDE', 'INCOGNITANT',
  'DORP', 'ANOESIS', 'VARIEGATED', 'BALLON', 'BUMFUZZLE', 'AUTARKY', 'LITOTES', 'HIGHFALUTIN'];
var wordLife = ['FLOWER', 'MANGO', 'URCHIN', 'EXERCISE', 'DIET', 'EAT', 'REPRODUCE', 'BREATHE', 'ANGEL', 'DEMON',
  'EGGROLL', 'LEMON', 'AVATAR', 'TACO', 'MUSIC', 'SANDWICH', 'COMPLEX', 'LOVE', 'EPIPHANY', 'NEMESIS'];
var wordSci = ['QUARK', 'PULSAR', 'CUMULUS', 'PHASE', 'FUNCTION', 'SINGULARITY', 'STATE',
  'GRAVITY', 'ENERGY', 'FUNDAMENTAL', 'LAWS', 'PROPERTIES', 'CONDENSE', 'ESSENCE', 'WAVES'];
var wordEasy = ['APPLE', 'PUPPY', 'KITTEN', 'HOUSE', 'SOCCER', 'LUNCH', 'BASEBALL', 'GAME'];


//Topic buttons start the game and select the word bank; they reset the word and guess count

$(".btn").on("click", function () { // initialize word and stats with a topic button

  switch (this.id) {    //choose a random word from the selected word bank
    case "day":
      word = ranWord(wordBank);
      document.getElementById("message1").innerHTML = 'Word of the Day';      
      break;
    case "life":
      word = ranWord(wordLife);
      document.getElementById("message1").innerHTML = 'Life';
      break;
    case "sci":
      word = ranWord(wordSci);
      document.getElementById("message1").innerHTML = 'Science';
      break;
    case "easy":
      word = ranWord(wordEasy);
      document.getElementById("message1").innerHTML = 'Easy';
      break;
  }

  // attempting to hide buttons and rules - not working yet
  document.getElementById("rules").style.visibility="hidden";
  document.getElementById("options").style.visibility="hidden";

  lettersChosen = [];   //zero out string of guesses
  numMisses = 0;

  //initialize the solution display (all blanks)
  displaySol = initBlanks(word);     //set up an array of the correct # of blanks

  //make text display better than an array list (without commas and with spaces)
  solutionShow = printToDocument(displaySol);
  lettersShow = printToDocument(lettersChosen);

  //keep stats current
  Stats(10 - numMisses, lettersShow, solutionShow, Wins, Losses);

});     //end of 'start' button block




// this next block executes until the word is completed or guesses are used up

document.onkeyup = function (event) {        //this is where iterations begin --word and blanks are set already

  // Determines which letter was selected.
  var userLet = event.key;
  console.log(userLet);

  var check = isLetter(userLet);   //check if the input is a letter

  console.log(check);     //return without action if not a letter
  if(!check){
    alert("Please enter a letter");
    return;
  }


userLet = userLet.toUpperCase();    //all uppercase letters
  for(var k=0; k<lettersChosen.length; k++){
  if(userLet==lettersChosen[k]){
    alert("You have already guessed "+ userLet);
    return;
  }
}
 
  //store each guess into a new string for on-screen display of all guesses

  lettersChosen.push(userLet)   //append array of all guesses for display

  match = false;   // set to false until proven otherwise

  // reset the displayed partial word to include correctly guessed letters.  If none, count as a miss
  
  for (var j = 0; j < word.length; j++) {
    if (word[j] == userLet) {
      displaySol[j] = userLet;
      match = true;
    }
  }


  numGuesses += 1;   // increment before stats are displayed


  // if the entire word is solved before guesses have been used up, increment
  // 'wins' by 1 

  if (isSolved(word, displaySol) == true) {
    document.getElementById("message1").innerHTML = 'Congratulations!  You win!';
    numMisses = 0;
    numGuesses = 0;
    lettersChosen = [];
    Wins += 1;
    document.getElementById("rules").style.visibility="visible";
    document.getElementById("options").style.visibility="visible";
  }

  // if all guesses have been used up before the word is solved, show answer, 
  // increment 'losses' by 1 

  //otherwise, just increment the count for 'misses'

  if (match == false) {   //if not in word, increment misses up to max value of 10
    numMisses += 1;
    if (numMisses == 10) {
      document.getElementById("message1").innerHTML = 'No more guesses! Your word was: ' + word;
      numGuesses = 0;
      lettersChosen = [];
      Losses += 1;
      document.getElementById("rules").style.visibility="visible";
      document.getElementById("options").style.visibility="visible";  
    }
  }

 // display the partial word after update

  document.getElementById("incWord").innerHTML = displaySol;

  // make answer display better (without commas)
  solutionShow = printToDocument(displaySol);
  lettersShow = printToDocument(lettersChosen);

  //keep stats current
  Stats(10 - numMisses, lettersShow, solutionShow, Wins, Losses);


}   // end of new letter function

//-------------------------begin function definitions------------------------------------
// function for keeping stats updated

function Stats(m, letters, inc, w, l) {
  document.getElementById("misses").innerHTML ="R:  "+m;
  document.getElementById("letterslist").innerHTML = letters;
  document.getElementById("incWord").innerHTML = inc;
  document.getElementById("wins").innerHTML = "W: "+w;
  document.getElementById("losses").innerHTML ="L: "+ l;
}

function ranWord(wordArray) {
  randomWord = wordArray[Math.floor(Math.random() * wordArray.length)];   //new randomly selected word
  console.log(randomWord);
  return randomWord;
}


//function for updating display after each new word is selected.  Only include blanks in the
// array, and not the spaces between.  That way when a correct letter is chosen, only the blank
//needs to be replaced

function initBlanks(answer) {
  var blanks = [];
  for (var index = 0; index < answer.length; index++) {
    blanks.push('_');
  }
  return blanks;
}

// this function is purely for display.  spaces are put between the blanks so they are distinct.

function printToDocument(d) {
  printDoctoString = d.join(' ');
  // var printDoc = '';
  // for(var i = 0; i< d.length; i++) {
  //   printDoc += d[i]+' ';
  // }
  // return printDoc;
  return printDoctoString;
}



  function isLetter(str) {
//    return /^[a-zA-Z]*$/.test(str);
    return /^[a-zA-Z]$/.test(str);
  }
 


//function for checking if word is completely solved
function isSolved(w, d) {
  complete = true;
  for (var k = 0; k < w.length; k++) {
    if (w[k] != d[k]) {   //compare their solution to actual
      complete = false;
    }
  }
  return complete;
}
