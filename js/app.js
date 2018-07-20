/*
 * Create a list that holds all of your cards
 */
var card = document.getElementsByClassName("card");
var cards = [...card];


var opened = []; //holds opened cards
var count = 0; //no. of moves counter
var reset = document.querySelector(".restart"); //restart button
var moves = document.querySelector(".moves"); //moves placeholder
var modal = document.querySelector(".modal"); //get the modal
var star = document.querySelectorAll(".fa-star"); //stars
/*
 * Display the cards on the page
 *   - shuffle the list of cards using the provided "shuffle" method below
 *   - loop through each card and create its HTML
 *   - add each card's HTML to the page
 */

// Shuffle function from http://stackoverflow.com/a/2450976
function shuffle(array) {
    var currentIndex = array.length, temporaryValue, randomIndex;

    while (currentIndex !== 0) {
        randomIndex = Math.floor(Math.random() * currentIndex);
        currentIndex -= 1;
        temporaryValue = array[currentIndex];
        array[currentIndex] = array[randomIndex];
        array[randomIndex] = temporaryValue;
    }

    return array;
}

document.body.onload = playGame(); //Call playgame() when game is loaded

//Play Game
function playGame(){
    cards = shuffle(cards); //shuffle cards
    
    var deck = document.querySelector(".deck"); //deck of cards

    count = 0; //reset moves counter
    moves.innerHTML = ""; //reset moves display
    for(var i = 0; i < 3; i++){ //reset star meter
       star[i].classList.remove("shade"); 
    }

    for(var i = 0; i < cards.length; i++){ //loop through all the cards 
        deck.innerHTML = ""; //clear content to hold cards
        Array.prototype.forEach.call(cards, function(card){ 
            deck.appendChild(card); //add each card
         });
         cards[i].classList.remove("show", "open", "match"); //remove style
    }
}

//Restart Game 
reset.addEventListener("click", function(){ //Call playgame() when restart button is clicked
    playGame();
});

/*
 * set up the event listener for a card. If a card is clicked:
 *  - display the card's symbol (put this functionality in another function that you call from this one)
 *  - add the card to a *list* of "open" cards (put this functionality in another function that you call from this one)
 *  - if the list already has another card, check to see if the two cards match
 *    + if the cards do match, lock the cards in the open position (put this functionality in another function that you call from this one)
 *    + if the cards do not match, remove the cards from the list and hide the card's symbol (put this functionality in another function that you call from this one)
 *    + increment the move counter and display it on the page (put this functionality in another function that you call from this one)
 *    + if all cards have matched, display a message with the final score (put this functionality in another function that you call from this one)
 */


//Click event listener for the cards
for(var i = 0; i < cards.length; i++){
    cards[i].addEventListener("click", display);  //display card
    cards[i].addEventListener("click", openCard); //check if 2 cards are matched or not
    cards[i].addEventListener("click", allCards); //check if all cards are matched
}

//Display of the card's symbol
function display(){
    this.classList.toggle("open");  
    this.classList.toggle("show");
 }

 //Check if matched or not
 function openCard(){
     opened.push(this); //add card to a list of opened cards
     if(opened.length === 2){  //check if 2 cards are open 
        countMoves(); //increment move counter
        if(opened[0].type === opened[1].type){ //check if matched or not
            correct();  //matched
        }
        else{
            incorrect(); //not matched
        }
     }
 }

//Cards matched
function correct(){
    console.log("Cards matched!");
    for(var i = 0; i < opened.length; i++){   
        opened[i].classList.add("match");   //change color if match and lock the cards
        opened[i].classList.remove("open","show");
    }
    opened = []; //reset opened cards array
}

//Cards doesn't matched
function incorrect(){
    console.log("Cards did not matched. Try again!");
    for(var i=0;i<opened.length;i++){   
        opened[i].classList.add("notMatch");    //change color if not match
    }
    setTimeout(hide, 1000); //reset style of card
}

//Hide symbol of card
function hide(){
    for(var i = 0; i < opened.length; i++){   //reset the style of the card
        opened[i].classList.remove("show","open","notMatch"); 
    } 
    opened = [];    //reset opened cards array
}
    
//Count the no. of moves
function countMoves(){
    count++; //increment no. of moves
    moves.innerHTML = count; //display no. of moves
    progress(count);
}

//Star meter
function progress(count){
    if(count > 8 && count < 12){    //if no. of moves is 8 to 12, decrement star meter
        for(var i = 0; i < 3; i++){
            star[2].classList.add("shade");
        }
    }   
    else if(count > 13){    //if no. of moves is more than 13, decrement
        for(var i = 0; i < 3; i++){
            star[1].classList.add("shade");
        }
    }
}

//Winning modal
function allCards(){
    var matched = document.getElementsByClassName("match"); //get match cards
    if(matched.length === 16){  //check if all cards are matched
        console.log("All cards are matched!");
        var totalRating = document.querySelector(".totalRating");
        var totalMoves = document.querySelector(".totalMoves");
        var stars = document.querySelector(".stars").innerHTML;
        totalRating.innerHTML = stars;
        totalMoves.innerHTML = count;

        modal.style.display = "block"; //display modal
    }

    window.onclick = function(e) {  //close modal
        if (e.target == modal) {
            modal.style.display = "none";
        }
    }
}

//Play again button on modal
function play(){
    modal.style.display = "none"; //close modal
    playGame(); //reset game
}