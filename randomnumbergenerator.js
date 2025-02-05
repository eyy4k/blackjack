
// console.log(randomNumber)

// let florredNumber = Math.floor(21)
// console.log(florredNumber)

function rolledDice() {
    let randomNumber = Math.floor(Math.random() * 21) + 1
    return randomNumber
}

console.log(rolledDice())