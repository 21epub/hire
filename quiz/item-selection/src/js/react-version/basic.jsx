import React from 'react';
import ReactDOM from 'react-dom';

import { App } from './components/editor-with-mask';
import { itemGroup } from '../data';

// * ----------------

const $container = document.querySelector('#container');

ReactDOM.render(<App itemGroup={itemGroup} mask={false} />, $container);
