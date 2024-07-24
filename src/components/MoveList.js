import React from 'react';

const MoveList = ({ moveHistory }) => {
  return (
    <div className="move-list">
      <h2>Move History</h2>
      <ul>
        {moveHistory.map((move, index) => (
          <li key={index}>{move}</li>
        ))}
      </ul>
    </div>
  );
};

export default MoveList;
