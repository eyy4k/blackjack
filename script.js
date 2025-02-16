


let hasBlackJack = false
let isAlive = false
let dealersrunde = false;
let message = "";

let sum = 0;
let dealersSum = 0
let cards = [];
let dealerCards = [];
let deck = [];


let bheadEl = document.querySelector(".bhead")
let messageEl = document.getElementById("messageEl")
let sumEl = document.querySelector("#sumEl")
let cardEl = document.getElementById("cardEl")

let dealerKortEl = document.getElementById("dealersKort")
let dealerSumEl = document.getElementById("dealersSum")

let dealerScoreEl = document.querySelector("#dealerScore")
let spillerScoreEl = document.querySelector("#spillerScore")

// spiller og dealer får et random kort fra i til 11 //

function getRandomCard() {

    if (deck.length === 0) {kortstokker()}

    return deck.pop();

}

// starter spillet du får to kort og dealeren får et og det andre er skjult //

function startGame() {

    isAlive = true;
    hasBlackJack = false;
    dealersrunde = false;

    if (deck.length < 10) {kortstokker()}

    let firstCard = getRandomCard();
    let secondCard = getRandomCard();
    firstCard = bestemEss(0, firstCard);
    secondCard = bestemEss(firstCard, secondCard);

    cards = [firstCard, secondCard];
    sum = cards.reduce((a, b) => a + b, 0);


    let dealerFirstCard = getRandomCard();
    let dealerSecondCard = getRandomCard();
    dealerCards = [dealerFirstCard, dealerSecondCard];
    dealerSum = dealerCards.reduce((a, b) => a + b, 0);

    renderGame()


}

// Nyttig funskjonalitet //

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

// trekke enda flere kort //

function newCard() {

    if (!isAlive || hasBlackJack || dealersrunde) return;

    let card = getRandomCard()
    card = bestemEss(cards, card);


    
    cards.push(card)
    sum = cards.reduce((a, b) => a + b, 0);

    renderGame();

    if (sum >= 21) {
        setTimeout(dealersTur, 1000);
    }
}

// dealerens Runde //

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

// Bestemmer Vinneren //

let spillerScore = 0;
let dealerScore = 0;

function vinner() {

    if (!isAlive) return;

    if (dealerSum > 21) { message = "Dealer Røyk! Du Vant!!!"; spillerScore++; messageEl.style.color = "green"; }

    else if (dealerSum < sum && sum <= 21) { message = "Du Har Høyere Sum! Du Vant!!!"; spillerScore++; messageEl.style.color = "green"; }

    else if (dealerSum > sum && dealerSum <= 21) { message = "Du Har Lavere Sum! Du Tapte!!!"; dealerScore++; messageEl.style.color = "red"; }

    else if (dealerSum > 21 && sum > 21) { message = "Begge Røyk! Ingen Vant!!!"; messageEl.style.color = "orange"; }

    else { message = "Uavgjort! Ingen Vant!!!"; messageEl.style.color = "blue"; }


    messageEl.textContent = message;
    spillerScoreEl.innerText = "Spillerens Score: " + spillerScore;
    dealerScoreEl.innerText = "Dealerens Score: " + dealerScore;

}

// Gjøre sånn de bruker fire kortstokker //

function kortstokker() {

    deck = [];

    for (let i = 0; i < 4; i++)
         { for (let j = 2; j <= 14; j++)
             { 
                let kortverdi = j
                if (kortverdi > 10) kortverdi = 10;
                if (kortverdi === 14) kortverdi = 11
                
                deck.push(kortverdi);
             } } 

     shuffleKort();

}

function shuffleKort() {

    for (let i = deck.length - 1; i > 0; i--) {
        let j = Math.floor(Math.random() * (i + 1));
            [deck[i], deck[j]] = [deck[j], deck[i]];

    }

}

// Ess kan både være 1 og 11 //

function bestemEss(hånd, kort) {

    if (kort === 11) 
        
        {let total = hånd + 11;
        return total > 21 ? 1 : 11; }
             
    return kort;
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