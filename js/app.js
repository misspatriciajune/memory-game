/*
 * Create a list that holds all of your cards
 */
var card = document.getElementsByClassName("card");
var cards = [...card];


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
       
    for(var i = 0; i < cards.length; i++){ //loop through all the cards 
        deck.innerHTML = ""; //clear content to hold cards
        Array.prototype.forEach.call(cards, function(card){ 
            deck.appendChild(card); //add each card
         });
    }
}

//Restart Game 
var reset = document.querySelector(".restart"); //restart button
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

 