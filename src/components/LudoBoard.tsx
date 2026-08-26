import { useState, useEffect } from 'react';
import '../styles/LudoBoard.css';

interface Piece {
  id: string;
  playerId: number;
  position: number;
  color: string;
}

interface LudoBoardProps {
  pieces: Piece[];
  currentPlayer: number;
  diceResult: number | null;
  onPieceSelect: (pieceId: string) => void;
  onDiceRoll: () => void;
  isBetGame?: boolean;
}

export default function LudoBoard({ pieces, currentPlayer, diceResult, onPieceSelect, onDiceRoll, isBetGame = false }: LudoBoardProps) {
  const [animatingPiece, setAnimatingPiece] = useState<string | null>(null);

  const playerColors = {
    1: { base: '#10b981', light: '#34d399', accent: '#059669' },
    2: { base: '#ef4444', light: '#f87171', accent: '#dc2626' },
    3: { base: '#eab308', light: '#facc15', accent: '#ca8a04' },
    4: { base: '#3b82f6', light: '#60a5fa', accent: '#1d4ed8' },
  };

  const boardCells = Array.from({ length: 52 }, (_, i) => i);

  return (
    <div className={`ludo-board-container ${isBetGame ? 'bet-game-mode' : 'normal-mode'}`}>
      {/* Prison Background */}
      <div className="prison-background">
        <div className="metal-texture"></div>
        <div className="chain-decoration top-left"></div>
        <div className="chain-decoration top-right"></div>
        <div className="chain-decoration bottom-left"></div>
        <div className="chain-decoration bottom-right"></div>
        <div className="emergency-light red"></div>
        <div className="emergency-light blue"></div>
        <div className="warning-panel"></div>
      </div>

      {/* Main Board */}
      <div className="board-wrapper">
        <svg className="board-svg" viewBox="0 0 500 500" width="500" height="500">
          {/* Prison theme background */}
          <defs>
            <pattern id="metal-grid" x="20" y="20" width="20" height="20" patternUnits="userSpaceOnUse">
              <rect width="20" height="20" fill="#1a1a1a" />
              <line x1="0" y1="0" x2="20" y2="0" stroke="#333" strokeWidth="0.5" />
              <line x1="0" y1="0" x2="0" y2="20" stroke="#333" strokeWidth="0.5" />
            </pattern>
            <radialGradient id="prison-glow-red" cx="20%" cy="20%">
              <stop offset="0%" stopColor="#ef4444" stopOpacity="0.3" />
              <stop offset="100%" stopColor="#1a1a1a" stopOpacity="0" />
            </radialGradient>
            <radialGradient id="prison-glow-blue" cx="80%" cy="80%">
              <stop offset="0%" stopColor="#3b82f6" stopOpacity="0.3" />
              <stop offset="100%" stopColor="#1a1a1a" stopOpacity="0" />
            </radialGradient>
          </defs>

          {/* Board background */}
          <rect width="500" height="500" fill="url(#metal-grid)" />
          <rect width="500" height="500" fill="url(#prison-glow-red)" />
          <rect width="500" height="500" fill="url(#prison-glow-blue)" />

          {/* Prison borders - chains and metal */}
          <g className="prison-border">
            <path d="M 20 20 L 480 20 L 480 480 L 20 480 Z" fill="none" stroke="#444" strokeWidth="2" />
            <path d="M 25 25 L 475 25 L 475 475 L 25 475 Z" fill="none" stroke="#333" strokeWidth="1" />
            {/* Chain links */}
            {[0, 1, 2, 3, 4, 5].map((i) => (
              <g key={`chain-${i}`} className="chain-link">
                <circle cx={40 + i * 70} cy="20" r="3" fill="#666" />
                <circle cx={40 + i * 70} cy="480" r="3" fill="#666" />
                <circle cx="20" cy={40 + i * 70} r="3" fill="#666" />
                <circle cx="480" cy={40 + i * 70} r="3" fill="#666" />
              </g>
            ))}
          </g>

          {/* Player bases (prison cells) */}
          {[1, 2, 3, 4].map((player) => {
            const positions = {
              1: { x: 60, y: 60 },
              2: { x: 420, y: 60 },
              3: { x: 420, y: 420 },
              4: { x: 60, y: 420 },
            };
            const pos = positions[player as keyof typeof positions];
            const color = playerColors[player as keyof typeof playerColors];

            return (
              <g key={`base-${player}`} className="player-base">
                {/* Prison cell background */}
                <rect x={pos.x - 30} y={pos.y - 30} width="60" height="60" fill="#0a0a0a" stroke={color.base} strokeWidth="2" rx="4" />
                {/* Prison bars effect */}
                {[0, 15, 30, 45].map((offset) => (
                  <line key={`bar-${offset}`} x1={pos.x - 30 + offset} y1={pos.y - 30} x2={pos.x - 30 + offset} y2={pos.y + 30} stroke={color.accent} strokeWidth="1" opacity="0.5" />
                ))}
                {/* Glow effect */}
                <circle cx={pos.x} cy={pos.y} r="35" fill="none" stroke={color.light} strokeWidth="1" opacity="0.3" />
                {/* Lock symbol */}
                <rect x={pos.x - 8} y={pos.y - 5} width="12" height="10" fill="none" stroke={color.base} strokeWidth="1" />
                <circle cx={pos.x} cy={pos.y} r="2" fill={color.base} />
              </g>
            );
          })}

          {/* Escape path (main board path) */}
          {boardCells.map((cell, idx) => {
            const angle = (idx / 52) * Math.PI * 2 - Math.PI / 2;
            const radius = 120;
            const x = 250 + radius * Math.cos(angle);
            const y = 250 + radius * Math.sin(angle);

            return (
              <g key={`cell-${idx}`} className="escape-cell">
                <circle cx={x} cy={y} r="8" fill="#1a1a1a" stroke="#444" strokeWidth="1" />
                <circle cx={x} cy={y} r="7" fill="none" stroke="#666" strokeWidth="0.5" opacity="0.5" />
              </g>
            );
          })}

          {/* Central security checkpoint */}
          <g className="security-checkpoint">
            <circle cx="250" cy="250" r="40" fill="#0a0a0a" stroke="#666" strokeWidth="2" />
            <circle cx="250" cy="250" r="35" fill="none" stroke="#444" strokeWidth="1" />
            {/* VS symbol */}
            <text x="250" y="260" textAnchor="middle" fontSize="24" fontWeight="bold" fill="#888" className="vs-text">
              VS
            </text>
          </g>

          {/* Prison finish gate */}
          <g className="escape-gate">
            <rect x="240" y="180" width="20" height="40" fill="none" stroke="#10b981" strokeWidth="2" rx="2" />
            <line x1="245" y1="185" x2="245" y2="215" stroke="#10b981" strokeWidth="1" opacity="0.6" />
            <line x1="250" y1="185" x2="250" y2="215" stroke="#10b981" strokeWidth="1" opacity="0.6" />
          </g>

          {/* Render pieces */}
          {pieces.map((piece) => {
            const angle = (piece.position / 52) * Math.PI * 2 - Math.PI / 2;
            const radius = 120;
            const x = 250 + radius * Math.cos(angle);
            const y = 250 + radius * Math.sin(angle);
            const color = playerColors[piece.playerId as keyof typeof playerColors];

            return (
              <g key={piece.id} className={`piece ${animatingPiece === piece.id ? 'animating' : ''}`}>
                <circle cx={x} cy={y} r="10" fill={color.base} stroke={color.light} strokeWidth="2" />
                <circle cx={x} cy={y} r="6" fill={color.light} opacity="0.6" />
                <text x={x} y={y + 2} textAnchor="middle" fontSize="8" fontWeight="bold" fill="#000" className="piece-number">
                  {piece.playerId}
                </text>
              </g>
            );
          })}
        </svg>
      </div>

      {/* Dice and Controls */}
      <div className="ludo-controls">
        <button
          onClick={onDiceRoll}
          disabled={currentPlayer === 0}
          className="dice-button"
        >
          <div className="dice-face">
            <span>{diceResult || '?'}</span>
          </div>
          <span className="dice-label">ROLL</span>
        </button>

        {diceResult && (
          <div className="dice-result">
            Rolled: <strong>{diceResult}</strong>
          </div>
        )}
      </div>
    </div>
  );
}
