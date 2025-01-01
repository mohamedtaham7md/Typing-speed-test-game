const gameStartBtn = document.querySelector(".game-start-btn");
gameStartBtn.classList.add("hide");
const gameEnd = document.querySelector(".game-end-message");
const TimerElement = document.querySelector(
  ".game-statics .time"
).firstElementChild;
const wordGame = document.querySelector(".game-word");
let selectedLevel = "normal";
let levelTime = 0;
let selectedWordList = [];
const gameInput = document.getElementById("game-input");
const gameLvlsSelect = document.getElementById("game-levels");
let selectedWord = "";
const gameScoreTotal = document.querySelector(".score .total");

const playerScore = document.querySelector(".game-statics .score .got");
let playerScoreCount = 0;
gameLvlsSelect.addEventListener("change", setSelectedLevels);
console.log(gameInput);

gameInput.addEventListener("paste", (event) => {
  event.preventDefault();
});
gameStartBtn.addEventListener("click", gameStart);

function gameStart() {
  //resetInput
  gameInput.value = "";
  //hide start btn
  gameStartBtn.classList.add("hide");
  //reset game end word
  gameEnd.textContent = "";
  //disable level Select option
  gameLvlsSelect.setAttribute("disabled", "true");
  //select word list based on level
  selectWordList();
  console.log(selectedWordList);
  //focus input
  gameInput.focus();

  //select Word
  generateWord();
  //start timer
  const startTime = performance.now();

  startTimer(startTime);
}

function selectWordList() {
  const wordsList = {
    easy: [
      "dog",
      "cat",
      "hat",
      "sun",
      "pen",
      "fish",
      "book",
      "ball",
      "apple",
      "tree",
      "car",
      "cake",
      "moon",
      "milk",
      "star",
      "shoe",
      "bus",
      "bed",
      "egg",
      "bat",
      "rain",
      "frog",
      "sock",
      "kite",
      "key",
    ],
    normal: [
      "orange",
      "banana",
      "jacket",
      "guitar",
      "camera",
      "jungle",
      "window",
      "elephant",
      "monkey",
      "tiger",
      "flower",
      "giraffe",
      "mountain",
      "planet",
      "rabbit",
      "umbrella",
      "whale",
      "notebook",
      "island",
      "village",
      "laptop",
      "pencil",
      "basket",
      "skateboard",
      "diamond",
    ],
    hard: [
      "astronomy",
      "architecture",
      "camouflage",
      "hypothesis",
      "mischievous",
      "parliament",
      "quarantine",
      "rendezvous",
      "synchronous",
      "metamorphosis",
      "eccentricity",
      "connoisseur",
      "philanthropy",
      "infrastructure",
      "catastrophe",
      "jurisdiction",
      "psychology",
      "magnanimous",
      "serendipity",
      "perseverance",
      "subconscious",
      "transcendental",
      "procrastination",
      "perpendicular",
      "philosophy",
    ],
  };

  selectedWordList = wordsList[selectedLevel];
  //fill total score
  gameScoreTotal.textContent = selectedWordList.length;
}
function generateWord() {
  if (selectedWordList.length > 0) {
    const random = Math.floor(Math.random() * selectedWordList.length);
    const wordGame = document.querySelector(".game-word");
    selectedWord = selectedWordList[random];
    wordGame.textContent = selectedWord;
    selectedWordList.splice(random, 1);
    const upcomingWords = document.querySelector(".game-upcoming-words");
    const container = document.createDocumentFragment();
    upcomingWords.textContent = "";
    selectedWordList.forEach((word) => {
      const newSpan = document.createElement("span");
      newSpan.textContent = word;
      container.append(newSpan);
    });
    upcomingWords.append(container);
  }
}

function setSelectedLevels(event) {
  const gameLevels = {
    easy: 5,
    normal: 3,
    hard: 2,
  };
  selectedLevel = this.value;
  levelTime = gameLevels[selectedLevel] * 1000;
  fillLvlData();
  gameStartBtn.classList.remove("hide");
}

function startTimer(startTime, stopTimer = false) {
  if (stopTimer === true) {
    TimerElement.textContent = 0;
  } else {
    let currTime = performance.now();
    const elapsedTime = currTime - startTime;
    const seconds = Math.floor(elapsedTime / 1000);
    TimerElement.textContent = seconds;

    if (elapsedTime < levelTime) {
      setTimeout(() => startTimer(startTime), 1000 - (elapsedTime % 1000));
    } else {
      userWriting(selectedWord);
    }
  }
}

function userWriting(selectedWord) {
  const userInput = gameInput.value.toLowerCase();
  if (userInput === selectedWord.toLowerCase()) {
    gameInput.value = "";
    gameEnd.textContent = "fast";
    playerScoreCount++;
    playerScore.textContent = playerScoreCount;
    if (selectedWordList.length > 0) {
      generateWord();
      startTimer(performance.now());
    } else {
      gameEnd.textContent = `congratulations you finished the ${selectedLevel} level`;
      resetGame();
    }
  } else {
    gameEnd.textContent = "slow";
    resetGame();
  }
  gameEnd.classList.toggle("good", gameEnd.textContent === "fast");
  gameEnd.classList.toggle("slow", gameEnd.textContent === "slow");
}

function fillLvlData() {
  const gameMessageLvl = document.querySelector(".game-message .lvl");
  const gameMessageSec = document.querySelector(".game-message .seconds");
  console.log(levelTime);

  gameMessageLvl.textContent = selectedLevel === "" ? 0 : selectedLevel;
  gameMessageSec.textContent = isNaN(levelTime) ? 0 : levelTime / 1000;
}

function resetGame() {
  gameLvlsSelect.value = "";
  gameLvlsSelect.removeAttribute("disabled");
  const event = new Event("change");
  gameLvlsSelect.dispatchEvent(event);
  playerScore.textContent = 0;
  gameScoreTotal.textContent = 0;
  TimerElement.textContent = 0;
  gameStartBtn.classList.add("hide");
  gameInput.value = "";
  wordGame.textContent = "";
}
