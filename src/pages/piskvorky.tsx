import React, { useState } from 'react';

type SquareValue = 'X' | 'O' | null;

const TicTacToe: React.FC = () => {
  const [board, setBoard] = useState<SquareValue[]>(Array(9).fill(null));
  const [xIsNext, setXIsNext] = useState<boolean>(true);
  const [notification, setNotification] = useState<string | null>(null);

  const handleClick = (index: number) => {
    const newBoard = [...board];
    if (newBoard[index] || calculateWinner(newBoard).winner) {
      setNotification('This square is already taken or the game is finished.');
      return;
    }
    newBoard[index] = xIsNext ? 'X' : 'O';
    setBoard(newBoard);
    setXIsNext(!xIsNext);
    setNotification(null);
  };

  const calculateWinner = (squares: SquareValue[]): { winner: SquareValue | null; line: number[] | null } => {
    const lines: number[][] = [
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
        return { winner: squares[a], line: [a, b, c] };
      }
    }
    if (squares.every((square) => square !== null)) {
      return { winner: null, line: null };
    }
    return { winner: null, line: null };
  };

  const renderSquare = (index: number): JSX.Element => {
    const { line } = calculateWinner(board);

    const isWinnerSquare = line && line.includes(index);
    const backgroundColor = isWinnerSquare ? 'bg-green-500' : 'bg-gray-300';

    return (
      <button
        key={index}
        className={`w-32 h-32 ${backgroundColor} m-1 text-4xl font-bold transition-colors duration-500 rounded-lg`}
        onClick={() => handleClick(index)}
      >
        {board[index]}
      </button>
    );
  };

  const resetBoard = () => {
    setBoard(Array(9).fill(null));
    setXIsNext(true);
    setNotification(null);
  };

  const { winner } = calculateWinner(board);
  const status = winner
    ? `Winner: ${winner}`
    : board.every((square) => square !== null)
    ? "It's a draw!"
    : `Next player: ${xIsNext ? 'X' : 'O'}`;

  return (
    <div className="min-h-screen flex flex-col items-center justify-center text-white bg-zinc-900">
      <div className="absolute top-0 left-0 right-0 p-4 bg-gray-800 text-center">
        <h1 className="text-3xl font-bold">POKI CLONE</h1>
      </div>
      <div className="mb-4">{status}</div>
      <div className="grid grid-cols-3 gap-1">
        {board.map((square, index) => (
          <span key={index}>{renderSquare(index)}</span>
        ))}
      </div>
      {notification && (
        <div className="absolute bottom-0 left-0 right-0 p-4 bg-red-500 text-center">
          {notification}
        </div>
      )}
      <button
        onClick={resetBoard}
        className="mt-8 py-2 px-4 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-colors duration-300"
      >
        RESTART GAME
      </button> 
    </div>
  );
};

export default TicTacToe;
