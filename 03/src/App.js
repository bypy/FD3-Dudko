'use strict';

import React from 'react';
import ReactDOM from 'react-dom';

import validator from './utils/validator';

import '../public/page.css';
import IShop from './components/IShop';

const lab02_data = require('./data/shop-items.json');

ReactDOM.render(
  <div className="container">
    <IShop
      caption={lab02_data.caption}
      headline={lab02_data.headline}
      records={lab02_data.records}
      validator={validator}
    />
  </div>,
  document.getElementById('root')
);
