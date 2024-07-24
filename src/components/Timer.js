import React from 'react';

const Timer = ({ label, time }) => {
  const formatTime = (seconds) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins}:${secs < 10 ? '0' : ''}${secs}`;
  };

  return (
    <div className="timer">
      <h3>{label} Timer</h3>
      <p>{formatTime(time)}</p>
    </div>
  );
};

export default Timer;
