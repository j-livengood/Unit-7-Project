//===============================================================================================
// JavaScript
// ==============================================================================================

// Variables ====================================================================================

const qwerty = document.querySelector('#qwerty');
const phrase = document.querySelector('#phrase');
const startButton = document.querySelector('.btn__reset');
let missed = 0;

const phrases = [
  'I am a leaf on the wind',
  'I aim to misbehave',
  'Lets be bad guys',
  'Bullet in the brain pan squish',
  'Im not a grandpa'
]



// Functions ==========================================================================================

// create random number, get the phrase at that position in the phrases array, split into single parts
function getRandomPhraseAsArray(array) {
  return array[Math.round(Math.random() * (array.length - 1))].split('');
}

// take the split array from above and create then append li elements for each array item
function addPhraseToDisplay(array) {
  for (let i = 0; i < array.length; i++) {
    const li = document.createElement('li');
    li.textContent = array[i].toUpperCase();
    document.querySelector('ul').appendChild(li);
    
    if (array[i] != ' ') {
      li.classList.add('letter');
    } else {
      li.classList.add('space');
    }
  }
}

// if the clicked letter matches a letter in the array, show the letter
function checkLetter(button) {
  const letters = document.querySelectorAll('.letter');
  let match = null;
  
  for (let i = 0; i < letters.length; i++) {
    if (button.textContent.toUpperCase() == letters[i].textContent) {
      match = button.textContent;
      letters[i].classList.add('show');
    }
  }
  return match;
}

// check score and display appropriate overlay screen
function checkWin() {
  const shownLetters = document.querySelectorAll('.show');
  const letters = document.querySelectorAll('.letter');
  const overlay = document.querySelector('#overlay');
  
  if (shownLetters.length == letters.length) {
    overlay.classList.replace('start', 'win');
    overlay.children[0].textContent = 'You Won!';
    overlay.children[1].textContent = 'Play Again';
    overlay.style.display = '';
  } else if (missed === 5) {
    overlay.classList.replace('start', 'lose');
    overlay.children[0].textContent = 'You Lost!';
    overlay.children[1].textContent = 'Try Again';
    overlay.style.display = '';
  }
}

// restart game after win or loss
function restart() {
  location.reload();
}



// Event Listeners =======================================================================

// start game or reset game
startButton.addEventListener('click', () => {
  if (startButton.textContent === 'Start Game') {
    startButton.parentElement.style.display = 'none';
  } else {
    restart();
  }
});

// listen for clicked keyboard letter and update score
qwerty.addEventListener('click', (event) => {
  const buttonClicked = event.target;
  
  if (event.target.tagName === 'BUTTON') {
    buttonClicked.className = 'chosen';
    buttonClicked.disabled = true;
    
    const letterFound = checkLetter(buttonClicked);
    
    if (letterFound == null) {
      missed += 1;
    }
    
    if (missed >= 1 && missed <= 5) {
      const hearts = document.getElementsByTagName('img');
      hearts[missed - 1].src = 'images/lostHeart.png';
    }
  }
  checkWin();
});



// Initiate Game ========================================================================

const phraseArray = getRandomPhraseAsArray(phrases);
addPhraseToDisplay(phraseArray);