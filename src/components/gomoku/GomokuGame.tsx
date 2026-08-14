"use client";

import { useEffect, useRef, useState } from "react";
import {
  createInitialGameState,
  playMove,
  restartGame,
  undoLastMove,
} from "@/lib/gomoku/game";
import type { Position } from "@/lib/gomoku/types";
import { AiAssistantPanel } from "./AiAssistantPanel";
import { GameControls } from "./GameControls";
import { GameStatus } from "./GameStatus";
import { GomokuBoard } from "./GomokuBoard";
import { RestartDialog } from "./RestartDialog";
import { RuleInput } from "./RuleInput";
import { RulePanel } from "./RulePanel";
import { WinDialog } from "./WinDialog";

const WIN_DIALOG_DELAY_MS = 1200;

export function GomokuGame() {
  const [game, setGame] = useState(createInitialGameState);
  const [isWinDialogOpen, setIsWinDialogOpen] = useState(false);
  const [isRestartDialogOpen, setIsRestartDialogOpen] = useState(false);
  const winDialogTimerRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  useEffect(() => {
    return () => {
      if (winDialogTimerRef.current) {
        clearTimeout(winDialogTimerRef.current);
      }
    };
  }, []);

  function clearWinDialogTimer() {
    if (!winDialogTimerRef.current) {
      return;
    }

    clearTimeout(winDialogTimerRef.current);
    winDialogTimerRef.current = null;
  }

  function handleCellClick(position: Position) {
    const nextGame = playMove(game, position);

    if (nextGame === game) {
      return;
    }

    setGame(nextGame);

    if (nextGame.winner) {
      clearWinDialogTimer();
      winDialogTimerRef.current = setTimeout(() => {
        setIsWinDialogOpen(true);
        winDialogTimerRef.current = null;
      }, WIN_DIALOG_DELAY_MS);
    }
  }

  function handleUndo() {
    clearWinDialogTimer();
    setGame((currentGame) => undoLastMove(currentGame));
    setIsWinDialogOpen(false);
  }

  function handleRestart() {
    clearWinDialogTimer();
    setGame(restartGame());
    setIsRestartDialogOpen(false);
    setIsWinDialogOpen(false);
  }

  return (
    <>
      <div className="grid items-start gap-6 lg:grid-cols-[minmax(0,1fr)_340px]">
        <section className="min-w-0 rounded-3xl border border-white/10 bg-white/[0.035] p-3 shadow-2xl shadow-black/20 sm:p-5">
          <GameStatus
            currentPlayer={game.currentPlayer}
            moveCount={game.history.length}
            winner={game.winner}
          />
          <div className="mt-4">
            <GomokuBoard
              board={game.board}
              disabled={Boolean(game.winner)}
              lastMove={game.lastMove}
              winningCells={game.winningCells}
              onCellClick={handleCellClick}
            />
          </div>
          <div className="mx-auto mt-4 max-w-[680px]">
            <GameControls
              canUndo={game.history.length > 0}
              onUndo={handleUndo}
              onRequestRestart={() => setIsRestartDialogOpen(true)}
            />
          </div>
        </section>

        <aside className="grid gap-4" aria-label="AI 与规则面板">
          <RulePanel />
          <AiAssistantPanel />
          <RuleInput />
        </aside>
      </div>

      <WinDialog
        isOpen={isWinDialogOpen}
        winner={game.winner}
        onClose={() => setIsWinDialogOpen(false)}
        onPlayAgain={handleRestart}
        onUndo={handleUndo}
      />
      <RestartDialog
        isOpen={isRestartDialogOpen}
        onCancel={() => setIsRestartDialogOpen(false)}
        onConfirm={handleRestart}
      />
    </>
  );
}
