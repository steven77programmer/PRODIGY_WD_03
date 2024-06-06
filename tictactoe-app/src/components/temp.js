// game with ai
import React, { useState, useEffect } from 'react';
import './Game.css';


const GameWithAI = ({ goBack }) => {
  const [board, setBoard] = useState(Array(9).fill(null));
  const [xIsNext, setXIsNext] = useState(true);
  const [winner, setWinner] = useState(null);

  useEffect(() => {
    if (!xIsNext && !winner) {
      const aiMove = () => {
        let availableMoves = [];
        board.forEach((val, idx) => {
          if (val === null) availableMoves.push(idx);
        });
        const move = availableMoves[Math.floor(Math.random() * availableMoves.length)];
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

  return (
    <div className="game">
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
