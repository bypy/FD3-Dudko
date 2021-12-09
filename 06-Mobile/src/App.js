import React from 'react';
import ReactDOM from 'react-dom';

import '../public/page.css';
import MobileCompany from './components/MobileCompany';

ReactDOM.render(
  <div className="container">
    <MobileCompany subscribers={require('./data/subscribers.json')} loggerMode="debug" />
  </div>,
  document.getElementById('root')
);
