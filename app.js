let blackjackGame = {
    'you': { 'scoreSpan': '#your-blackjack-result', 'div': '#your-box', 'score': 0 },
    'dealer': { 'scoreSpan': '#dealer-blackjack-result', 'div': '#dealer-box', 'score': 0 },
    'cards': ["2", "3", "4", "5", "6", "7", "8", "9", "10", "K", "J", "Q", "A"],
    'cardMap': { "2": 2, "3": 3, "4": 4, "5": 5, "6": 6, "7": 7, "8": 8, "9": 9, "10": 10, "K": 10, "Q": 10, "J": 10, "A": [1, 11] },
};

const YOU = blackjackGame.you;
const DEALER = blackjackGame.dealer;

var hit = document.querySelector('#blackjack-hit-button');
hit.addEventListener('click', blackjackHit);

var deal = document.querySelector('#blackjack-deal-button');
deal.addEventListener('click', blackjackDeal);

var stand = document.querySelector('#blackjack-stand-button');
stand.addEventListener('click', dealerLogic);


function blackjackHit() {
    let card = randomCard();
    showCard(card, YOU);
    updateScore(card, YOU);
    showScore(YOU)

}

function randomCard() {
    let randomIndex = Math.floor(Math.random() * 13);
    return blackjackGame.cards[randomIndex];
}

function showCard(card, activePlayer) {
    if (activePlayer.score <= 21) {
        let cardImage = document.createElement('img');
        cardImage.src = `Images/${card}.png`
        document.querySelector(activePlayer.div).appendChild(cardImage);

    }
}

function blackjackDeal() {

    let yourImage = document.querySelector('#your-box').querySelectorAll('img');
    let dealerImage = document.querySelector('#dealer-box').querySelectorAll('img');


    for (let i = 0; i < yourImage.length; i++) {
        yourImage[i].remove();
    }
    for (let i = 0; i < dealerImage.length; i++) {
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

}

function updateScore(card, activePlayer) {
    if (card === 'A') {
        if (activePlayer.score + blackjackGame.cardMap[card][1] <= 21) {
            activePlayer.score += blackjackGame.cardMap[card][1];
        } else {
            activePlayer.score += blackjackGame.cardMap[card][0];
        }
    } else {
        activePlayer.score += blackjackGame.cardMap[card];
    }
}

function showScore(activePlayer) {
    if (activePlayer.score > 21) {
        document.querySelector(activePlayer.scoreSpan).textContent = "BUSTED!";
        document.querySelector(activePlayer.scoreSpan).style.color = 'red';
    } else {
        document.querySelector(activePlayer.scoreSpan).textContent = activePlayer.score;
    }
}