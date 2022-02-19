const wordList = [
    "ABBEY"
];
let solution = wordList[Math.floor(Math.random()*wordList.length)];
let guessesMade = 0;
let usedLetters = "";

function letterOccurences(str,find) {
    count = str.split(find).length - 1
    return count;
}

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
    for(var i=0; i<children.length; i++){
        var child = children[i];
        child.innerHTML = guess.charAt(i);
        if (guess.charAt(i) == solution.charAt(i) && !usedLetters.includes(guess.charAt(i))) {
            child.style.background = "var(--correct)";
            o = letterOccurences(solution,solution.charAt(i));
            if (o == 1) {
                usedLetters += guess.charAt(i);
            }
        } else if (solution.includes(guess.charAt(i)) && !usedLetters.includes(guess.charAt(i))) {
            child.style.background = "var(--present)";
            o = letterOccurences(solution,guess.charAt(i));
            if (o == 1) {
                usedLetters += guess.charAt(i);
            }
        } else {
            child.style.background = "var(--absent)";
        }
    }
    usedLetters = "";
    if (guess == solution) {
        let el = document.getElementById("player-input-container");
        el.remove();
        document.getElementById("game").innerHTML += "<h1>Well Done!</h1><p>You correctly guessed the word " + solution + "!</p><button id='reset' onclick='window.location.reload();'>Play Again</button>";
    } else if (guessesMade == 6) {
        let el = document.getElementById("player-input-container");
        el.remove();
        document.getElementById("game").innerHTML += "<h1>Game Over!</h1><p>The word was " + solution + ".</p><button id='reset' onclick='window.location.reload();'>Play Again</button>";
    }
}

const form = document.getElementById("inputForm");
form.addEventListener('submit', submitEvent);