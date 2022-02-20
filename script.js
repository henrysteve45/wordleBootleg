const wordList = [
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
const failMessages = [
    "Too Bad!",
    "You Failed!",
    "Better Luck Next Time!",
    "Game Over!",
    "Oops..."
]
let wordleEmojis = "";
let solution = wordList[Math.floor(Math.random()*wordList.length)];
let guessesMade = 0;

function submitEvent(event) {
    event.preventDefault();
    currentGuess = document.getElementById("guessInput").value.toUpperCase();
    document.getElementById("guessInput").value = null;
    guessWord(currentGuess);
}  

function guessWord(guess) {
    guessesMade ++;
    var element = document.getElementById("row"+[guessesMade]);
    var children = element.children;
    var answerLetters = solution.split('');
    var guessLetters = guess.split('');
    // Make all gray at first
    for(var i=0; i<children.length; i++){
        var child = children[i];
        child.innerHTML = guess.charAt(i);
        child.style.background = "var(--absent)";
    }
    // If guess letter = solution letter, make green
    for(var i=0; i<children.length; i++){
        var child = children[i];
        child.innerHTML = guess.charAt(i);
        if (guessLetters[i] == solution.charAt(i)) {
            child.style.background = "var(--correct)";
            answerLetters[i] = null;
            guessLetters[i] = null;
        }
    }
    // If guess letter is included in solution, make yellow
    for(var i=0; i<children.length; i++){
        var child = children[i];
        child.innerHTML = guess.charAt(i);
        if (guessLetters[i] != null && answerLetters.includes(guessLetters[i])) {
            child.style.background = "var(--present)";
            answerLetters[answerLetters.indexOf(guessLetters[i])] = null;
        }
    }
    // Win/Lose dialog
    if (guess == solution) {
        Toast.show(victoryMessages[Math.floor(Math.random()*victoryMessages.length)]);
        let el = document.getElementById("player-input-container");
        el.remove();
        document.getElementById("game").innerHTML += "<h1 style='margin-bottom: 0' >Well Done!</h1><p>You correctly guessed the word " + solution + "!</p><button class='reset' onclick='window.location.reload();'>Play Again</button>";
    } else if (guessesMade == 6) {
        Toast.show(failMessages[Math.floor(Math.random()*failMessages.length)]);
        let el = document.getElementById("player-input-container");
        el.remove();
        document.getElementById("game").innerHTML += "<h1 style='margin-bottom: 0' >Game Over!</h1><p>The word was " + solution + ".</p><button class='reset' onclick='window.location.reload();'>Play Again</button>";
    }
}
const form = document.getElementById("inputForm");
form.addEventListener('submit', submitEvent);

// Instruction Modal
var modal = document.getElementById("instructions");
var btn = document.getElementById("help-button");
var span = document.getElementsByClassName("close")[0];
btn.onclick = function() {
    modal.style.display = "block";
}
span.onclick = function() {
    modal.style.display = "none";
}
window.onclick = function(event) {
    if (event.target == modal) {
        modal.style.display = "none";
    }
}

// TOAST
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
        }, 2000)
    }
};

document.addEventListener("DOMContentLoaded", () => Toast.init());