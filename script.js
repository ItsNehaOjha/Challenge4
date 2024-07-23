document.addEventListener("DOMContentLoaded", function () {
    const guessInput = document.getElementById("yourGuess");
    const leftTurn = document.getElementById("leftTurn");
    const dotsOfTurns = document.querySelectorAll(".dot");
    const wrongGuess = document.getElementById("wrongGuess");
    const answerBox = document.getElementById("answerBox");
    const randomBtn = document.querySelector(".random");
    const resetBtn = document.querySelector(".reset");

    let words = [
        "puzzling", "mystical", "journeys", 
        "explorer",  "treasure",  "escaping",
        "riddles", "secrets", "phantoms",  "clueless", 
        "questing", "solving", "finding", "searches", 
         "gigantic",   "universe",
         "forever", "freedom", "harmony", "illusion",
        "infinity",  "marathon", "paradise"
    ];
    let usedWords = [];
    let correctWord = "";
    let scrambledWord = "";
    let currentWord = [];
    let turnsLeft = 6;
    let wrongLetters = [];

    function scrambleWord(word) {
        return word.split('').sort(() => 0.5 - Math.random()).join('');
    }

    function getNextWord() {
        if (words.length === 0) {
            words = usedWords;
            usedWords = [];
        }
        let word = words.splice(Math.floor(Math.random() * words.length), 1)[0];
        usedWords.push(word);
        return word;
    }

    function initializeGame() {
        correctWord = getNextWord();
        scrambledWord = scrambleWord(correctWord);
        currentWord = new Array(correctWord.length).fill("");
        turnsLeft = 6;
        wrongLetters = [];
        answerBox.innerHTML = ""; // Clear previous inputs

        for (let i = 0; i < correctWord.length; i++) {
            let input = document.createElement("input");
            input.type = "text";
            input.maxLength = 1;
            input.classList.add("ans");
            input.addEventListener("input", handleInput);
            answerBox.appendChild(input);
        }

        answerBox.children[0].focus(); // Focus the first input box
        updateDisplay();
    }

    function updateDisplay() {
        guessInput.textContent = scrambledWord.split('').join(' ');
        leftTurn.textContent = `(${turnsLeft}/6):`;
        dotsOfTurns.forEach((dot, index) => {
            if (index < turnsLeft) {
                dot.classList.add("active");
            } else {
                dot.classList.remove("active");
            }
        });
        wrongGuess.textContent = wrongLetters.join(", ");
        let inputs = answerBox.querySelectorAll(".ans");
        inputs.forEach((input, index) => {
            input.value = currentWord[index] || "";
        });
    }

    function makeGuess(letter, index) {
        if (correctWord[index] === letter) {
            currentWord[index] = letter;
            updateDisplay();
            let nextInput = answerBox.children[index + 1];
            if (nextInput) {
                nextInput.focus();
            }
        } else {
            turnsLeft--;
            wrongLetters.push(letter);
            updateDisplay();
        }
        checkGameStatus();
    }

    function checkGameStatus() {
        if (currentWord.join('') === correctWord) {
            alert("🎉 Success! You've guessed the word.");
            initializeGame();
        } else if (turnsLeft === 0) {
            alert("Game Over! You've used all your turns.");
            initializeGame();
        }
    }

    function handleInput(event) {
        let input = event.target;
        let letter = input.value.toLowerCase();
        let index = Array.from(answerBox.children).indexOf(input);
        if (letter.match(/[a-z]/) && letter.length === 1) {
            input.value = ""; // Clear the input after capturing the letter
            makeGuess(letter, index);
        } else {
            input.value = ""; // Clear invalid input
        }
    }

    randomBtn.addEventListener("click", initializeGame);
    resetBtn.addEventListener("click", initializeGame);

    initializeGame();
});
