var prompt = require("prompt-sync")({
  sigint: true, // you can kill the wait with ctrl-C
});

//Plateau du jeu
let board = [
  [0, 1, 2, 3, 4, 5, 6],
  ["-", "-", "-", "-", "-", "-", "-"],
  ["-", "-", "-", "-", "-", "-", "-"],
  ["-", "-", "-", "-", "-", "-", "-"],
  ["-", "-", "-", "-", "-", "-", "-"],
  ["-", "-", "-", "-", "-", "-", "-"],
  ["-", "-", "-", "-", "-", "-", "-"],
];

//Pièce pour jouer
let piece = ["Y", "R"];

//fonction pour afficher le tableau du jeu
const printBoard = (board) => {
  for (const element of board) {
    let txt = " ";
    for (const elem of element) {
      txt += elem + " ";
    }
    console.log(txt);
  }
};

//fonction pour savoir s'il est possible de mettre une pièce dans la colone choisie
const putPiece = (board, piece, index) => {
  for (var j = board.length - 1; j > 0; j--) {
    //console.log(board[j][index]) /// colone

    if (board[j][index] == "-") {
      board[j][index] = piece;
      //console.log(board)
      return true;
    }
  }
  return false;
};

//fonction pour jouer et déterminer le cas de victoire ou de match nul
const gameLoop = () => {
  while (true) {
    for (let i = 0; i < piece.length; i++) {
      printBoard(board);
      let input = prompt(
        "Next move is " + piece[i] + ". In which column does it go?"
      );
      let playerMove = parseInt(input);
      var isPiecePut = putPiece(board, piece[i], playerMove);

      while (!isPiecePut) {
        input = prompt("Invalid move. Try again. In which column does it go?");
        playerMove = parseInt(input);
        isPiecePut = putPiece(board, piece[i], playerMove);
      }

      if (checkBoard(board, piece[i]) == piece[i]) {
        printBoard(board);
        console.log(piece[i] + " won the game !");
        return;
      } else if (checkBoard(board, piece[i]) == "draw") {
        printBoard(board);
        console.log("Nobody won the game today.");
        return;
      }
    }
  }
};

//Fonction pour regarder si 4 pièces sont identiques sur une ligne
const checkBoardL = (board, piece) => {
  let tab = [];
  let pieceFourL = piece + piece + piece + piece;

  for (var i = 0; i < board.length; i++) {
    for (var j = 0; j < board.length; j++) {
      tab.push(board[i][j]);
    }
  }
  let strLig = tab.join("");
  if (strLig.includes(pieceFourL)) {
    return piece;
  }
};

//Fonction pour regarder si 4 pièces sont identiques sur une colone
const checkBoardC = (board, piece) => {
  let colones = [];
  let pieceFourC = piece + piece + piece + piece;

  for (var i = 0; i < board.length; i++) {
    let tab = [];
    for (var j = 0; j < board.length; j++) {
      tab.push(board[j][i]);
    }
    colones.push(tab.join(""));
  }

  let strCol = colones.join("");

  if (strCol.includes(pieceFourC)) {
    return piece;
  }
};

//Fonction pour regarder si 4 pièces sont identiques sur une diagonale
const checkBoardD = (board, piece) => {
  let diagonales = [];
  let pieceFourD = piece + piece + piece + piece;

  var str = "";
  var str1 = "";
  var str2 = "";
  var str3 = "";

  for (var k = 0; k < board.length; k++) {
    for (var i = 0; i < board.length; i++) {
      for (var j = 0; j < board[0].length; j++) {
        if ((board[i + k] == board[j]) == true) {
          str += board[i][j];
        }

        if ((board[i - k] == board[j]) == true) {
          str1 += board[i][j];
        }

        if (board[board.length - 1 - j] == board[i + k]) {
          str2 += board[i][j];
        }

        if (board[board.length - 1 - j] == board[i - k]) {
          str3 += board[i][j];
        }
      }
    }

    diagonales.push(str);
    diagonales.push(str1);
    diagonales.push(str2);
    diagonales.push(str3);

    str = "";
    str1 = "";
    str2 = "";
    str3 = "";
  }
  console.log(diagonales);
  let strDiag = diagonales.join("");

  if (strDiag.includes(pieceFourD)) {
    return piece;
  }
};

//fonction pour regarder s'il y a un match nul
const checkDraw = (board) => {
  for (var i = 1; i < board.length; i++) {
    if (board[i].includes("-")) {
      return false;
    }
  }
  return "draw";
};

//fonction pour annoncer quoi retourner selon le résultat des fonctions qui comptent le nombre de pièces identiques
const checkBoard = (board, piece) => {
  if (checkBoardL(board, piece) == piece) {
    return piece;
  } else if (checkBoardC(board, piece) == piece) {
    return piece;
  } else if (checkBoardD(board, piece) == piece) {
    return piece;
  } else if (checkDraw(board) == "draw") {
    return "draw";
  }
};

module.exports = { putPiece, printBoard, gameLoop, checkBoard };
