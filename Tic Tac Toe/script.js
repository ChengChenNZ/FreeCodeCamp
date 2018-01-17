var origBoard;
const huPlayer = "O";
const aiPlayer = "X"
const winCombos = [
  [0,1,2],
  [3,4,5],
  [6,7,8],
  [0,3,6],
  [1,4,7],
  [2,5,8],
  [0,4,8],
  [6,4,2]
]

const cells = document.querySelectorAll('.cell');
startGame();

function startGame(){
  document.querySelector(".endgame").style.display = "none";
  origBoard = Array.from(Array(9).keys());
  for (var i = 0; i < cells.length; i ++) {
    cells[i].innerText = "";
    cells[i].style.removeProperty('background-color');
    cells[i].addEventListener('click',turnClick,false);
  }
}
function turnClick(cells){
  turn(cells.target.id,huPlayer)
}

function turn(cellsId, player){
  origBoard[cellsId] = player;
  document.getElementById(cellsId).innerText = player;
  let gameWon = checkWin(origBoard,player);
  if(gameWon) gameOver(gameWon);
}

function checkWin(board, player){
  let plays = board.reduce((a, e, i) =>
    (e === player) ? a.concat(i) : a, []
  );
  console.log(plays);
  console.log(player);
  let gameWon = null;
  //每次迭代时将不同的属性分配给变量
  for (let [index,win] of winCombos.entries()){
    if(win.every(elem => plays.indexOf(elem) > -1)){
      gameWon = {index: index, player: player};
      break
    }
  }
  return gameWon
}
function gameOver(gameWon){
  for (let index of winCombos[gameWon.index]) {
		document.getElementById(index).style.backgroundColor =
			gameWon.player == huPlayer ? "blue" : "red";
	}
	for (var i = 0; i < cells.length; i++) {
		cells[i].removeEventListener('click', turnClick, false);

  }
}
