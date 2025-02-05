// Which player's turn is it?
let currentPlayer = "X";
// Get the 'X' in "Player X's turn"
const playerDisplay = document.querySelector(".display-player");
// Get an array containing all the tiles on the page
const tiles = Array.from(document.querySelectorAll(".tile"));
// Reset button
const resetButton = document.querySelector('#reset');
// Announcer "Player X Won"
const announcer = document.querySelector(".announcer");
resetButton.addEventListener("click", resetBoard);
const PLAYERX_WON = "PLAYERX_WON";
const PLAYERO_WON = "PLAYERO_WON";
const TIE = "TIE";
const xScore = document.getElementById("x-score");
const oScore = document.getElementById("o-score");
const tieScore = document.getElementById("tie-score");



//Empty board
let board = ["", "", "", "", "", "", "", "", ""];

function announce(type){
    switch (type){
        case PLAYERX_WON:
            announcer.innerHTML = "Player X Won";
            xScore.innerHTML++;
            break;

        case PLAYERO_WON:
            announcer.innerHTML = "Player O Won";
            oScore.innerHTML++;
            break;

        case TIE:
            announcer.innerHTML = "Tie";
            tieScore.innerHTML++;
        
    }
    announcer.classList.remove("hide");
}

/*
  [0] [1] [2]
  [3] [4] [5]
  [6] [7] [8]
*/

const winningConditions = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6],  ];
function checkForWin() {
    let roundWon = false;
    for(let i = 0; i <= 7; i++){
        const winCondition = winningConditions[i];
        const a = board[winCondition[0]];
        const b = board[winCondition[1]];
        const c = board[winCondition[2]];
        if (a === "" || b === "" || c === "") {
            continue;
        }
        if (a === b && b === c) {
            roundWon = true;
            break;
          }
        
        
    }
if(roundWon){
        announce(currentPlayer === "X" ? PLAYERX_WON : PLAYERO_WON);
        return;
    }
    if (!board.includes("")){
        announce(TIE);
    } 
}

function updateBoard(index){
    board[index] = currentPlayer;
}
function resetBoard(){
    board = ["", "", "", "", "", "", "", "", ""];
    announcer.classList.add("hide");

    // Change back to player 'X'
    if(currentPlayer == "O"){
        changePlayer();
    }
    // Clear all tiles
    for(let i = 0; i < tiles.length; i++){
        tiles[i].innerText = "";
    }
}
// Change to the other player
function changePlayer() {
    if(currentPlayer == "X"){
        currentPlayer = "O";
    }else{
        currentPlayer = "X";
    }
    playerDisplay.innerHTML = currentPlayer;
    playerDisplay.classList.remove("X-display");
    playerDisplay.classList.remove("O-display");
playerDisplay.classList.add(currentPlayer + "-display");
}
// Or: ||
// Check if the player can use that tile
// Boolean can either be true or false
const isValidAction = (tile) => { // boolean function
    if (tile.innerText == 'X' || tile.innerText == 'O'){
        // The tile is full
        return false;
    }else if (announcer.classList.contains("hide")) {
        // The tile is empty
        return true;
    }
}
// What happens when a tile is clicked
const userAction = (tile, index) => {
    if (isValidAction(tile)) {
        tile.innerText = currentPlayer;  // Place the player's mark 
        tile.classList.add(currentPlayer + "-display");
        updateBoard(index);
        checkForWin(); // Check if either player has won
        changePlayer();  // Change to the next player       
    }
}
// Add an event listener to each tile
for(let i = 0; i < tiles.length; i ++ ){
    tiles[i].addEventListener("click", () => userAction(tiles[i], i));}
