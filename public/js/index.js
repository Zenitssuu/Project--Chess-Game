const socket = io();
const chess = new Chess();

const boardElement = document.querySelector(".chessBoard");

let draggedPiece = null;
let sourceSquare = null;
let playerRole = null;

const renderedBoard = () => {
  const board = chess.board();
  boardElement.innerHTML = "";
  board.forEach((row, rowIdx) => {
    row.forEach((square, squareIdx) => {
      const squareElement = document.createElement("div");
      squareElement.classList.add(
        "square",
        (rowIdx + squareIdx) % 2 == 0 ? "light" : "dark"
      );

      squareElement.dataset.row = rowIdx;
      squareElement.dataset.col = squareIdx;

      if (square) {
        const pieceElement = document.createElement("div");
        pieceElement.classList.add(
          "piece",
          square.color === "w" ? "white" : "black"
        );

        pieceElement.innerText = getPieceUnicode(square);
        pieceElement.draggable = playerRole === square.color;

        pieceElement.addEventListener("dragstart", (e) => {
          if (pieceElement.draggable) {
            draggedPiece = pieceElement;
            sourceSquare = { row: rowIdx, col: squareIdx };
            e.dataTransfer.setData("text/plain", "");
          }
        });

        pieceElement.addEventListener("dragend", (e) => {
          draggedPiece = null;
          sourceSquare = null;
        });
        // console.log(pieceElement);
        squareElement.appendChild(pieceElement);
        // console.log(squareElement);
      }
      squareElement.addEventListener("dragover", (e) => {
        e.preventDefault();
      });

      squareElement.addEventListener("drop", (e) => {
        e.preventDefault();
        if (draggedPiece) {
          const targetSource = {
            row: parseInt(squareElement.dataset.row),
            col: parseInt(squareElement.dataset.col)
          };
          handleMove(sourceSquare, targetSource);
        }
      });
      boardElement.appendChild(squareElement);
    //   console.log(boardElement);
    });
  });

  if(playerRole==='b'){
    boardElement.classList.add('flipped')
  }
  else{
    boardElement.classList.remove('flipped');
  }
};

const handleMove = (source,target) => {
    const move = {
        from:`${String.fromCharCode(97+source.col)}${8-source.row}`,
        to:`${String.fromCharCode(97+target.col)}${8-target.row}`,
        promotion:'q'
    };

    socket.emit('move',move);
};

const getPieceUnicode = (piece) => {
    const unicodePeices = {
        p:"♟",
        r:"♜",
        n:"♞",
        b:"♝",
        q:"♛",
        k:"♚",
        P:"♙",
        R:"♖",
        N:"♘",
        B:"♗",
        Q:"♕",
        K:"♔"
    };


    return unicodePeices[piece.type] || ""
};

socket.on('playerRole',(role)=>{
    playerRole = role,
    renderedBoard();
});

socket.on('spectatorRole',()=>{
    playerRole = null,
    renderedBoard();
})

socket.on("boardState", (fen)=>{
    chess.load(fen);
});
socket.on("move",(move)=>{
    chess.move(move);
    renderedBoard();
})

renderedBoard();
