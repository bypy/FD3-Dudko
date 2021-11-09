/* eslint-disable react/no-deprecated */
'use strict';

import React from 'react';
import ReactDOM from 'react-dom';

import IShop from './components/IShop';

import lab02_data from './data/shop-items.json';

ReactDOM.render(
  React.DOM.div(
    { className: 'container' },
    React.createElement(IShop, {
      caption: lab02_data.caption,
      headline: lab02_data.headline,
      records: lab02_data.records,
    })
  ),
  document.getElementById('root')
);
