import { useState, useEffect } from "react";

const ICONS = [
  "🔥",
  "🎮",
  "🚀",
  "👑",
  "💎",
  "⚡",
  "🍀",
  "🎯",
  "🧠",
  "⭐",
  "🐱",
  "🍕",
];

const shuffle = (arr) => [...arr].sort(() => Math.random() - 0.5);

export default function MemoryGame() {
  const [level, setLevel] = useState(1);
  const [cards, setCards] = useState([]);
  const [open, setOpen] = useState([]);
  const [matched, setMatched] = useState([]);
  const [moves, setMoves] = useState(0);
  const [started, setStarted] = useState(false);
  const [completed, setCompleted] = useState(false);

  // level ke hisaab se cards generate
  const generateGame = (lvl) => {
    const pairCount = Math.min(3 + lvl, ICONS.length);
    const selected = ICONS.slice(0, pairCount);
    setCards(shuffle([...selected, ...selected]));
    setOpen([]);
    setMatched([]);
    setMoves(0);
    setCompleted(false);
  };

  const startGame = () => {
    setStarted(true);
    generateGame(level);
  };

  const restartGame = () => {
    generateGame(level);
  };

  const nextLevel = () => {
    const next = level + 1;
    setLevel(next);
    generateGame(next);
  };

  const flipCard = (index) => {
    if (open.length === 2 || open.includes(index) || matched.includes(index))
      return;

    const newOpen = [...open, index];
    setOpen(newOpen);

    if (newOpen.length === 2) {
      setMoves((m) => m + 1);
      const [a, b] = newOpen;

      if (cards[a] === cards[b]) {
        setMatched((prev) => [...prev, a, b]);
      }

      setTimeout(() => setOpen([]), 800);
    }
  };

  useEffect(() => {
    if (started && matched.length === cards.length && cards.length > 0) {
      setCompleted(true);
    }
  }, [matched, cards, started]);

  // START SCREEN
  if (!started) {
    return (
      <div className="h-full flex flex-col items-center justify-center text-white">
        <h1 className="text-3xl font-bold mb-4">🧠 Memory Game</h1>
        <p className="text-gray-400 mb-6">Match all cards to win</p>
        <button
          onClick={startGame}
          className="px-8 py-3 bg-green-500 rounded-xl
          hover:scale-105 active:scale-95 transition"
        >
          Start Game
        </button>
      </div>
    );
  }

  return (
    <div className="w-full h-full flex flex-col items-center text-white p-4">
      {/* HEADER */}
      <div className="flex flex-wrap justify-between w-full max-w-xl mb-4">
        <p>
          Level: <b>{level}</b>
        </p>
        <p>
          Moves: <b>{moves}</b>
        </p>
        <button
          onClick={restartGame}
          className="px-4 py-1 bg-red-500 rounded-lg text-sm"
        >
          Restart
        </button>
      </div>

      {/* GAME GRID */}
      <div
        className={`grid gap-3`}
        style={{
          gridTemplateColumns: `repeat(${Math.min(
            4,
            cards.length / 2
          )}, minmax(0, 1fr))`,
        }}
      >
        {cards.map((card, i) => {
          const show = open.includes(i) || matched.includes(i);
          return (
            <button
              key={i}
              onClick={() => flipCard(i)}
              className={`w-16 h-20 sm:w-20 sm:h-24
                rounded-xl flex items-center justify-center
                text-2xl font-bold
                transition-all duration-300
                ${show ? "bg-green-500 scale-105" : "bg-gray-800"}
                ${matched.includes(i) ? "opacity-70" : ""}
              `}
            >
              {show ? card : "❓"}
            </button>
          );
        })}
      </div>

      {/* LEVEL COMPLETE */}
      {completed && (
        <div className="mt-6 text-center">
          <p className="text-xl font-bold mb-3">🎉 Level Complete!</p>
          <button
            onClick={nextLevel}
            className="px-6 py-3 bg-blue-500 rounded-xl
            hover:scale-105 active:scale-95 transition"
          >
            Next Level
          </button>
        </div>
      )}
    </div>
  );
}
