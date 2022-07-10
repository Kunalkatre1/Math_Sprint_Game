// Pages
const gamePage = document.getElementById('game-page');
const scorePage = document.getElementById('score-page');
const splashPage = document.getElementById('splash-page');
const countdownPage = document.getElementById('countdown-page');
// Splash Page
const startForm = document.getElementById('start-form');
const radioContainers = document.querySelectorAll('.radio-container');
const radioInputs = document.querySelectorAll('input');
const bestScores = document.querySelectorAll('.best-score-value');
// Countdown Page
const countdown = document.querySelector('.countdown');
// Game Page
const itemContainer = document.querySelector('.item-container');
// Score Page
const finalTimeEl = document.querySelector('.final-time');
const baseTimeEl = document.querySelector('.base-time');
const penaltyTimeEl = document.querySelector('.penalty-time');
const playAgainBtn = document.querySelector('.play-again');

// Equations
let questionAmount = 0;
let equationsArray = [];

// Game Page
let firstNumber = 0;
let secondNumber = 0;
let equationObject = {};
const wrongFormat = [];

// Time

// Scroll

//Get Random Number upto a Max number
function getRandomInt(max){
  return Math.floor(Math.random() * Math.floor(max));
}

// Create Correct/Incorrect Random Equations
function createEquations() {
  // Randomly choose how many correct equations there should be
  const correctEquations = getRandomInt(questionAmount);
  console.log('correct equations:', correctEquations);
 
  // Set amount of wrong equations
  const wrongEquations = questionAmount - correctEquations;
  console.log('Wrong equations: ', wrongEquations);
 
  // Loop through, multiply random numbers up to 9, push to array
  for (let i = 0; i < correctEquations; i++) {
    firstNumber = getRandomInt(9);
    secondNumber = getRandomInt(9);
    const equationValue = firstNumber * secondNumber;
    const equation = `${firstNumber} x ${secondNumber} = ${equationValue}`;
    equationObject = { value: equation, evaluated: 'true' };
    equationsArray.push(equationObject);
  }
  
  // Loop through, mess with the equation results, push to array
  for (let i = 0; i < wrongEquations; i++) {
    firstNumber = getRandomInt(9);
    secondNumber = getRandomInt(9);
    const equationValue = firstNumber * secondNumber;
    wrongFormat[0] = `${firstNumber} x ${secondNumber + 1} = ${equationValue}`;
    wrongFormat[1] = `${firstNumber} x ${secondNumber} = ${equationValue - 1}`;
    wrongFormat[2] = `${firstNumber + 1} x ${secondNumber} = ${equationValue}`;
    const formatChoice = getRandomInt(3);
    const equation = wrongFormat[formatChoice];
    equationObject = { value: equation, evaluated: 'false' };
    equationsArray.push(equationObject);
  }
  console.log('Equations array: ', equationsArray);
}

// Dynamically adding correct/incorrect equations
// function populateGamePage() {
//   // Reset DOM, Set Blank Space Above
//   itemContainer.textContent = '';
//   // Spacer
//   const topSpacer = document.createElement('div');
//   topSpacer.classList.add('height-240');
//   // Selected Item
//   const selectedItem = document.createElement('div');
//   selectedItem.classList.add('selected-item');
//   // Append
//   itemContainer.append(topSpacer, selectedItem);

//   // Create Equations, Build Elements in DOM

//   // Set Blank Space Below
//   const bottomSpacer = document.createElement('div');
//   bottomSpacer.classList.add('height-500');
//   itemContainer.appendChild(bottomSpacer);
// }

//Countdown start
function startCountdown(){
  countdown.textContent = '3';

  setTimeout(() => {
    countdown.textContent = '2';
  }, 1000);

  setTimeout(() => {
    countdown.textContent = '1';
  }, 2000);

  setTimeout(() => {
    countdown.textContent = 'GO!';
  }, 3000);
}

//Navigate from Splash Page to Countdown Page
function showCountdown(){
  countdownPage.hidden = false;
  splashPage.hidden = true;
  startCountdown();
  createEquations();
}

// Get the values from selected radio button
function getRadioValue(){
  let radioValue;
  radioInputs.forEach((radioInput) => {
    if(radioInput.checked){
      radioValue = radioInput.value;
    }
  });
  return radioValue;
}

// Form that decides amount of questions
function selectQuestionAmount(e){
  e.preventDefault();
  questionAmount = getRadioValue();
  console.log(questionAmount);
  //Undefined means condition is false
  if(questionAmount){
    showCountdown();
  }
}

startForm.addEventListener('click', () =>{
  radioContainers.forEach((radioEl) => {
    //Remove selected Label styling
    radioEl.classList.remove('selected-label');
    if(radioEl.children[1].checked){
      radioEl.classList.add('selected-label');
    }
  });
});

//EVentListeners
startForm.addEventListener('submit', selectQuestionAmount);