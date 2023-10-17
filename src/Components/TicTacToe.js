import React, { useState } from 'react';

const TicTacToe = () => {
  const [board, setBoard] = useState(Array(9).fill(null));
  const [xIsNext, setXIsNext] = useState(true);

  const handleClick = (i) => {
    const newBoard = [...board];
    if (calculateWinner(board) || newBoard[i]) return;

    newBoard[i] = xIsNext ? 'X' : 'O';
    setBoard(newBoard);
    setXIsNext(!xIsNext);

    if (!newBoard.includes(null) && !calculateWinner(newBoard)) return;
    if (!newBoard.includes(null) || calculateWinner(newBoard)) {
        setTimeout(() => {
            resetGame();
          }, 3000);
      }
  };

  const renderSquare = (i) => (
    <button className="square" onClick={() => handleClick(i)}>
      <span className={board[i] === 'X' ? 'x-style' : 'o-style'}>{board[i]}</span>
    </button>
  );

  const winner = calculateWinner(board);
  const isBoardFull = board.every((square) => square !== null);
  const status = winner
  ? `Winner: ${winner}`
  : isBoardFull
  ? "It's a tie!"
  : `Next player: ${xIsNext ? 'X' : 'O'}`;

  const resetGame = () => {
    setBoard(Array(9).fill(null)); 
    setXIsNext(true);
  };

  return (
    <div className="game">
      <div className="game-board">
  <div className="board-row board-bottom">
    <div className="right-border">{renderSquare(0)}</div>
    <div className="right-border">{renderSquare(1)}</div>
    <div>{renderSquare(2)}</div>
  </div>
  <div className="board-row board-bottom">
    <div className="right-border">{renderSquare(3)}</div>
    <div className="right-border">{renderSquare(4)}</div>
    <div>{renderSquare(5)}</div>
  </div>
  <div className="board-row">
    <div className="right-border">{renderSquare(6)}</div>
    <div className="right-border">{renderSquare(7)}</div>
    <div>{renderSquare(8)}</div>
  </div>
</div>

      <div className="game-info">
        <div>{status}</div>
      </div>
    </div>
  );
};

const calculateWinner = (squares) => {
  const lines = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6],
  ];

  for (let i = 0; i < lines.length; i++) {
    const [a, b, c] = lines[i];
    if (squares[a] && squares[a] === squares[b] && squares[a] === squares[c]) {
      return squares[a];
    }
  }
  return null;
};

export default TicTacToe;
