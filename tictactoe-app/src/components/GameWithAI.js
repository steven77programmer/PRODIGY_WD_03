import React, { useState, useEffect } from 'react';
// import './Game.css';


const GameWithAI = ({ goBack }) => {
  const [board, setBoard] = useState(Array(9).fill(null));
  const [xIsNext, setXIsNext] = useState(true);
  const [winner, setWinner] = useState(null);

  useEffect(() => {
    if (!xIsNext && !winner) {
      const aiMove = () => {
        const move = findBestMove(board);
        const newBoard = board.slice();
        newBoard[move] = 'O';
        setBoard(newBoard);
        setXIsNext(true);
        calculateWinner(newBoard);
      };
      setTimeout(aiMove, 500); // delay AI move for better UX
    }
  }, [xIsNext, winner, board]);

  const handleClick = (index) => {
    if (board[index] || winner || !xIsNext) return;
    const newBoard = board.slice();
    newBoard[index] = 'X';
    setBoard(newBoard);
    setXIsNext(false);
    calculateWinner(newBoard);
  };

  const calculateWinner = (squares) => {
    const lines = [
      [0, 1, 2], [3, 4, 5], [6, 7, 8],
      [0, 3, 6], [1, 4, 7], [2, 5, 8],
      [0, 4, 8], [2, 4, 6],
    ];
    for (let line of lines) {
      const [a, b, c] = line;
      if (squares[a] && squares[a] === squares[b] && squares[a] === squares[c]) {
        setWinner(squares[a]);
        return;
      }
    }
    if (!squares.includes(null)) {
      setWinner('Draw');
    }
  };

  const resetGame = () => {
    setBoard(Array(9).fill(null));
    setXIsNext(true);
    setWinner(null);
  };

  const findBestMove = (board) => {
    const availableMoves = board.reduce((acc, curr, index) => {
      if (curr === null) acc.push(index);
      return acc;
    }, []);

    let bestMove;
    let bestValue = -Infinity;

    for (let move of availableMoves) {
      const newBoard = board.slice();
      newBoard[move] = 'O';
      const moveValue = minimax(newBoard, 0, false);
      if (moveValue > bestValue) {
        bestValue = moveValue;
        bestMove = move;
      }
    }

    return bestMove;
  };

  const minimax = (board, depth, isMaximizing) => {
    const scores = { 'X': -10, 'O': 10, 'Draw': 0 };
    const result = checkWinner(board);
    if (result !== null) {
      return scores[result];
    }

    if (isMaximizing) {
      let bestValue = -Infinity;
      for (let i = 0; i < board.length; i++) {
        if (board[i] === null) {
          board[i] = 'O';
          let value = minimax(board, depth + 1, false);
          board[i] = null;
          bestValue = Math.max(bestValue, value);
        }
      }
      return bestValue;
    } else {
      let bestValue = Infinity;
      for (let i = 0; i < board.length; i++) {
        if (board[i] === null) {
          board[i] = 'X';
          let value = minimax(board, depth + 1, true);
          board[i] = null;
          bestValue = Math.min(bestValue, value);
        }
      }
      return bestValue;
    }
  };

  const checkWinner = (squares) => {
    const lines = [
      [0, 1, 2], [3, 4, 5], [6, 7, 8],
      [0, 3, 6], [1, 4, 7], [2, 5, 8],
      [0, 4, 8], [2, 4, 6],
    ];
    for (let line of lines) {
      const [a, b, c] = line;
      if (squares[a] && squares[a] === squares[b] && squares[a] === squares[c]) {
        return squares[a];
      }
    }
    if (!squares.includes(null)) {
      return 'Draw';
    }
    return null;
  };

  return (
    <div className="game">
      <h2>1 vs AI</h2>
      <h2>
        {winner ? 
          (winner === 'Draw' ? "It's a Draw!" : `Winner: ${winner}`) : 
          `Next Turn: ${xIsNext ? 'Player (X)' : 'AI (O)'}`
        }
      </h2>
      <div className="board">
        {board.map((value, index) => (
          <div key={index} className={`square ${value}`} onClick={() => handleClick(index)}>
            {value}
          </div>
        ))}
      </div>
      {winner && <button onClick={resetGame}>Play Again</button>}
      <button onClick={goBack}>Back</button>
    </div>
  );
};

export default GameWithAI;
