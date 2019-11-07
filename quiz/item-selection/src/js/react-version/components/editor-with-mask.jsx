import React from 'react';

import { Mask } from './mask';
import { ItemOverlay } from './item-overlay';

export const App = ({ itemGroup, mask }) => {
  return (
    <>
      {mask ? <Mask mask={mask} /> : <></>}
      {itemGroup.map((item) => (
        <ItemOverlay key={item.id} item={item}></ItemOverlay>
      ))}
    </>
  );
};
