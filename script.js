const wordList = [
    "ABBEY"
];
let solution = wordList[Math.floor(Math.random()*wordList.length)];
let guessesMade = 0;

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
    var answerLetters = solution.split('');
    var guessLetters = guess.split('');
    // Make all gray at first
    for(var i=0; i<children.length; i++){
        var child = children[i];
        child.innerHTML = guess.charAt(i);
        child.style.background = "var(--absent)";
    }
    // Change colors to green if same letter and same place
    for(var i=0; i<children.length; i++){
        var child = children[i];
        child.innerHTML = guess.charAt(i);
        if (guessLetters[i] == solution.charAt(i)) {
            child.style.background = "var(--correct)";
            answerLetters[i] = null;
            guessLetters[i] = null;
        }
    }
    //Change colors to yellow if same letter and not the same place
    for(var i=0; i<children.length; i++){
        var child = children[i];
        child.innerHTML = guess.charAt(i);
        if (guessLetters[i] != null && answerLetters.includes(guessLetters[i])) {
            child.style.background = "var(--present)";
            answerLetters[answerLetters.indexOf(guessLetters[i])] = null;
        }
    }

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