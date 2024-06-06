import React, { useState } from 'react';
// import './Game.css';

const TwoPlayerGame = ({ goBack }) => {
  const [board, setBoard] = useState(Array(9).fill(null));
  const [xIsNext, setXIsNext] = useState(true);
  const [winner, setWinner] = useState(null);

  const handleClick = (index) => {
    if (board[index] || winner) return;
    const newBoard = board.slice();
    newBoard[index] = xIsNext ? 'X' : 'O';
    setBoard(newBoard);
    setXIsNext(!xIsNext);
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
      <h2>2 Player</h2>
      <h2>{winner ? (winner === 'Draw' ? "It's a Draw!" : `Winner: ${winner}`) : `Next Player: ${xIsNext ? 'X' : 'O'}`}</h2>
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

export default TwoPlayerGame;
