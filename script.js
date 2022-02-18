const wordList = [
    "LUCKY",
    "MARIO",
    "INDIE",
    "EXTRA",
    "POWER",
    "GIANT",
    "CANDY",
    "ZEBRA",
    "KITTY",
    "PUPPY",
    "CODER",
    "SLACK",
    "BATCH"
];
let currentWord = wordList[Math.floor(Math.random()*wordList.length)];
guessesMade = 0;

function submitEvent(event) {
    event.preventDefault();
    currentGuess = document.getElementById("guessInput").value.toUpperCase();
    document.getElementById("guessInput").value = null;
    guessWord(currentGuess);
}  

function guessWord(guess) {
    console.log(guess);
    if (guess == currentWord) {
        console.log("good job");
    } else {
        console.log("try again");
    }
    guessesMade ++;
    var element = document.getElementById("row"+[guessesMade]);
    var children = element.children;
    for(var i=0; i<children.length; i++){
        var child = children[i];
        child.innerHTML = guess.charAt(i);
        if (guess.charAt(i) == currentWord.charAt(i)) {
            child.style.background = "var(--correct)";
        } else if (currentWord.includes(guess.charAt(i))) {
            child.style.background = "var(--present)";
        } else {
            child.style.background = "var(--absent)";
        }
    }
}

const form = document.getElementById("inputForm");
form.addEventListener('submit', submitEvent);