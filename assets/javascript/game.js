var wordNum =0;
var numGuesses = 0;
var numMisses = 0;
var Wins = 0;
var Losses = 0;
var word='';
var lettersChosen=[];
var displaySol=[];
var solutionShow = '';

// Word bank, chosen from 'word of the day' in dictionary app
// word banks for life and science have been added for future options (not yet used)

var wordBank =['FUNSTER', 'GRAVID','COMSTOCKERY','THEINE','CONFABULATE','ULULATE','ICONOCLASTIC',
'ARVO','VENTIFACT','PALINDROME', 'POLEMIC', 'KUMQUAT', 'TACO', 'BANAUSIC', 'DAYMARE', 
'KIBITZER', 'PALUDAL', 'NIMBUS', 'ERGATE', 'MUSSITATION', 'FRUCTIFY','CONSUETUDE','INCOGNITANT',
'DORP','ANOESIS','VARIEGATED','BALLON','BUMFUZZLE','AUTARKY','LITOTES','HIGHFALUTIN'];
var wordlife =[ 'FLOWER', 'MANGO', 'URCHIN','EXERCISE','DIET','EAT','REPRODUCE','BREATHE','ANGEL','DEMON', 
'EGGROLL','LEMON', 'AVATAR','TACO', 'MUSIC','SANDWICH','COMPLEX','LOVE','EPIPHANY','NEMESIS'];
var wordSci =['QUARK','PULSAR','CUMULUS','PHASE','FUNCTION','SINGULARITY','STATE',
'GRAVITY','ENERGY','FUNDAMENTAL','LAWS','PROPERTIES','CONDENSE','ESSENCE','WAVES']

//topic selector buttons added to vary word banks (still need to make functions)

document.getElementById("day").addEventListener("click",wordBankselectorfcn);
document.getElementById("life").addEventListener("click",wordLifeselectorfcn);
document.getElementById("sci").addEventListener("click",wordSciselectorfcn);
document.getElementById("easy").addEventListener("click",wordEasyselectorfcn);

//A 'start' button has been added - it is used to reset the word and guess count

$("#start").on("click", function(){ // initialize word and counts with 'start' button
  word = ranWord();     //select a new word
  lettersChosen = [];   //zero out string of guesses
  numMisses = 0;
   //initialize the solution display (all blanks)
  displaySol= initBlanks(word);     //set up an array of the correct # of blanks
  //make text display better (without commas)
  solutionShow = printToDocument(displaySol);
  lettersShow  = printToDocument(lettersChosen);
  //keep stats current
  Stats(10-numMisses, lettersShow, solutionShow ,Wins,Losses);
  document.getElementById("message1").innerHTML = ' ';
});     //end of 'start' button block




// this next block executes until the word is completed or guesses are used up
    
document.onkeyup = function(event) {        //this is where iterations begin --word and blanks are set already

  // Determines which letter was selected.
  var userLet = event.key;
  console.log(userLet);
  
  //store each guess into a new string for on-screen display of all guesses

  userLet = userLet.toUpperCase();    //all uppercase letters
  lettersChosen.push(userLet)   //append array for display
    
  match = false;   // set to false until proven otherwise

  // reset the displayed partial word to include correctly guessed letters.  If none, count as a miss

  for (var j=0; j < word.length; j++){      
    if(word[j]==userLet) {
      displaySol[j] = userLet;
      match = true;
    }
  }


  numGuesses +=1;   // increment before stats are displayed
  
  
  // if the entire word is solved before guesses have been used up, increment
  // 'wins' by 1 and set up a new word. (or prompt for another game)
  if (isSolved(word, displaySol) == true){
    document.getElementById("message1").innerHTML = 'Congratulations!  You win!';
    numMisses = 0;
    numGuesses = 0;
    lettersChosen = []; 
    Wins += 1;
  }
  // if all guesses have been used up before the word is solved, show answer, 
  // increment 'losses' by 1 and offer to start a new game.
  //count misses
  if (match == false) {   //if not in word, increment misses up to max value of 10
    numMisses += 1;
    if(numMisses == 10){
       document.getElementById("message1").innerHTML = 'No more guesses! Your word was: ' + word;
       numGuesses = 0;
       lettersChosen = []; 
       Losses += 1;  
    }
  }
  
 
  document.getElementById("incWord").innerHTML = displaySol;
  
  // make answer display better (without commas)
    solutionShow = printToDocument(displaySol);
    lettersShow = printToDocument(lettersChosen);

  //keep stats current
  Stats(10-numMisses, lettersShow, solutionShow, Wins, Losses);

  
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

  function printToDocument(d){
    printDoctoString = d.join(' ');
    // var printDoc = '';
    // for(var i = 0; i< d.length; i++) {
    //   printDoc += d[i]+' ';
    // }
    // return printDoc;
    return printDoctoString;
  }

  //function for checking if word is completely solved
   function isSolved(w,d){
     complete = true;
     for(var k =0; k < w.length; k++){
        if (w[k] != d[k]) {   //compare their solution to actual
          complete = false;
        }
     }
     return complete;
   }
