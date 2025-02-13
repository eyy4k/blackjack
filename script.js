


let hasBlackJack = false
let isAlive = false
let dealersrunde = false;
let message = "";

let sum = 0;
let dealersSum = 0
let cards = [];
let dealerCards = [];


let messageEl = document.getElementById("messageEl")
let sumEl = document.querySelector("#sumEl")
let cardEl = document.getElementById("cardEl")

let dealerKortEl = document.getElementById("dealersKort")
let dealerSumEl = document.getElementById("dealersSum")

function getRandomCard() {
    let randomNumber = Math.floor(Math.random() * 13) + 1
    if (randomNumber > 10) {
        return 10
    }

    else if (randomNumber === 1) {
        return 11
    }

    else { return randomNumber }

}

function startGame() {

    isAlive = true;
    hasBlackJack = false;
    dealersrunde = false;

    let firstCard = getRandomCard();
    let secondCard = getRandomCard();
    cards = [firstCard, secondCard];
    sum = firstCard + secondCard;


    let dealerFirstCard = getRandomCard();
    let dealerSecondCard = getRandomCard();
    dealerCards = [dealerFirstCard, dealerSecondCard];
    dealerSum = dealerFirstCard + dealerSecondCard;

    renderGame()


}

function renderGame() {
    if (sum <= 20) {
        message = "Lyst På Et Til Kort?"
        messageEl.style.color = "black"
    }

    else if (sum === 21) {
        message = "Blackjack!!! Du Vant";
        messageEl.style.color = "green"
        hasBlackJack = true
    }

    else if (sum > 21) {
        message = "Beklager, Du Røyk!";
        messageEl.style.color = "red"
        isAlive = false
    }

    messageEl.innerText = message;

    sumEl.innerText = "Sum: " + sum
    cardEl.innerText = "Kort: "

    for (let i = 0; i < cards.length; i++)
         { cardEl.textContent += cards[i];
            if (i < cards.length - 1) {
                cardEl.textContent += ", " }

        }

    dealerKortEl.textContent = "Dealerens Kort: ???";
    dealerSumEl.textContent = "Dealerens sum: ???";

}

function newCard() {

    if (!isAlive || hasBlackJack || dealersrunde) return;
    let card = getRandomCard()
    sum += card
    cards.push(card)
    renderGame()
}

function dealersTur() {

    if (!isAlive || hasBlackJack) return;

    dealersrunde = true

    while (dealerSum < 17) {
        let card = getRandomCard();
        dealerCards.push(card);
        dealerSum += card;
    }

    dealerKortEl.textContent = "Dealerens kort: ";

    for (let i = 0; i < dealerCards.length; i++) {
        dealerKortEl.textContent += dealerCards[i]; 
    
        if (i < dealerCards.length - 1) {
            dealerKortEl.textContent += ", "; 
        }
    }

    dealerKortEl.style.color = "black"

    dealerSumEl.textContent = "Dealerens Sum: " + dealerSum;
    dealerSumEl.style.color = "black"


}
