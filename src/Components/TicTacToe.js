import React, { useState, useEffect } from "react";

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
      if (
        squares[a] &&
        squares[a] === squares[b] &&
        squares[a] === squares[c]
      ) {
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

    let bestMove = -1;
    let bestScore = -Infinity;

    for (let i = 0; i < emptyCells.length; i++) {
      const newBoard = [...board];
      newBoard[emptyCells[i]] = "O";
      const score = minimax(newBoard, 0, false);
      if (score > bestScore) {
        bestScore = score;
        bestMove = emptyCells[i];
      }
    }

    if (bestMove !== -1) {
      const newBoard = [...board];
      newBoard[bestMove] = "O";
      setBoard(newBoard);
      setXIsNext(true);

      const winner = calculateWinner(newBoard);
      if (winner || !newBoard.includes(null)) {
        setGameOver(true);
        setTimeout(() => {
          resetGame();
        }, 3000);
      }
    }
  };

  const minimax = (currentBoard, depth, isMaximizing) => {
    const result = calculateWinner(currentBoard);
    if (result === "O") {
      return 1;
    } else if (result === "X") {
      return -1;
    } else if (currentBoard.includes(null) === false) {
      return 0;
    }

    if (isMaximizing) {
      let bestScore = -Infinity;
      for (let i = 0; i < currentBoard.length; i++) {
        if (currentBoard[i] === null) {
          currentBoard[i] = "O";
          const score = minimax(currentBoard, depth + 1, false);
          currentBoard[i] = null;
          bestScore = Math.max(score, bestScore);
        }
      }
      return bestScore;
    } else {
      let bestScore = Infinity;
      for (let i = 0; i < currentBoard.length; i++) {
        if (currentBoard[i] === null) {
          currentBoard[i] = "X";
          const score = minimax(currentBoard, depth + 1, true);
          currentBoard[i] = null;
          bestScore = Math.min(score, bestScore);
        }
      }
      return bestScore;
    }
  };

  const resetGame = () => {
    setBoard(Array(9).fill(null));
    setXIsNext(true);
    setGameOver(false);
  };

  const renderSquare = (i) => (
    <button className="square" onClick={() => handleClick(i)}>
      <span
        className={
          board[i] === "X" ? "x-style" : board[i] === "O" ? "o-style" : ""
        }
      >
        {board[i]}
      </span>
    </button>
  );

  const handleClick = (i) => {
    if (gameOver || board[i]) return;

    const newBoard = [...board];
    newBoard[i] = xIsNext ? "X" : "O";
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
    : `Next player: ${xIsNext ? "X" : "O"}`;

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
