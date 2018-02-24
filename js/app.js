//==============================================================
// JavaScript
// =============================================================

// Variables

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



// Functions

function getRandomPhraseAsArray(array) {
  return array[Math.round(Math.random() * (array.length - 1))].split('');
}

function addPhraseToDisplay(array) {
  for (let i = 0; i < array.length; i++) {
    const li = document.createElement('li');
    li.textContent = array[i];
    document.querySelector('ul').appendChild(li);
    if (array[i] != ' ') {
      li.classList.add('letter');
    } else {
      li.classList.add('space');
    }
  }
}

function checkLetter(btn) {
  const letters = document.querySelectorAll('.letter');
  let matchLetter = null;

  for ( let i = 0; i < letters.length; i++ ) {
    if ( btn.textContent == letters[i].textContent ) {
      matchLetter = btn.textContent;
      letters[i].className += ' show';
    }
  }
  return matchLetter;
}



// Event Listeners

startButton.addEventListener('click', () => startButton.parentElement.style.display = 'none');

qwerty.addEventListener('click', (event) => {
  const buttonClicked = event.target;
  if (event.target.tagName === 'BUTTON') {
    buttonClicked.className = 'chosen';
    buttonClicked.disabled = true;
    const letterMatch = checkLetter(buttonClicked);
    console.log(letterMatch);
  }
});



const phraseArray = getRandomPhraseAsArray(phrases);
addPhraseToDisplay(phraseArray);