let deck = [];
let playerHand = [];
let dealerHand = [];
let chips = 100;

function createDeck() {
    const suits = ["♠", "♥", "♦", "♣"];
    const values = ["A", "2", "3", "4", "5", "6", "7", "8", "9", "10", "J", "Q", "K"];

    deck = [];

    for (let s of suits) {
        for (let v of values) {
            deck.push({ value: v, suit: s });
        }
    }

    deck = deck.sort(() => Math.random() - 0.5);
}

function getCardValue(card) {
    if (["J", "Q", "K"].includes(card.value)) return 10;
    if (card.value === "A") return 11;
    return parseInt(card.value);
}

function calculateScore(hand) {
    let score = hand.reduce((sum, card) => sum + getCardValue(card), 0);

    // Gestione degli assi
    hand.filter(c => c.value === "A").forEach(() => {
        if (score > 21) score -= 10;
    });

    return score;
}

function render() {
    document.getElementById("player-cards").innerHTML =
        playerHand.map(c => `<div class="card">${c.value}${c.suit}</div>`).join("");

    document.getElementById("dealer-cards").innerHTML =
        dealerHand.map(c => `<div class="card">${c.value}${c.suit}</div>`).join("");

    document.getElementById("player-score").textContent = calculateScore(playerHand);
    document.getElementById("dealer-score").textContent = calculateScore(dealerHand);
    document.getElementById("chips").textContent = chips;
}

function startGame() {
    createDeck();
    playerHand = [deck.pop(), deck.pop()];
    dealerHand = [deck.pop(), deck.pop()];
    document.getElementById("message").textContent = "";
    render();
}

function hit() {
    playerHand.push(deck.pop());
    render();

    if (calculateScore(playerHand) > 21) {
        document.getElementById("message").textContent = "Hai sballato! 😭";
        chips -= 10;
    }
}

function stand() {
    while (calculateScore(dealerHand) < 17) {
        dealerHand.push(deck.pop());
    }

    const playerScore = calculateScore(playerHand);
    const dealerScore = calculateScore(dealerHand);

    if (dealerScore > 21 || playerScore > dealerScore) {
        document.getElementById("message").textContent = "Hai vinto! 🎉";
        chips += 10;
    } else if (playerScore < dealerScore) {
        document.getElementById("message").textContent = "Hai perso! 😢";
        chips -= 10;
    } else {
        document.getElementById("message").textContent = "Pareggio! 😐";
    }

    render();
}
