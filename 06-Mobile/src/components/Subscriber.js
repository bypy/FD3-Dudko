import React from 'react';

import { PropTypes } from 'prop-types';

export default class Subscriber extends React.Component {
  state = { ...this.props.data };

  render() {
    return (
      <div className="IShopItem" role="row">
        <div className="cell first left-align" role="cell">
          {this.state.lastName}
        </div>
        <div className="cell" role="cell">
          {this.state.firstName}
        </div>
        <div className="cell" role="cell">
          {this.state.surName}
        </div>
        <div className="cell left-align" role="cell">
          {this.state.balance}
        </div>
        <div className="cell" role="cell">
          {this.state.status}
        </div>
      </div>
    );
  }
}
