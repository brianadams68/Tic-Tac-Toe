import React, { useState, useEffect } from 'react';

const TicTacToe = () => {
  const [board, setBoard] = useState(Array(9).fill(null));
  const [xIsNext, setXIsNext] = useState(true);
  const [gameOver, setGameOver] = useState(false);

  useEffect(() => {
    if (!xIsNext) {
      const timeoutId = setTimeout(computerMove, 1000);
      return () => clearTimeout(timeoutId);
    }
     // eslint-disable-next-line
  }, [board, xIsNext]);

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

  const computerMove = () => {
    if (gameOver) return;

    const emptyCells = board.reduce((acc, cell, index) => {
      if (cell === null) acc.push(index);
      return acc;
    }, []);

    // Check for a winning move for 'O'
    for (let i = 0; i < emptyCells.length; i++) {
      const newBoard = [...board];
      newBoard[emptyCells[i]] = 'O';
      if (calculateWinner(newBoard) === 'O') {
        setBoard(newBoard);
        setGameOver(true);
        setTimeout(() => {
          resetGame();
        }, 3000);
        return;
      }
    }

    // Check for a blocking move for 'X'
    for (let i = 0; i < emptyCells.length; i++) {
      const newBoard = [...board];
      newBoard[emptyCells[i]] = 'X';
      if (calculateWinner(newBoard) === 'X') {
        newBoard[emptyCells[i]] = 'O';
        setBoard(newBoard);
        setXIsNext(true);
        return;
      }
    }

    // If no winning or blocking moves, choose a random empty cell
    const randomIndex = emptyCells[Math.floor(Math.random() * emptyCells.length)];

    const newBoard = [...board];
    newBoard[randomIndex] = 'O';
    setBoard(newBoard);
    setXIsNext(true);

    const winner = calculateWinner(newBoard);
    if (winner || !newBoard.includes(null)) {
      setGameOver(true);
      setTimeout(() => {
        resetGame();
      }, 3000);
    }
  };

  const resetGame = () => {
    setBoard(Array(9).fill(null));
    setXIsNext(true);
    setGameOver(false);
  };

  const renderSquare = (i) => (
    <button className="square" onClick={() => handleClick(i)}>
      <span className={board[i] === 'X' ? 'x-style' : (board[i] === 'O' ? 'o-style' : '')}>
        {board[i]}
      </span>
    </button>
  );

  const handleClick = (i) => {
    if (gameOver || board[i]) return;

    const newBoard = [...board];
    newBoard[i] = xIsNext ? 'X' : 'O';
    setBoard(newBoard);
    setXIsNext(!xIsNext);

    const winner = calculateWinner(newBoard);
    if (winner || !newBoard.includes(null)) {
      setGameOver(true);
      setTimeout(() => {
        resetGame();
      }, 3000);
    }
  };

  const winner = calculateWinner(board);
  const isBoardFull = board.every((square) => square !== null);
  const status = winner
    ? `Winner: ${winner}`
    : isBoardFull
    ? "It's a tie!"
    : `Next player: ${xIsNext ? 'X' : 'O'}`;

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

export default TicTacToe;
