import { useState } from "react";
import swoop from "../../../assets/images/games/swoop.jpg";
import runner from "../../../assets/images/games/bee.jpg";
import shooter from "../../../assets/images/games/masterarcher.jpg";
import car3d from "../../../assets/images/games/flood.jpg";
import tictactoeImg from "../../../assets/images/games/tictactoe.jpg";
import TwoThousandFourty from "../../../assets/images/games/2048.jpg";
import momorygames from "../../../assets/images/games/momorygame.jpg";
import TicTacToe from "./TicTacToe";
import MemoryGame from "./MemoryGame";
import Game2048 from "./Game2048";

const GameSection = () => {
  const games = [
    {
      id: 1,
      title: "Racing Game",
      iframe: "https://playcanv.as/p/JtL2iqIH/",
      image: swoop,
    },
    {
      id: 2,
      title: "Runner",
      iframe: "https://playcanv.as/p/2OlkUaxF/",
      image: runner,
    },
    {
      id: 3,
      title: "Shooter",
      iframe: "https://playcanv.as/p/JERg21J8/",
      image: shooter,
    },
    { id: 7, title: "2048", component: Game2048, image: TwoThousandFourty },
    { id: 5, title: "Tic Tac Toe", component: TicTacToe, image: tictactoeImg },
    {
      id: 6,
      title: "Memory Game",
      component: MemoryGame,
      image: momorygames,
    },

    {
      id: 4,
      title: "3D Car",
      iframe: "https://playcanv.as/p/44MRmJRU/",
      image: car3d,
    },
  ];

  const [activeGame, setActiveGame] = useState(games[0]);

  return (
    <div id="games">
      {/* HEADER */}
      <div className="text-center py-8">
        <h2 className="text-2xl md:text-3xl font-bold mb-3 text-[#4b2e2b]">
          🍕 Order Diya? Game Shuru!
        </h2>
        <p className="text-gray-400">Khana late ho sakta hai… maza nahi 😜</p>
      </div>

      {/* 🎮 GAME PLAYER */}
      {/* <div className="w-full min-h-[65vh] h-auto bg-black flex items-center justify-center rounded-xl overflow-hidden mb-6">
        {activeGame?.iframe ? (
          <iframe
            src={activeGame.iframe}
            title={activeGame.title}
            className="w-full h-[65vh]"
            frameBorder="0"
            allowFullScreen
          />
        ) : (
          <div className="w-full h-full flex items-center justify-center">
            <activeGame.component />
          </div>
        )}
      </div> */}

      {/* SIMPLE HORIZONTAL SLIDER */}
      <div className="px-4">
        <div
          className="flex gap-4 overflow-x-auto pb-4
          scrollbar-thin scrollbar-thumb-yellow-400 scrollbar-track-zinc-800"
        >
          {games.map((game) => (
            <div
              key={game.id}
              onClick={() => setActiveGame(game)}
              className={`min-w-[180px] sm:min-w-[220px]
                cursor-pointer rounded-xl overflow-hidden border-2
                transition-all duration-300
                ${
                  activeGame.id === game.id
                    ? "border-yellow-400 scale-105"
                    : "border-transparent opacity-70 hover:opacity-100"
                }`}
            >
              <img
                src={game.image}
                alt={game.title}
                className="w-full h-36 object-cover"
              />
              <div className="bg-zinc-900 p-2 text-sm text-white text-center">
                {game.title}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default GameSection;
