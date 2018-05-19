 //some global variables
 var s;
 var count;
 var letterGuess=[];
 var clicks_rmg ;
 var randomWord ; //declared globally
 var win=0;
 
 //define an empty array to store the guesses
 var answerArray = [];
 
 //startUp function defined. This is called on page load/user has completed all 12 attempts/correctly guessed the word(then restart)
 //here we fill the answer array with underscores first based on the length of the random word selected
 function start(){
   console.log("Inside startup");
   s=0;
   count = 0;
   clicks_rmg = 12;
   letterGuess = [];
   answerArray = [];
   //First define an array of words to choose from, the computer will randonly choose from these words
   var randomWordArr = ["food","pizza","happy","joy","omlette","rice","tacos","pasta","burrito"];
   
   //we then choose a random word from the array above, using the globally declared variable "randomWord"
   randomWord = randomWordArr[Math.floor(Math.random() * randomWordArr.length)];
   
   //We have a loop which populates the elements of an array with as many "_"s based on the length of the randomWord.
   
   for (i=0; i < randomWord.length; i++) {
     answerArray[i] = "_";
   }
   //Next join the elements of an array into a string and return that string and store in a variable s
   s = answerArray.join(" ");
   //Then show the merged "_"s to the screen to display/indicate how many letters that random word contained
   document.getElementById("answer").innerHTML = s;
 
   //JUST for TESTING PURPOSES
   console.log(randomWord);
   
   //Below lines 55-58 pupulate the values of win, guessed letters, remaining clicks to the page
   document.getElementById("wins").innerHTML = "Wins: "+win;
   document.getElementById("guess_alrdy").innerHTML = "Letters Already Guessed: " +letterGuess;
   document.getElementById("clk_rmg").innerHTML = clicks_rmg;
 }

 //Below code to capture key up event from user and other actions based on problem requirement. 
 document.onkeyup = function(event) {
   // Determines which key was pressed.
   var userGuess = event.key;
   console.log( letterGuess.indexOf(userGuess));
  
   //below for loop checks whether the user typed letter is in any position within the selected/chosen random word 
     for (i = 0; i < randomWord.length; i++){
       if (randomWord[i] === userGuess){
         //assign that letter to the answerArray in the same position
         answerArray[i] = userGuess;
         //the below line replaces the "_" with actual letter/s on the page for the matched letter
         document.getElementById("answer").innerHTML = answerArray.join(" ");
       }
     }
   
     //keeps of a count of the attempts for guessing the word
     count++; 
    
   //This block of if statement till line#83 PREVENTS the same letter when typed/pressed to decrement the remaining clicks counter 
   //& also prevents being populated in the Guessed Letters array
   //this is per requirement as shown in example video
    if (letterGuess.indexOf(userGuess) == -1 ){
       clicks_rmg--;
       letterGuess.push(userGuess);
    }
 
   //below 2 lines write the values of the "unique" letters already guessed/pressed for that word & remaining clicks
    document.getElementById("guess_alrdy").innerHTML = "Letters Already Guessed: " +letterGuess;
    document.getElementById("clk_rmg").innerHTML = clicks_rmg;

   //below if statement till line#91 checks if the "formed" answer is equal to the randomWord for that iteration, 
   //if so then call the Start function to restart the game and also increment the win global variable by 1. 
   //Display the updated win value when a new game restarts
   if (randomWord === answerArray.join("")){
       start();
       win++;
       document.getElementById("wins").innerHTML = "Wins: "+win;
       document.getElementById('myAudio').play();
      } 
   
   //if users attempts unique key/letter values 12 times and still cannot complete the word, then the game restarts 
   //by invoking the start function.
   if (clicks_rmg ===0) {
     start();
   }
     
 }