window.onload = function() {

    let blackjackGame = {
        'you': { 'scoreSpan': '#your-blackjack-result', 'div': '#your-box', 'score': 0 },
        'dealer': { 'scoreSpan': '#dealer-blackjack-result', 'div': '#dealer-box', 'score': 0 },
        'cards': ["2","3","4","5","6","7","8","9","10","K","J","Q","A"],
        'cardMap': {"2":2,"3":3,"4":4,"5":5,"6":6,"7":7,"8":8,"9":9,"10":10,"K":10,"Q":10,"J":10,"A":[1,11]},
        'win':0,
        'loss':0,
        'draw':0,
        'isStand' : false,
        'turnsOver' : false,
    };

    const YOU = blackjackGame.you;
    const DEALER = blackjackGame.dealer;

    var hit = document.querySelector('#blackjack-hit-button');
    hit.addEventListener('click', blackjackHit);

    var deal = document.querySelector('#blackjack-deal-button');
    deal.addEventListener('click', blackjackDeal);

    var stand = document.querySelector('#blackjack-stand-button');
    stand.addEventListener('click',dealerLogic);


    function blackjackHit() {
        if(blackjackGame.isStand === false){
        let card = randomCard();
      showCard(card,YOU);
      updateScore(card,YOU);
      showScore(YOU)

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
    // hitSound.play();
}
}

function blackjackDeal(){
    if(blackjackGame.turnsOver === true){
        blackjackGame.isStand = false;
    let yourImage = document.querySelector('#your-box').querySelectorAll('img');
    let dealerImage = document.querySelector('#dealer-box').querySelectorAll('img');

    
    for(let i =0;i<yourImage.length;i++){
    yourImage[i].remove();
}
for(let i =0;i<dealerImage.length;i++){
    dealerImage[i].remove();
}

YOU.score = 0;
DEALER.score = 0;

document.querySelector("#your-blackjack-result").textContent = 0;
document.querySelector("#dealer-blackjack-result").textContent = 0;

document.querySelector("#your-blackjack-result").style.color = "white";
document.querySelector("#dealer-blackjack-result").style.color = "white";

document.querySelector('#blackjack-result').textContent = `Let's Play`;
document.querySelector('#blackjack-result').style.color = "black";
blackjackGame.turnsOver = true;
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

function sleep(ms){
return new Promise(resolve => setTimeout(resolve,ms));
}

async function dealerLogic(){
    blackjackGame.isStand = true;

    while(DEALER.score<16 && blackjackGame.isStand === true){
    let card = randomCard();
    showCard(card,DEALER);
    updateScore(card,DEALER);
    showScore(DEALER);
    await sleep(1000);
    }
        blackjackGame.turnsOver = true;
        let winner = computeWinner();
        showResult(winner);
    
}

function computeWinner(){
    let winner;

    if(YOU.score <= 21){
        if(YOU.score > DEALER.score || DEALER.score>21){
            blackjackGame.win++;
            winner = YOU;
        }else if(YOU.score < DEALER.score){
            blackjackGame.loss++;
            winner = DEALER;
        }else if(YOU.score === DEALER.score){
            blackjackGame.draw++;
        }
    }else if(YOU.score > 21 && DEALER.score <=21){
        blackjackGame.loss++;
        winner = DEALER;
    }else if(YOU.score > 21 && DEALER.score > 21){
        blackjackGame.draw++;
    }

    console.log(blackjackGame);
    return winner;
}

function showResult(winner){
    let message,messageColor;

    if(blackjackGame.turnsOver === true){

    if(winner === YOU){
        document.querySelector('#Wins').textContent = blackjackGame.win;
        message = 'You Won!';
        messageColor = 'green';
    }else if(winner == DEALER){
        document.querySelector('#Losses').textContent = blackjackGame.loss;
        message = 'You Lost!';
        messageColor = 'red';
    }else{
        document.querySelector('#Draws').textContent = blackjackGame.draw;
        message = 'Draw!';
        messageColor = 'black';
    }

    document.querySelector('#blackjack-result').textContent = message;
    document.querySelector('#blackjack-result').style.color = messageColor;
}
}
}
