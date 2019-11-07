import React from 'react';

export const Mask = ({ mask }) => {
  const {
    pos: [x, y],
    size: [w, h],
  } = mask;
  return (
    <svg
      className="mask"
      style={{
        transform: `translate(${x}px, ${y}px)`,
        width: `${w}px`,
        height: `${h}px`,
      }}
    ></svg>
  );
};
