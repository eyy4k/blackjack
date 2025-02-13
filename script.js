


let hasBlackJack = false
let isAlive = false
let dealersrunde = false;
let message = "";

let sum = 0;
let dealersSum = 0
let cards = [];
let dealerCards = [];

let bheadEl = document.querySelector(".bhead")
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
        setTimeout(dealersTur, 1000);
    }

    else if (sum > 21) {
        message = "Beklager, Du Røyk!";
        messageEl.style.color = "red"
        isAlive = false
        setTimeout(dealersTur, 1000);
    }

    messageEl.innerText = message;

    sumEl.innerText = "Din Sum: " + sum
    cardEl.innerText = "Dine Kort: "

    for (let i = 0; i < cards.length; i++) {
        cardEl.textContent += cards[i];
        if (i < cards.length - 1) {
            cardEl.textContent += ", "
        }

    }

    dealerKortEl.textContent = "Dealerens Kort: " + dealerCards[0] + " + ???";
    dealerSumEl.textContent = "Dealerens sum: ???";

}

function newCard() {

    if (!isAlive || hasBlackJack || dealersrunde) return;
    let card = getRandomCard()
    sum += card
    cards.push(card)
    renderGame();

    if (sum >= 21) {
        setTimeout(dealersTur, 1000);
    }
}

function dealersTur() {

    if (dealersrunde) return;

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

bheadEl.innerHTML = "Trykk På Start Spillet For Ny Runde"
bheadEl.style.fontSize = "40px"

    vinner()

}

function vinner() {
    if (!isAlive) return;

    if (dealerSum > 21) { message = "Dealer Røyk! Du Vant!!!"; messageEl.style.color = "green";}

    else if (dealerSum < sum && sum <= 21) { message = "Du Har Høyere Sum! Du Vant!!!"; messageEl.style.color = "green"; }

    else if (dealerSum > sum && dealerSum <= 21) { message = "Du Har Lavere Sum! Du Tapte!!!"; messageEl.style.color = "red"; }

    else if (dealerSum > 21 && sum > 21) {message = "Begge Røyk! Ingen Vant!!!"; messageEl.style.color = "orange";}

    else { message = "Uavgjort! Ingen Vant!!!"; messageEl.style.color = "blue"; }


    messageEl.textContent = message;

}

// bytte mellom bakgrunner //

document.addEventListener("DOMContentLoaded", function () {


    const bakgrunnsliste = [
        "bilder/bakgrunn.jpg",
        "bilder/bakgrunn2.jpg",
        "bilder/bakgrunn4.jpg"]

        const randomBakgrunn = Math.floor(Math.random() * bakgrunnsliste.length);
        const valgtBakgrunnsbilde = bakgrunnsliste[randomBakgrunn]

        document.body.style.backgroundImage = `url('${valgtBakgrunnsbilde}')`;

})