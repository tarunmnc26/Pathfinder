import React from 'react';

const Node = ({ row, col, isFinish, isStart, isWall, onNodeClick }) => {
  let status = '';
  if (isFinish) status = 'node--finish';
  if (isStart) status = 'node--start';
  if (isWall) status = 'node--wall';

  return (
    <div
      id={`node-${row}-${col}`}
      className={`node ${status}`}
      onClick={() => onNodeClick(row, col)}
    ></div>
  );
};

export default Node;