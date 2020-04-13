window.onload = function() {

    let blackjackGame = {
        'player1': { 'scoreSpan': '#your-blackjack-result', 'div': '#your-box', 'score': 0 },
        'player2': { 'scoreSpan': '#dealer-blackjack-result', 'div': '#dealer-box', 'score': 0 },
        'cards': ["2","3","4","5","6","7","8","9","10","K","J","Q","A"],
        'cardMap': {"2":2,"3":3,"4":4,"5":5,"6":6,"7":7,"8":8,"9":9,"10":10,"K":10,"Q":10,"J":10,"A":[1,11]},
        'win':0,
        'loss':0,
        'draw':0,
        'isStand' : false,
        'turnsOver' : false,
    };

    const P1 = blackjackGame.player1;
    const P2 = blackjackGame.player2;

    var hit = document.querySelector('#blackjack-hit-button');
    hit.addEventListener('click', blackjackHit);

    var deal = document.querySelector('#blackjack-deal-button');
    deal.addEventListener('click', blackjackDeal);

    var stand = document.querySelector('#blackjack-stand-button');
    stand.addEventListener('click',dealerLogic);

    var refresh = document.querySelector('#blackjack-reset-button');
    refresh.addEventListener('click',reset);


    function blackjackHit() {
        if(blackjackGame.isStand === false){
        let card = randomCard();
      showCard(card,P1);
      updateScore(card,P1);
      showScore(P1)

    } 
}
    
    function randomCard(){
        let randomIndex = Math.floor(Math.random()*13);
        return blackjackGame.cards[randomIndex];
    }
 
    function showCard(card,activePlayer){
        if(activePlayer.score <= 21){
    let cardImage = document.createElement('img');
    cardImage.src = `Images/${card}.png`
    document.querySelector(activePlayer.div).appendChild(cardImage);
}
}

function blackjackDeal(){
    if(blackjackGame.turnsOver === true){
        blackjackGame.isStand = false;
        let winner = computeWinner();
        showResult(winner);
    }
}

function updateScore(card,activePlayer){
    if(card === 'A'){
        if(activePlayer.score + blackjackGame.cardMap[card][1] <= 21){
    activePlayer.score += blackjackGame.cardMap[card][1];
        }else{
    activePlayer.score += blackjackGame.cardMap[card][0];
        }
    }else{
    activePlayer.score += blackjackGame.cardMap[card];
    }
}


function showScore(activePlayer){
    if(activePlayer.score > 21){
document.querySelector(activePlayer.scoreSpan).textContent = "BUSTED!";
document.querySelector(activePlayer.scoreSpan).style.color = 'red';
    }else{
document.querySelector(activePlayer.scoreSpan).textContent = activePlayer.score;
}
}

function dealerLogic(){
    blackjackGame.isStand = true;

    
    let card = randomCard();
    showCard(card,P2);
    updateScore(card,P2);
    showScore(P2);
    blackjackGame.turnsOver = true;
    // if(P2.score > 15){
        
        // let winner = computeWinner();
        // showResult(winner);
    // }
}

function computeWinner(){
    let winner;

    if(P1.score <= 21){
        if(P1.score > P2.score || P2.score>21){
            blackjackGame.win++;
            winner = P1;
        }else if(P1.score < P2.score){
            blackjackGame.loss++;
            winner = P2;
        }else if(P1.score === P2.score){
            blackjackGame.draw++;
        }
    }else if(P1.score > 21 && P2.score <=21){
        blackjackGame.loss++;
        winner = P2;
    }else if(P1.score > 21 && P2.score > 21){
        blackjackGame.draw++;
    }

    console.log(blackjackGame);
    return winner;
}

function showResult(winner){
    let message,messageColor;

    if(blackjackGame.turnsOver === true){

    if(winner === P1){
        document.querySelector('#Wins').textContent = blackjackGame.win;
        message = 'PLAYER 1 WON!';
        messageColor = 'green';
    }else if(winner == P2){
        document.querySelector('#Losses').textContent = blackjackGame.loss;
        message = 'PLAYER 2 WON!';
        messageColor = 'green';
    }else{
        document.querySelector('#Draws').textContent = blackjackGame.draw;
        message = 'DRAW!';
        messageColor = 'black';
    }

    document.querySelector('#blackjack-result').textContent = message;
    document.querySelector('#blackjack-result').style.color = messageColor;
}
}

function reset(){
    let player1Image = document.querySelector('#your-box').querySelectorAll('img');
    let player2Image = document.querySelector('#dealer-box').querySelectorAll('img');

    
    for(let i =0;i<player1Image.length;i++){
    player1Image[i].remove();
}
for(let i =0;i<player2Image.length;i++){
    player2Image[i].remove();
}

P1.score = 0;
P2.score = 0;

document.querySelector("#your-blackjack-result").textContent = 0;
document.querySelector("#dealer-blackjack-result").textContent = 0;

document.querySelector("#your-blackjack-result").style.color = "white";
document.querySelector("#dealer-blackjack-result").style.color = "white";

document.querySelector('#blackjack-result').textContent = `Let's Play`;
document.querySelector('#blackjack-result').style.color = "black";
blackjackGame.turnsOver = true;

}
}
