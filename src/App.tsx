import { Gamepad2, RotateCcw } from "lucide-react";
import Board from "./components/Board";
import { useState } from "react";
import { BoardState } from "./types";
import { checkWinner, isBoradFull } from "./helpers/game-logic";
import { AnimatePresence, motion } from "motion/react";

function App() {
  const [board, setBoard] = useState<BoardState>(Array(9).fill(null));
  const winner = checkWinner(board);
  const isDraw = !winner && isBoradFull(board);

  const getGameStatus = () => {
    if (winner) return `Player ${winner} wins!`;
    if (isDraw) return "It's a Draw!";
    return `Player ${currentPlayer}'s Turn`;
  };
  const currentPlayer = board.filter(Boolean).length % 2 === 0 ? "X" : "O";

  const handleClick = (index: number) => {
    if (board[index] || winner) return;
    setBoard(board.map((square, i) => (index === i ? currentPlayer : square)));
  };

  const handleRestart = () => {
    setBoard(Array(9).fill(null));
  };

  return (
    <main className="bg-blue-200 min-h-screen flex flex-col items-center justify-center">
      <div className="w-full max-w-lg bg-blue-100 p-8 rounded-2xl">
        <div className="flex items-center justify-center gap-3 mb-8">
          <Gamepad2 className="h-8 w-8 text-pink" />
          <h1 className="text-white text-4xl font-bold">Tic Tac Toe</h1>
        </div>

        <div className="mb-6 text-center">
          <p className="text-xl font-semibold text-gray-100">
            {getGameStatus()}
          </p>
        </div>

        <Board board={board} winner={winner} onClick={handleClick} />

        <AnimatePresence>
          {(winner || isDraw) && (
            <motion.div
              className="mt-8 flex justify-center"
              exit={{ opacity: 0 }}
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
            >
              <button
                className="group flex items-center gap-2 bg-pink rounded-lg px-6 py-3 text-sm text-white hover:opacity-90"
                onClick={handleRestart}
              >
                Restart Game
                <RotateCcw className="transition-transform duration-500 group-hover:-rotate-180" />
              </button>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </main>
  );
}

export default App;
