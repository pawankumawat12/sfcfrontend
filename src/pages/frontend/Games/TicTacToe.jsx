import { useState, useEffect } from "react";
import Confetti from "react-confetti";

const TicTacToe = () => {
  const [board, setBoard] = useState(Array(9).fill(null));
  const [isXNext, setIsXNext] = useState(true);
  const [winnerData, setWinnerData] = useState(null);
  const [showConfetti, setShowConfetti] = useState(false);
  const [score, setScore] = useState({ X: 0, O: 0 });

  useEffect(() => {
    const result = calculateWinner(board);
    if (result) {
      setWinnerData(result);
      setShowConfetti(true);
      setScore((prev) => ({
        ...prev,
        [result.winner]: prev[result.winner] + 1,
      }));
    }
  }, [board]);

  const handleClick = (index) => {
    if (board[index] || winnerData) return;

    const newBoard = [...board];
    newBoard[index] = isXNext ? "X" : "O";
    setBoard(newBoard);
    setIsXNext(!isXNext);
  };

  const resetGame = () => {
    setBoard(Array(9).fill(null));
    setIsXNext(true);
    setWinnerData(null);
    setShowConfetti(false);
  };

  return (
    <div className="relative flex flex-col items-center justify-center h-full text-white overflow-hidden">

      {showConfetti && <Confetti numberOfPieces={300} recycle={false} />}

      {/* 🏆 SCOREBOARD */}
      <div className="flex gap-6 mb-4 text-lg">
        <span className="px-4 py-1 bg-zinc-800 rounded-full">❌ X : {score.X}</span>
        <span className="px-4 py-1 bg-zinc-800 rounded-full">⭕ O : {score.O}</span>
      </div>

      <h2 className="text-3xl font-bold mb-3">Tic Tac Toe</h2>

      {/* 🎯 TURN */}
      {!winnerData && (
        <div className="mb-3 px-4 py-1 bg-yellow-400 text-black rounded-full text-sm font-bold">
          Turn: {isXNext ? "X" : "O"}
        </div>
      )}

      {/* 🎮 BOARD */}
      <div className="grid grid-cols-3 gap-3">
        {board.map((value, index) => {
          const isWinningCell = winnerData?.line.includes(index);

          return (
            <button
              key={index}
              onClick={() => handleClick(index)}
              className={`w-20 h-20 text-4xl font-extrabold flex items-center justify-center
              rounded-lg transition-all duration-300
              ${
                isWinningCell
                  ? "bg-green-500 text-black scale-110"
                  : "bg-zinc-800 hover:bg-zinc-700"
              }`}
            >
              {value}
            </button>
          );
        })}
      </div>

      {/* 🏁 RESULT */}
      <div className="mt-4 text-xl font-bold">
        {winnerData
          ? `🏆 ${winnerData.winner} Wins!`
          : board.every(Boolean)
          ? "😐 Match Draw!"
          : ""}
      </div>

      {/* 🔄 CONTROLS */}
      {(winnerData || board.every(Boolean)) && (
        <button
          onClick={resetGame}
          className="mt-6 px-8 py-3 bg-yellow-400 text-black rounded-full
          text-lg font-bold shadow-lg hover:scale-110 transition animate-pulse"
        >
          Play Again
        </button>
      )}
    </div>
  );
};

function calculateWinner(board) {
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

  for (let line of lines) {
    const [a, b, c] = line;
    if (board[a] && board[a] === board[b] && board[a] === board[c]) {
      return { winner: board[a], line };
    }
  }
  return null;
}

export default TicTacToe;
