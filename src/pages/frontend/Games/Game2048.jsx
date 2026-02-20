import { useEffect, useRef, useState } from "react";

/* ================= HELPERS ================= */

const SIZE = 4;

const createGrid = () =>
  Array.from({ length: SIZE }, () => Array(SIZE).fill(0));

const cloneGrid = (grid) => grid.map((row) => [...row]);

const addRandomTile = (grid) => {
  const empty = [];
  grid.forEach((row, i) =>
    row.forEach((cell, j) => cell === 0 && empty.push([i, j]))
  );
  if (!empty.length) return grid;

  const [x, y] = empty[Math.floor(Math.random() * empty.length)];
  grid[x][y] = Math.random() < 0.9 ? 2 : 4;
  return grid;
};

const slideRowLeft = (row) => {
  let arr = row.filter(Boolean);
  let score = 0;

  for (let i = 0; i < arr.length - 1; i++) {
    if (arr[i] === arr[i + 1]) {
      arr[i] *= 2;
      score += arr[i];
      arr[i + 1] = 0;
      i++; // real 2048 rule: merge once per move
    }
  }

  arr = arr.filter(Boolean);
  while (arr.length < SIZE) arr.push(0);

  return { row: arr, score };
};

const rotateLeft = (grid) =>
  grid[0].map((_, i) => grid.map((row) => row[i]).reverse());

const canMove = (grid) => {
  for (let i = 0; i < SIZE; i++) {
    for (let j = 0; j < SIZE; j++) {
      if (grid[i][j] === 0) return true;
      if (j < SIZE - 1 && grid[i][j] === grid[i][j + 1]) return true;
      if (i < SIZE - 1 && grid[i][j] === grid[i + 1][j]) return true;
    }
  }
  return false;
};

/* ================= COMPONENT ================= */

export default function Game2048() {
  const [grid, setGrid] = useState([]);
  const [score, setScore] = useState(0);
  const [best, setBest] = useState(
    Number(localStorage.getItem("best2048")) || 0
  );
  const [started, setStarted] = useState(false);
  const [gameOver, setGameOver] = useState(false);

  const touchStartX = useRef(0);
  const touchStartY = useRef(0);

  /* ---------- GAME CONTROLS ---------- */

  const startGame = () => {
    const g = addRandomTile(addRandomTile(createGrid()));
    setGrid(g);
    setScore(0);
    setGameOver(false);
    setStarted(true);
  };

  const moveLeft = () => {
    let moved = false;
    let gained = 0;

    const newGrid = grid.map((row) => {
      const { row: newRow, score } = slideRowLeft(row);
      if (newRow.join() !== row.join()) moved = true;
      gained += score;
      return newRow;
    });

    if (!moved) return;

    const updated = addRandomTile(newGrid);
    setGrid(updated);
    setScore((s) => {
      const next = s + gained;
      if (next > best) {
        setBest(next);
        localStorage.setItem("best2048", next);
      }
      return next;
    });

    if (!canMove(updated)) setGameOver(true);
  };

  const move = (dir) => {
    let newGrid = cloneGrid(grid);

    if (dir === "right") newGrid = newGrid.map((r) => r.reverse());
    if (dir === "up") newGrid = rotateLeft(rotateLeft(rotateLeft(newGrid)));
    if (dir === "down") newGrid = rotateLeft(newGrid);

    setGrid(newGrid);
    moveLeft();

    setGrid((g) => {
      if (dir === "right") return g.map((r) => r.reverse());
      if (dir === "up") return rotateLeft(g);
      if (dir === "down") return rotateLeft(rotateLeft(rotateLeft(g)));
      return g;
    });
  };

  /* ---------- KEYBOARD ---------- */

  useEffect(() => {
    if (!started || gameOver) return;

    const handleKey = (e) => {
      if (e.key === "ArrowLeft") move("left");
      if (e.key === "ArrowRight") move("right");
      if (e.key === "ArrowUp") move("up");
      if (e.key === "ArrowDown") move("down");
    };

    window.addEventListener("keydown", handleKey);
    return () => window.removeEventListener("keydown", handleKey);
  }, [grid, started, gameOver]);

  /* ---------- TOUCH (MOBILE) ---------- */

  const handleTouchStart = (e) => {
    const touch = e.touches[0];
    touchStartX.current = touch.clientX;
    touchStartY.current = touch.clientY;
  };

  const handleTouchEnd = (e) => {
    if (!started || gameOver) return;

    const touch = e.changedTouches[0];
    const dx = touch.clientX - touchStartX.current;
    const dy = touch.clientY - touchStartY.current;

    if (Math.abs(dx) > Math.abs(dy)) {
      if (dx > 30) move("right");
      else if (dx < -30) move("left");
    } else {
      if (dy > 30) move("down");
      else if (dy < -30) move("up");
    }
  };

  /* ================= UI ================= */

  if (!started) {
    return (
      <div className="h-full flex flex-col items-center justify-center gap-4">
        <h1 className="text-4xl font-bold text-yellow-400">2048</h1>
        <button
          onClick={startGame}
          className="px-8 py-3 bg-yellow-500 text-black rounded-xl
          hover:scale-105 transition"
        >
          Start Game
        </button>
      </div>
    );
  }

  return (
    <div className="relative flex flex-col items-center gap-4 p-4">
      <div className="flex gap-6 text-white font-semibold">
        <div>Score: {score}</div>
        <div>Best: {best}</div>
      </div>

      <div
        onTouchStart={handleTouchStart}
        onTouchEnd={handleTouchEnd}
        className="bg-gray-800 p-3 rounded-xl grid grid-cols-4 gap-3 touch-none"
      >
        {grid.flat().map((n, i) => (
          <div
            key={i}
            className={`w-16 h-16 sm:w-20 sm:h-20
            flex items-center justify-center
            rounded-lg font-bold text-xl
            transition-all duration-200
            ${n ? "bg-yellow-400 text-black" : "bg-gray-700"}`}
          >
            {n || ""}
          </div>
        ))}
      </div>

      <button
        onClick={startGame}
        className="px-6 py-2 bg-blue-500 text-white rounded-lg"
      >
        Restart
      </button>

      <p className="text-gray-400 text-sm text-center">
        Swipe on mobile • Arrow keys on desktop
      </p>

      {gameOver && (
        <div
          className="absolute inset-0 bg-black/70 flex flex-col
          items-center justify-center gap-4 rounded-xl"
        >
          <div className="text-red-400 text-3xl font-bold">Game Over</div>
          <button
            onClick={startGame}
            className="px-6 py-3 bg-yellow-500 text-black rounded-lg"
          >
            New Game
          </button>
        </div>
      )}
    </div>
  );
}
