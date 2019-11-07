import React from 'react';

export const ItemOverlay = ({ item }) => {
  const {
    pos: [x, y],
    size: [w, h],
    type,
    actived,
    value,
  } = item;

  let className = 'item';
  if (actived) {
    className += ' actived';
  }

  return (
    <div
      className={className}
      style={{
        transform: `translate(${x}px, ${y}px)`,
        width: `${w}px`,
        height: `${h}px`,
      }}
      data-type={type}
    >
      <div className="el-button-mix">{value}</div>
    </div>
  );
};
