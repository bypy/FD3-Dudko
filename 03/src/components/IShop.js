import React from 'react';
import PropTypes from 'prop-types';

import './IShop.scss';

import IShopItem from './IShopItem';

class IShop extends React.Component {
  constructor(props) {
    super(props);
    // initial state
    this.state = {
      caption: this.props.caption || 'Just another IShop',
      selectedRecord: this.props.selectedRecord,
      shopRecords: this.props.records,
    };
  }

  static propTypes = {
    caption: PropTypes.string,
    headline: PropTypes.array.isRequired,
    records: PropTypes.arrayOf(
      PropTypes.shape({
        id: PropTypes.number.isRequired,
        name: PropTypes.string.isRequired,
        price: PropTypes.number.isRequired,
        currency: PropTypes.string.isRequired,
        url: PropTypes.string.isRequired,
        quantity: PropTypes.number.isRequired,
        details: PropTypes.string.isRequired,
      })
    ),
  };

  static defaultProps = {
    selectedRecord: null,
    tableAria: 'Anti-virus price-list',
  };

  getHeader(shopCardProperties) {
    return (
      <div className="iShopHeader" role="row">
        {shopCardProperties.map((property, index) => (
          <div key={index} className={index === 0 ? 'cell first' : 'cell'} role="columnheader">
            {property}
          </div>
        ))}
      </div>
    );
  }

  getRecords() {
    return this.state.shopRecords.map((cardRecord) => (
      <IShopItem
        key={cardRecord.id}
        id={cardRecord.id}
        name={cardRecord.name}
        price={cardRecord.price}
        currency={cardRecord.currency}
        url={cardRecord.url}
        quantity={cardRecord.quantity}
        details={cardRecord.details}
        focus={this.state.selectedRecord}
        onFocusChangeCb={this.focusChangeCb}
        onRecordDeleteCb={this.recordDeleteCb}
        onConfirmCb={this.confirmCb}
      />
    ));
  }

  focusChangeCb = (itemId) => {
    this.setState({ selectedRecord: itemId });
  };

  recordDeleteCb = (itemId) => {
    this.setState({ shopRecords: this.state.shopRecords.filter((rec) => rec.id !== itemId) });
  };

  confirmCb = (message) => confirm(message);

  render() {
    return (
      <div className="IShop" role="table" aria-label={this.props.tableAria}>
        <div className="headerWrapper">
          <div className="caption">{this.props.caption}</div>
          {this.getHeader(this.props.headline)}
        </div>
        {this.getRecords()}
      </div>
    );
  }
}

export default IShop;
