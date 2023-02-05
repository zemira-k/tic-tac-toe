import { Square } from "./Square";
import React, { useState } from "react";
import {rowStyle, boardStyle, containerStyle, instructionsStyle, buttonStyle} from './styles'

export function Board() {
  const [playerType, setPlayerType] = useState("X");
  const [winner, setWinner] = useState(null);
  const [board, setBoard] = useState([
    ["", "", ""],
    ["", "", ""],
    ["", "", ""],
  ]);

  function checkForWin(board) {
    // Check for a win on the rows
    for (let i = 0; i < 3; i++) {
      if (
        board[i][0] &&
        board[i][1] &&
        board[i][2] &&
        board[i][0] === board[i][1] &&
        board[i][1] === board[i][2]
      ) {
        return board[i][0];
      }
    }

    // Check for a win on the columns
    for (let i = 0; i < 3; i++) {
      if (
        board[0][i] &&
        board[1][i] &&
        board[2][i] &&
        board[0][i] === board[1][i] &&
        board[1][i] === board[2][i]
      ) {
        return board[0][i];
      }
    }

    // Check for a win on the diagonals
    if (
      board[0][0] &&
      board[1][1] &&
      board[2][2] &&
      board[0][0] === board[1][1] &&
      board[1][1] === board[2][2]
    ) {
      return board[0][0];
    }
    if (
      board[0][2] &&
      board[1][1] &&
      board[2][0] &&
      board[0][2] === board[1][1] &&
      board[1][1] === board[2][0]
    ) {
      return board[0][2];
    }

    // If no win, return null
    return null;
  }

  const resetBoard = () => {
    setBoard([
      ["", "", ""],
      ["", "", ""],
      ["", "", ""],
    ]);
    setPlayerType("X");
  };

  const handleSquareClick = (e) => {
    const square = e.target;
    const row = square.parentNode;
    const rowIndex = Array.from(row.parentNode.children).indexOf(row);
    const colIndex = Array.from(row.children).indexOf(square);
    if (!board[rowIndex][colIndex] && !winner) {
      const newBoard = [...board];
      newBoard[rowIndex][colIndex] = playerType;
      setBoard(newBoard);
      setWinner(checkForWin(board));
      setPlayerType(playerType === "X" ? "O" : "X");
    }
  };

  return (
    <div style={containerStyle} className="gameBoard">
      <div id="statusArea" className="status" style={instructionsStyle}>
        Next player: <span>{playerType}</span>
      </div>
      {winner && (
        <div id="winnerArea" className="winner" style={instructionsStyle}>
          Winner: <span>{winner}</span>
        </div>
      )}
      <button style={buttonStyle} onClick={resetBoard}>
        Reset
      </button>
      <div style={boardStyle}>
        <div className="board-row" style={rowStyle}>
          <Square handleSquareClick={handleSquareClick} player={board[0][0]} />
          <Square handleSquareClick={handleSquareClick} player={board[0][1]} />
          <Square handleSquareClick={handleSquareClick} player={board[0][2]} />
        </div>
        <div className="board-row" style={rowStyle}>
          <Square handleSquareClick={handleSquareClick} player={board[1][0]} />
          <Square handleSquareClick={handleSquareClick} player={board[1][1]} />
          <Square handleSquareClick={handleSquareClick} player={board[1][2]} />
        </div>
        <div className="board-row" style={rowStyle}>
          <Square handleSquareClick={handleSquareClick} player={board[2][0]} />
          <Square handleSquareClick={handleSquareClick} player={board[2][1]} />
          <Square handleSquareClick={handleSquareClick} player={board[2][2]} />
        </div>
      </div>
    </div>
  );
}
