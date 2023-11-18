const RANDOM_QUOTE_API_URL = "https://api.quotable.io/random"; //pulls a random quote from the API
const quoteDisplayElement = document.getElementById("quoteDisplay");
const quoteInputElement = document.getElementById("quoteInput");
const timerElement = document.getElementById("timer");

let homeButton;

//wpm
const WPMElement = document.getElementById("WPMNum");
let wpm;

//completion
const accElement = document.getElementById("completionNum");

//levels
const levelNumElement = document.getElementById("levelNum");
const levelRequirements = [40, 55, 70, 85, 100];
let currentLevel = 1;
let timerInterval; //this variable allows the program to reset the timer interval on each quote. Allowing for a more accurate WPM calculation

//pulling sounds from files and loading them into the user's browser
let victorySound;
let victorySound2;
let tryAgainSound;
let tryAgainSound2;
let backgroundMusic;
let lego;

function preload() {
  victorySound = loadSound("../assets/victorySound.wav");
  victorySound2 = loadSound("../assets/victorySound2.wav");
  tryAgainSound = loadSound("../assets/tryAgainSound.wav");
  tryAgainSound2 = loadSound("../assets/tryAgainSound2.wav");
  backgroundMusic = loadSound("../assets/jacob_game_lol.wav");
  lego = loadSound("../assets/lego.mp3");
}
function setup() {
  soundFormats("mp3", "ogg", "wav");
  lego.play();
  backgroundMusic.loop();

  homeButton = createButton("Home");
  homeButton.id("myButton");
  homeButton.class("home");
  homeButton.style("background-color", color(254,245,218));
  homeButton.style('font-family','Palatino');
  homeButton.position(0,0);
  homeButton.mousePressed(() => {
    window.location.href = "../index.html";
  });
}

quoteInputElement.addEventListener("input", () => {
  //whenever there is an event in the quoteInputElement
  const arrayQuote = quoteDisplayElement.querySelectorAll("span"); //selects all span elements within the quoteDisplay Element
  const arrayValue = quoteInputElement.value.split(""); //splits the quoteInputElement into an array of characters
  let accuracy = calculateCompletion(arrayQuote, arrayValue); //implemented elsewhere
  let correct = true; //all characters typed so far (none) equal the quote
  arrayQuote.forEach((characterSpan, index) => {
    //iterates through each character in the 'arrayQuote' and compares it.
    const character = arrayValue[index];
    if (character == null) {
      //if user is not there it will not be in any class
      characterSpan.classList.remove("correct");
      characterSpan.classList.remove("incorrect");
      correct = false;
    } else if (character === characterSpan.innerText) {
      //if user types the correct character it is added to the correct class
      characterSpan.classList.add("correct");
      characterSpan.classList.remove("incorrect");
    } else {
      //if user types the incorrect character it is added to the incorrect class.
      characterSpan.classList.remove("correct");
      characterSpan.classList.add("incorrect");
      correct = false;
    }
  });
  if (correct) {
    renderNewQuote();
    if (wpm >= levelRequirements[currentLevel - 1]) {
      currentLevel++;
      levelNumElement.innerText = currentLevel;
      victorySound2.play();
    } else {
      tryAgainSound2.play();
    }
  } //once the foreach loop completes, this will be true allowing for the next quote to be generated
  wordsTyped = 0;
});

async function getRandomQuote() {
  try {
    const response = await fetch(RANDOM_QUOTE_API_URL); //awaits response from API
    const data = await response.json(); //extracts JSON content
    return data.content;
  } catch (error) {
    console.error("Error fetching random quote:", error);
  }
}

async function renderNewQuote() {
  const quote = await getRandomQuote();
  quoteDisplayElement.innerHTML = ""; //clears previous quote
  quote.split("").forEach((character) => {
    //displays the new quote
    const characterSpan = document.createElement("span");
    characterSpan.innerText = character;
    quoteDisplayElement.appendChild(characterSpan);
  });
  quoteInputElement.value = null; //resets character input
  startTimer(); //restarts the timer
}

let startTime;
function startTimer() {
  clearInterval(timerInterval); //resets the timer
  timerElement.innerText = 0; //resets the timerText
  startTime = new Date(); //used to compare to timer time below
  timerInterval = setInterval(() => {
    timer.innerText = getTimerTime();
    let wordsTyped = quoteInputElement.value.split(" ").length; //counts each word that has been input by the user
    if (wordsTyped === 1) {
      //sets the wordsTyped to 0 after above calculation
      wordsTyped = 0;
    }
    accElement.innerText = calculateCompletion(
      Array.from(quoteDisplayElement.children),
      quoteInputElement.value.split("")
    ); //implemented below
    wpm = calculateWPM(wordsTyped, getTimerTime()); //implemented below
    WPMElement.innerText = wpm;
  }, 1000);
}

function calculateCompletion(arrayQuote, arrayValue) {
  const totalCharacters = arrayQuote.length;
  let correctCharacters = 0;
  let incorrectCharacters = 0;
  arrayQuote.forEach((characterSpan, index) => {
    const character = arrayValue[index];
    if (character === characterSpan.innerText) {
      correctCharacters++;
    } else {
      incorrectCharacters++;
    }
  });
  const completion = Math.max(
    0,
    Math.floor(
      ((totalCharacters - incorrectCharacters) / totalCharacters) * 100
    )
  );
  return completion + "%";
}

function calculateWPM(wordsTyped, seconds) {
  const minutes = seconds / 60;
  const WPM = wordsTyped / minutes;
  return Math.floor(WPM);
}

function getTimerTime() {
  return Math.floor((new Date() - startTime) / 1000);
}
renderNewQuote();
