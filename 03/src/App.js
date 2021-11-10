'use strict';

import React from 'react';
import ReactDOM from 'react-dom';

import './page.css';
import IShop from './components/IShop';

// import lab02_data from './data/shop-items.json';
const lab02_data = require('./data/shop-items.json');

ReactDOM.render(
  <div className="container">
    <IShop caption={lab02_data.caption} headline={lab02_data.headline} records={lab02_data.records} />
  </div>,
  document.getElementById('root')
);
