/*localStorage.name = "leaderboard"
localStorage["name"] = "ESMAD"
localStorage.setItem("name", "points");*/

var hasWon = false;
window.rollDice = ()=>{
  if (hasWon) {
    return;
  }
  const max = 6;
  const roll = Math.ceil(Math.random() * max);
  console.log("Saiu", roll);
  let currentPlayer = players[currentPlayerTurn];
  currentPlayer.position += roll;
  luckyHoles.forEach(luckyHole=>{
    if (luckyHole.start === currentPlayer.position) {
        alert("PERDEU!");
        document.location.reload(true)
      currentPlayer.position = luckyHole.end;
    }
  });
  
  if (currentPlayer.position === 130) {
    alert("Ganhou!")
    hasWon = true;
  }
  if (currentPlayer.position === position) {
    const diff = currentPlayer.position - position;
    currentPlayerPosition = position - diff;
  }
  
  currentPlayerTurn ++;
  if (currentPlayerTurn >= players.length) {
    currentPlayerTurn = 0;
  }
  renderBoard();
}

const players = [{
name:"proj-alg",
  position: 0,
  color: "white"
}];

let currentPlayerTurn = 0;

const width = 11;
const height = 11;
const board = [];
let position = 0;
let blackSquare = false;
const luckyHoles = [{
  start: 2,
  end: 4
},{
  start: 5,
  end: 8
},{
  start: 90,
  end: 85
},{
  start: 10,
  end: 18
},{
  start: 70,
  end: 83
},{
  start:78,
  end: 50
}];

for (var y = height; y >= 0; y--) {
  let row = [];
  
  board.push(row);
  for (var x = 0; x < width; x++) {
    
    row.push({x,y,occupied:null,position,color: blackSquare ? "steelblue" : "silver"});
     //row.push({x,y,occupied:null,position,color: blackSquare ? "steelblue" : "silver"});
    blackSquare = !blackSquare;
    position ++;
  }
}

const boardSizeConst = 50;
const renderBoard = ()=>{
  let boardHTML = ``;
  board.forEach(row=>{
    row.forEach(square=>{
      boardHTML += `<div class=square style="top:${square.y * boardSizeConst}px; left:${square.x * boardSizeConst}px; background-color:${square.color}"></div>`
    });
  });
  
  players.forEach(player=>{
    let square = null;
    board.forEach(row=>{
    row.forEach(square=>{
          if (square.position === player.position) {
              console.log("player position",square);
              
              
            boardHTML += `<div class=player style="top:${square.y * boardSizeConst + 5}px; left:${square.x * boardSizeConst + 5}px;background-color:${player.color}"></div>`;
          }
      });
    });
  });

  
  
  luckyHoles.forEach(luckyHoles=>{
    
    //let start = 0;

    let startPos = {x:0,y:0};
    let endPos = {x:0,y:0};
    
    board.forEach(row=>{
      row.forEach(square=>{
        if (square.position === luckyHoles.start) {
          startPos.x = square.x * boardSizeConst;
          startPos.y = square.y * boardSizeConst;
        }
        
        if (square.position === luckyHoles.end) {
          endPos.x = square.x * boardSizeConst;
          endPos.y = square.y * boardSizeConst;
        }
      });
    });
    
    const isluckyHole = luckyHoles.end > luckyHoles.start;
    
    drawLine({color : isluckyHole ? "green" : "red",startPos,endPos});
  });
  document.getElementById("board").innerHTML = boardHTML;
}

function drawLine({color,startPos,endPos}){
  
  var c=document.getElementById("canvas");
  var ctx=c.getContext("2d");
  ctx.beginPath();
  const sizeRatio = 1;
  ctx.moveTo(startPos.x + 25,startPos.y + 25);
  ctx.lineTo(endPos.x + 25,endPos.y + 25 );
 
  ctx.lineWidth = 15;
  ctx.strokeStyle = color;
  ctx.stroke();
}

renderBoard();
