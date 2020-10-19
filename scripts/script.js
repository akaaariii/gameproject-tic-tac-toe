const cells = new Array(9);
const circleElement = document.querySelector('.circle');
const crossElement = document.querySelector('.cross');
const cellsElements = document.querySelectorAll('.js-cell');
const msgElement = document.querySelector('.js-state-message');
const restartButton = document.querySelector('.js-restart');
let handCount = 0;
let progress = true;
let isCircleTurn = true;

const winningPatterns = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6]
]

function onLoad() {
    cellsElements.forEach(ele => {
      ele.addEventListener('click', onClickCell)
    })

    restartButton.addEventListener('click', () => location.reload())
    return
}

function turnToggle(){
    if(isCircleTurn){
        circleElement.classList.remove('active')
        crossElement.classList.add('active')
    } else {
        crossElement.classList.remove('active')
        circleElement.classList.add('active')
    }
    isCircleTurn = !isCircleTurn;
}

function checkResult(){
    if (handCount >= 9) {
        progress = false
        msgElement.innerText = 'draw'
        return
    }

    // The some() method checks if any of the elements in an array pass a test and then returns true or false
    const done = winningPatterns.some(pattern => {
        return cells[pattern[0]] && (cells[pattern[0]] === cells[pattern[1]] && cells[pattern[0]] === cells[pattern[2]])
    })

    if(done){
        progress = false
        const char = isCircleTurn ? '○' : '×'
        msgElement.innerText = `${char} win!!`
    }
}

function onClickCell(e) {
    const index = e.target.getAttribute('data-key')
    // cannot click the same cell and if the game is already done, players cannot click any cells
    if (cells[index-1] || !progress) {
      return
    }

    const char = isCircleTurn ? '○' : '×'
    cells[index-1] = char
    e.target.innerText = char
    
    checkResult()
    turnToggle()
    handCount++
}
onLoad()