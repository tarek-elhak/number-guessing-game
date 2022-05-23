const generateRandomNumber = () => {
    return Math.ceil(Math.random()*100);
}
let randomNumber = generateRandomNumber();
let turnNumber = 1;
const submitGuessButton = document.querySelector(".submit-guess");
const guessInput = document.querySelector(".guessed-number");
const previousGuessesParagraph = document.querySelector(".previous-guesses");
previousGuessesParagraph.textContent = "previous Guesses: ";
const gameStatus = document.querySelector(".game-status");
const lastGuess = document.querySelector(".last-guess");
const startNewGameButton = document.querySelector(".start-new-game");


const failedGuessHandler = status => {
    turnNumber++;
    if (turnNumber>10){
        gameFinishedHandler("!!!GAME OVER!!!","fail");
        return
    }
    gameStatus.classList.add("failed-guess");
    gameStatus.textContent = "wrong!"
    lastGuess.textContent = `last guess was too ${status}!`
}

const gameFinishedHandler = (content,className) => {
    submitGuessButton.setAttribute("disabled","disabled");
    guessInput.setAttribute("disabled","disabled");
    gameStatus.textContent = content
    gameStatus.classList.add(className)
    gameStatus.classList.remove("failed-guess")
    lastGuess.classList.add("hide");
    startNewGameButton.classList.add("show");
}

const resetGame = () => {
    turnNumber = 1;
    startNewGameButton.classList.remove("show");
    gameStatus.classList.remove("show")
    previousGuessesParagraph.classList.remove("show");
    previousGuessesParagraph.textContent = "previous Guesses: ";
    submitGuessButton.removeAttribute("disabled");
    guessInput.removeAttribute("disabled");
    lastGuess.textContent = "";
    randomNumber = generateRandomNumber();
}

const submitGuessHandler = () => {
     previousGuessesParagraph.classList.add("show");
     gameStatus.classList.add("show");
     lastGuess.classList.remove("hide");

     let guessedNumber = Number.parseInt(guessInput.value);
     if (isNaN(guessedNumber)){
         guessedNumber = 0;
     }
     previousGuessesParagraph.append(` ${guessedNumber}`);
     if (guessedNumber === randomNumber){
         gameFinishedHandler("congratulations! You got it right!","success")
     }
     else if(guessedNumber > randomNumber){
         failedGuessHandler("high");
     }
     else{
         failedGuessHandler("low");
     }
     guessInput.value = "";
     guessInput.focus();
}
submitGuessButton.addEventListener("click",submitGuessHandler)
startNewGameButton.addEventListener("click",resetGame)

