'use strict';

const firstStartBox = document.querySelector('.first_start_box');
const settingBox = document.querySelector('.setting__box');
const popupBox = document.querySelector('.pop-up');
const popUpMessage = document.querySelector('.pop-up__message');
const carrotBox = document.querySelector('.carrot__box');
const timer = document.querySelector('.timer');
const startBtn = document.querySelector('.btn__start');
const firstStartBtn = document.querySelector('.btn__first_start');
const resetBtn = document.querySelector('.btn__reset');
const carrotCount = document.querySelector('.count');
const audioBgm = new Audio('./sound/bg.mp3');
const audioAlert = new Audio('./sound/alert.wav');
const audioWin = new Audio('./sound/game_win.mp3');
const audioCarrot = new Audio('./sound/carrot_pull.mp3');
const audioBug = new Audio('./sound/bug_pull.mp3');

const CARROT_SIZE = 100;
const GAME_DURATION = 5;

let started = false;

// Start Game
function onStart() {
  started = true;
  // song play
  audioBgm.currentTime = 0;
  audioBgm.play();

  carrotCount.innerHTML = '8';

  // Set carrots and bugs on random loncation
  createElement();

  //Timer start
  startTimer(GAME_DURATION);
}

// Start button
startBtn.addEventListener('click', () => {
  startBtn.classList.add('hidden');
  onStart();
});

firstStartBtn.addEventListener('click', () => {
  showGameStatus();
  onStart();
  firstStartBox.classList.add('none');
});

function showGameStatus() {
  settingBox.classList.remove('hidden');
}

// Timer
let timeCountdown;
function startTimer(GAME_DURATION) {
  let remainingSec = 0;
  timeCountdown = setInterval(() => {
    timer.innerHTML = `00:0${GAME_DURATION - remainingSec}`;
    remainingSec++;
    console.log(remainingSec);

    startBtn.addEventListener('click', () => {
      startBtn.classList.remove('hidden');
      clearInterval(timeCountdown);
      gameReply();
    });

    if (remainingSec > GAME_DURATION) {
      timer.innerHTML = `Time over!`;
      gameFail();
    }
  }, 1000);
}

// Create element
function createElement() {
  for (let i = 1; i <= 8; i++) {
    const createCarrot = document.createElement('img');
    createCarrot.setAttribute('src', './img/carrot.png');
    createCarrot.setAttribute('class', 'carrot__img');
    createCarrot.setAttribute('data-value', `${[i]}`);
    createLocaCarrot(createCarrot);
  }

  for (let i = 1; i <= 8; i++) {
    const createBug = document.createElement('img');
    createBug.setAttribute('src', './img/bug.png');
    createBug.setAttribute('class', 'bug__img');
    createLocaBug(createBug);
  }
}

// Make random coordinates with min, max
function randomNumber(min, max) {
  return Math.random() * (max - min) + min;
}

function elementPosition(element) {
  const carrotBoxRectX = carrotBox.getBoundingClientRect().width;
  const carrotBoxRectY = carrotBox.getBoundingClientRect().height;

  element.style.position = 'absolute';
  const x = randomNumber(0, carrotBoxRectX - CARROT_SIZE);
  const y = randomNumber(0, carrotBoxRectY - CARROT_SIZE);

  element.style.left = `${x}px`;
  element.style.top = `${y}px`;

  carrotBox.appendChild(element);
}

function createLocaCarrot(element) {
  elementPosition(element);

  element.addEventListener('click', (e) => {
    audioCarrot.play();
    element.classList.add('hidden');
    let counter = parseInt(carrotCount.innerHTML);
    let result = counter - 1;
    carrotCount.innerHTML = result;

    if (result == 0) {
      gameWin();
    }
  });
}

function createLocaBug(element) {
  elementPosition(element);

  element.addEventListener('click', () => {
    audioBug.play();
    gameFail();
  });
}

// When game is fail
function gameFail() {
  audioBug.play();
  audioBgm.pause();

  clearInterval(timeCountdown);
  startBtn.classList.toggle('hidden');
  showPopUp('lose');

  while (carrotBox.firstChild) {
    carrotBox.firstChild.remove();
  }
}

// When game is win
function gameWin() {
  audioBgm.pause();
  audioWin.play();

  clearInterval(timeCountdown);
  startBtn.classList.toggle('hidden');
  showPopUp('win');

  while (carrotBox.firstChild) {
    carrotBox.firstChild.remove();
  }
}

// When click stop button
function gameReply() {
  audioBgm.pause();
  audioAlert.play();

  showPopUp('stop');

  while (carrotBox.firstChild) {
    carrotBox.firstChild.remove();
  }
}

function showPopUp(gameOutcome) {
  popupBox.classList.remove('hidden');
  switch (gameOutcome) {
    case 'win':
      popUpMessage.innerHTML = `YOU ARE THE BEST FRIEND❗️`;
      break;
    case 'lose':
      popUpMessage.innerHTML = `I'M HUNGRY..`;
      break;
    case 'stop':
      popUpMessage.innerHTML = 'REPLAY❓';
  }
}

// Reset button
document.body.addEventListener('click', (e) => {
  if (e.target.className == 'fas fa-undo') {
    startBtn.classList.toggle('hidden');
    popupBox.classList.add('hidden');
    onStart();
  }
});
