import { useState } from 'react';
import { Mic, MicOff, Volume2, VolumeX, Copy, Share2, Users, MoreVertical } from 'lucide-react';
import '../styles/LudoRoom.css';

interface Player {
  id: number;
  name: string;
  avatar: string;
  level: number;
  wins: number;
  online: boolean;
  paymentStatus?: 'pending' | 'paid' | 'failed';
  speaking?: boolean;
}

interface LudoRoomProps {
  roomCode: string;
  players: Player[];
  maxPlayers: number;
  isBetGame?: boolean;
  entryAmount?: number;
  onStart?: () => void;
  onLeave?: () => void;
}

export default function LudoRoom({
  roomCode,
  players,
  maxPlayers,
  isBetGame = false,
  entryAmount = 0,
  onStart,
  onLeave,
}: LudoRoomProps) {
  const [micEnabled, setMicEnabled] = useState(false);
  const [speakerEnabled, setSpeakerEnabled] = useState(true);
  const [copiedCode, setCopiedCode] = useState(false);

  const handleCopyCode = () => {
    navigator.clipboard.writeText(roomCode);
    setCopiedCode(true);
    setTimeout(() => setCopiedCode(false), 2000);
  };

  const emptySlots = Array.from({ length: maxPlayers - players.length }, (_, i) => ({
    id: `empty-${i}`,
    status: 'waiting',
  }));

  const getPaymentStatusColor = (status?: string) => {
    switch (status) {
      case 'paid':
        return 'status-paid';
      case 'failed':
        return 'status-failed';
      default:
        return 'status-pending';
    }
  };

  const getPaymentStatusIcon = (status?: string) => {
    switch (status) {
      case 'paid':
        return '🟢';
      case 'failed':
        return '🔴';
      default:
        return '🟡';
    }
  };

  return (
    <div className={`ludo-room ${isBetGame ? 'bet-mode' : 'normal-mode'}`}>
      {/* Prison Command Room Background */}
      <div className="room-background">
        <div className="metal-panels"></div>
        <div className="warning-lights">
          <div className="light red"></div>
          <div className="light blue"></div>
        </div>
        <div className="chains-overlay"></div>
        <div className="smoke-effect"></div>
      </div>

      {/* Room Header */}
      <div className="room-header">
        <div className="header-content">
          <div className="room-title">
            {isBetGame ? '🔒 PRISON BET ROOM' : '🔒 PRISON ESCAPE ROOM'}
          </div>
          <div className="room-code">
            ROOM NO: <span className="code">{roomCode}</span>
            <button onClick={handleCopyCode} className="copy-btn" title="Copy room code">
              <Copy size={16} />
            </button>
          </div>
        </div>
        {isBetGame && entryAmount > 0 && (
          <div className="entry-info">
            <div className="entry-amount">KSh {entryAmount}</div>
            <div className="entry-label">Entry Fee</div>
          </div>
        )}
      </div>

      {/* Players Grid */}
      <div className="players-container">
        <div className="vs-symbol">VS</div>

        <div className="players-grid">
          {/* Player Slots */}
          {[0, 1, 2, 3].map((slotIndex) => {
            const player = players[slotIndex];

            return (
              <div key={slotIndex} className="player-slot">
                {player ? (
                  <div className={`player-card ${player.speaking ? 'speaking' : ''}`}>
                    <div className="player-avatar-wrapper">
                      <img
                        src={player.avatar}
                        alt={player.name}
                        className="player-avatar"
                      />
                      {player.online && <div className="online-indicator"></div>}
                      {player.speaking && <div className="speaking-ring"></div>}
                    </div>

                    <div className="player-info">
                      <div className="player-name">{player.name}</div>
                      <div className="player-level">Level {player.level}</div>
                      <div className="player-stats">
                        <span className="wins">🏆 {player.wins}</span>
                      </div>
                    </div>

                    {isBetGame && player.paymentStatus && (
                      <div className={`payment-status ${getPaymentStatusColor(player.paymentStatus)}`}>
                        <span className="status-icon">
                          {getPaymentStatusIcon(player.paymentStatus)}
                        </span>
                        <span className="status-text">
                          {player.paymentStatus === 'paid'
                            ? 'PAID'
                            : player.paymentStatus === 'failed'
                            ? 'FAILED'
                            : 'PENDING'}
                        </span>
                      </div>
                    )}
                  </div>
                ) : (
                  <div className="player-card empty">
                    <div className="empty-slot">
                      <Users size={32} opacity={0.5} />
                      <span>[WAITING]</span>
                    </div>
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </div>

      {/* Room Info */}
      {isBetGame && (
        <div className="bet-info">
          <div className="info-row">
            <span className="label">Players:</span>
            <span className="value">
              {players.length}/{maxPlayers}
            </span>
          </div>
          <div className="info-row">
            <span className="label">Total Pool:</span>
            <span className="value">KSh {players.length * entryAmount}</span>
          </div>
          <div className="info-row">
            <span className="label">Platform Fee:</span>
            <span className="value">KSh {Math.floor(players.length * entryAmount * 0.1)}</span>
          </div>
          <div className="info-row highlight">
            <span className="label">Prize Pool:</span>
            <span className="value">KSh {Math.floor(players.length * entryAmount * 0.9)}</span>
          </div>
        </div>
      )}

      {/* Voice Controls */}
      <div className="voice-controls">
        <button
          onClick={() => setMicEnabled(!micEnabled)}
          className={`voice-btn mic-btn ${micEnabled ? 'active' : ''}`}
          title={micEnabled ? 'Mute microphone' : 'Unmute microphone'}
        >
          {micEnabled ? <Mic size={20} /> : <MicOff size={20} />}
          <span className="btn-label">{micEnabled ? 'Mic On' : 'Mic Off'}</span>
        </button>

        <button
          onClick={() => setSpeakerEnabled(!speakerEnabled)}
          className={`voice-btn speaker-btn ${speakerEnabled ? 'active' : ''}`}
          title={speakerEnabled ? 'Mute speaker' : 'Unmute speaker'}
        >
          {speakerEnabled ? <Volume2 size={20} /> : <VolumeX size={20} />}
          <span className="btn-label">{speakerEnabled ? 'Speaker On' : 'Speaker Off'}</span>
        </button>

        <button className="voice-btn share-btn" title="Share room">
          <Share2 size={20} />
          <span className="btn-label">Share</span>
        </button>
      </div>

      {/* Action Buttons */}
      <div className="room-actions">
        <button
          onClick={onStart}
          disabled={players.length < 2}
          className="btn btn-start"
        >
          <span className="btn-text">START GAME</span>
          <span className="btn-subtext">
            {players.length < 2 ? `Need ${2 - players.length} more player` : 'Ready!'}
          </span>
        </button>

        <button onClick={onLeave} className="btn btn-leave">
          <span className="btn-text">LEAVE ROOM</span>
        </button>
      </div>

      {/* Copy notification */}
      {copiedCode && (
        <div className="copy-notification">
          ✓ Room code copied!
        </div>
      )}
    </div>
  );
}
