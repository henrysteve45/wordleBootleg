﻿const wordList = [
    "ABBEY",
    "RIDGE",
    "MATCH",
    "CATCH",
    "LOVED",
    "COLOR",
    "NIECE",
    "CHILD",
    "DADDY",
    "MOMMY",
    "INDIE",
    "PENNY",
    "BLACK",
    "WHITE",
    "ETHER",
    "SEVEN",
    "EIGHT",
    "THREE",
    "FIRED",
    "CLOCK",
    "TIMER",
    "WATER"
];
const victoryMessages = [
    "Splendid!",
    "Congratualtions!",
    "Well Done!",
    "Good Job!",
    "You Did It!"
];
const validKeys = [
    'Q',
    'W',
    'E',
    'R',
    'T',
    'Y',
    'U',
    'I',
    'O',
    'P',
    'A',
    'S',
    'D',
    'F',
    'G',
    'H',
    'J',
    'K',
    'L',
    'Z',
    'X',
    'C',
    'V',
    'B',
    'N',
    'M',
    'ENTER',
    'BACKSPACE'
];

let typedGuess = "";
let solution = wordList[Math.floor(Math.random()*wordList.length)];
let guessesMade = 0;
let gameOver = false;
let canGuess = true;

// Add leters
function addLetter(char) {
    if (!gameOver && canGuess) {
        if (char == "ENTER" && typedGuess.length == 5) {
            guessWord(typedGuess);
            typedGuess = "";
        } else if (typedGuess.length < 5 && char != "ENTER" && char != "«") {
            document.getElementById("row"+[guessesMade+1]).children[typedGuess.length].innerHTML = char;
            typedGuess += char;
        } else if (char == "«" && typedGuess.length != 0) {
            typedGuess = typedGuess.substring(0, typedGuess.length - 1);
            document.getElementById("row"+[guessesMade+1]).children[typedGuess.length].innerHTML = "";
        }
    }
}

// Type to enter letters
document.addEventListener('keydown', logKey);
function logKey(e) {
    k = e.key.toUpperCase();
    if (validKeys.includes(k)) {
        if (k == "BACKSPACE") {
            addLetter("«");
        } else {
            addLetter(k);
        }
    }   
}

// Handle coloring of guesses
function guessWord(guess) {
    guessesMade ++;
    let element = document.getElementById("row"+[guessesMade]);
    let children = element.children;
    let answerLetters = solution.split('');
    let guessLetters = guess.split('');
    // Make all gray at first
    for(var i=0; i<children.length; i++){
        let child = children[i];
        child.innerHTML = guess.charAt(i);
        child.style.background = "var(--absent)";
        document.getElementById(guess.charAt(i)).style.background = "var(--background2)";
        document.getElementById(guess.charAt(i)).style.color = "var(--absent)";
    }
    // If guess letter = solution letter, make green
    for(var i=0; i<children.length; i++){
        let child = children[i];
        child.innerHTML = guess.charAt(i);
        if (guessLetters[i] == solution.charAt(i)) {
            child.style.background = "var(--correct)";
            document.getElementById(guess.charAt(i)).style.background = "var(--correct)";
            document.getElementById(guess.charAt(i)).style.color = "var(--font)";
            answerLetters[i] = null;
            guessLetters[i] = null;
        }
    }
    // If guess letter is included in solution, make yellow
    for(var i=0; i<children.length; i++){
        let child = children[i];
        child.innerHTML = guess.charAt(i);
        if (guessLetters[i] != null && answerLetters.includes(guessLetters[i])) {
            child.style.background = "var(--present)";
            document.getElementById(guess.charAt(i)).style.background = "var(--present)";
            document.getElementById(guess.charAt(i)).style.color = "var(--font)";
            answerLetters[answerLetters.indexOf(guessLetters[i])] = null;
        }
    }
    // Win/Lose dialog
    if (guess == solution) {
        gameOver = true;
        canGuess = false;
        Toast.show(victoryMessages[Math.floor(Math.random()*victoryMessages.length)]);
        document.getElementById('keyboard').remove();
        document.getElementById("game").innerHTML += "<h1 style='margin-bottom: 0' >Well Done!</h1><p>You correctly guessed the word " + solution + "!</p><button class='reset' onclick='window.location.reload();'>Play Again</button>";
    } else if (guessesMade == 6) {
        Toast.show("Sorry, the word was: " + solution);
        document.getElementById('keyboard').remove();
        document.getElementById("game").innerHTML += "<h1 style='margin-bottom: 0' >Game Over!</h1><p>The word was " + solution + ".</p><button class='reset' onclick='window.location.reload();'>Play Again</button>";
    }
}

// Instruction Modal
let modal = document.getElementById("instructions");
let btn = document.getElementById("help-button");
let span = document.getElementsByClassName("close")[0];
btn.onclick = function() {
    modal.style.display = "block";
    canGuess = false;
}
span.onclick = function() {
    modal.style.display = "none";
    if (!gameOver) {canGuess = true;}
}
window.onclick = function(event) {
    if (event.target == modal) {
        modal.style.display = "none";
        if (!gameOver) {canGuess = true;}
    }
}

// Toast
const Toast = {
    init() {
        this.hideTimeout = null;
        this.el = document.createElement("div");
        this.el.className = "toast";
        document.body.appendChild(this.el);
    },

    show(message) {
        clearTimeout(this.hideTimeout);

        this.el.textContent = message;
        this.el.className = "toast toast--visible";

        this.hideTimeout = setTimeout(() => {
            this.el.classList.remove('toast--visible');
        }, 3000)
    }
};
document.addEventListener("DOMContentLoaded", () => Toast.init());