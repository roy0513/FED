'use strict'
const selectionButtons = document.querySelectorAll('[data-selection]')
const finalColumn = document.querySelector('[data-final-column]')
const computerScoreSpan = document.querySelector('[data-computer-score]')
const yourScoreSpan = document.querySelector('[data-your-score]')
const SELECTIONS = [
  {
    name: 'rock',
    emoji: '✊',
    beats: 'scissors'
  },
  {
    name: 'paper',
    emoji: '✋',
    beats: 'rock'
  },
  {
    name: 'scissors',
    emoji: '✌',
    beats: 'paper'
  }
]


selectionButtons.forEach(selectionButton => {
  //when click the button the following function will be call
  selectionButton.addEventListener('click', e => {
    //get the slection name you made
    const selectionName = selectionButton.dataset.selection
    //find the selection you made in the array
    const selection = SELECTIONS.find(selection => selection.name === selectionName)
    //past the selection into the makeSelection function
    makeSelection(selection)
  })
})

function makeSelection(selection) {
  //get the random selection
  const computerSelection = randomSelection()
  //check if you win
  const yourWinner = isWinner(selection, computerSelection)
  //check if the computer win
  const computerWinner = isWinner(computerSelection, selection)

  addSelectionResult(computerSelection, computerWinner)
  addSelectionResult(selection, yourWinner)
  // if you win you add the score
  if (yourWinner) incrementScore(yourScoreSpan)
  //if computer win computer add the score
  if (computerWinner) incrementScore(computerScoreSpan)
}
//add the score 
function incrementScore(scoreSpan) {
  scoreSpan.innerText = parseInt(scoreSpan.innerText) + 1
}
//add the result as a grid
//take in two parameter one is the selection you made and the boolean result
function addSelectionResult(selection, winner) {
  const div = document.createElement('div')
  div.innerText = selection.emoji
  div.classList.add('result-selection')

  if (winner) div.classList.add('winner')
  //insert the div after div with finalColumn class
  finalColumn.after(div)
}
//if the selection beats string same as the opponent selection name return true
function isWinner(selection, opponentSelection) {
  return selection.beats === opponentSelection.name
}
//generate random selection
function randomSelection() {
  //generate 0-2
  const randomIndex = Math.floor(Math.random() * SELECTIONS.length)
  return SELECTIONS[randomIndex]
}

