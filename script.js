


let hasBlackJack = false
let isAlive = false
let message = "";

let messageEl = document.getElementById("messageEl")
let sumEl = document.querySelector("#sumEl")
let cardEl = document.getElementById("cardEl")

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
    let firstCard = getRandomCard();
    let secondCard = getRandomCard();
    cards = [firstCard, secondCard];
    sum = firstCard + secondCard;
    renderGame()

}

function renderGame() {
    if (sum <= 20) {
        message = "Lyst På Et Til Kort?"
    }

    else if (sum === 21) {
        message = "Blackjack!!! Du Vant";
        hasBlackJack = true
    }

    else if (sum > 21) {
        message = "Beklager, Du Røyk!";
        isAlive = false
    }

    messageEl.innerText = message;

    sumEl.innerText = "sum: " + sum
    cardEl.innerText = "Kort: "
    for (let i = 0; i < cards.length; i++) { cardEl.textContent += cards[i] + " " }

}

function newCard() {

    if (!isAlive || hasBlackJack) return;
    let card = getRandomCard()
    sum += card
    cards.push(card)
    renderGame()
}
