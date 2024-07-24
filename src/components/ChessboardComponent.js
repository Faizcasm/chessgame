import React, { useState, useEffect } from 'react';
import { Chessboard } from 'react-chessboard';
import { Chess } from 'chess.js';
import MoveList from './MoveList';
import Timer from './Timer';

const ChessboardComponent = () => {
  const [game, setGame] = useState(new Chess());
  const [fen, setFen] = useState(game.fen());
  const [moveHistory, setMoveHistory] = useState([]);
  const [whiteTime, setWhiteTime] = useState(300); // 5 minutes in seconds
  const [blackTime, setBlackTime] = useState(300);
  const [currentPlayer, setCurrentPlayer] = useState('w');

  useEffect(() => {
    const timer = setInterval(() => {
      if (currentPlayer === 'w') {
        setWhiteTime((time) => Math.max(time - 1, 0));
      } else {
        setBlackTime((time) => Math.max(time - 1, 0));
      }
    }, 1000);

    return () => clearInterval(timer);
  }, [currentPlayer]);

  const handleMove = (sourceSquare, targetSquare) => {
    const gameCopy = new Chess(game.fen());

    // Check if the move is a promotion
    const isPromotion =
      gameCopy.get(sourceSquare).type === 'p' &&
      (targetSquare[1] === '8' || targetSquare[1] === '1');

    const moveObject = {
      from: sourceSquare,
      to: targetSquare,
    };

    if (isPromotion) {
      moveObject.promotion = 'q'; // Promote to queen if applicable
    }

    const result = gameCopy.move(moveObject);

    if (result) {
      setGame(gameCopy);
      setFen(gameCopy.fen());
      setMoveHistory([...moveHistory, result.san]);
      setCurrentPlayer(currentPlayer === 'w' ? 'b' : 'w');
    } else {
      alert('Invalid move');
    }
  };

  const isGameOver = game.isGameOver();

  useEffect(() => {
    if (isGameOver) {
      alert('Game over');
    }
  }, [isGameOver]);

  return (
    <div className="chessboard-container">
      <h1>Chess Game</h1>
      <Chessboard position={fen} onPieceDrop={handleMove} />
      <MoveList moveHistory={moveHistory} />
      <div className="timer-container">
        <Timer label="White" time={whiteTime} />
        <Timer label="Black" time={blackTime} />
      </div>
    </div>
  );
};

export default ChessboardComponent;
