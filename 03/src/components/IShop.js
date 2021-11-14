import React from 'react';
import { Fragment } from 'react';
import PropTypes from 'prop-types';

import './IShop.scss';

import IShopItem from './IShopItem';
import IShopItemCard from './IShopItemCard';

class IShop extends React.Component {
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
    selectedRecordData: null,
    tableAria: 'Anti-virus price-list',
    addBtnText: 'Новый',
  };

  state = {
    caption: this.props.caption || 'Just another IShop',
    selectedRecord: this.props.selectedRecord,
    selectedRecordData: this.props.selectedRecordData,
    shopRecords: this.props.records,
  };

  getRecordData(id) {
    const filterResult = this.state.shopRecords.filter((cardRecord) => id === cardRecord.id);
    return filterResult.length > 0 ? filterResult[0] : null;
  }

  focusChangeCb = (itemId) => {
    this.setState({ selectedRecord: itemId });
    this.setState({ selectedRecordData: this.getRecordData(itemId) });
  };

  recordDeleteCb = (itemId) => {
    this.setState({ shopRecords: this.state.shopRecords.filter((rec) => rec.id !== itemId) });
  };

  confirmCb = (message) => confirm(message);

  render() {
    return (
      <Fragment>
        <div className="IShop" role="table" aria-label={this.props.tableAria}>
          <div className="caption">{this.props.caption}</div>
          <div className="headerWrapper">
            <div className="iShopHeader" role="row">
              {this.props.headline.map((property, index) => (
                <div key={index} className={index === 0 ? 'cell first' : 'cell'} role="columnheader">
                  {property}
                </div>
              ))}
            </div>
          </div>
          {this.state.shopRecords.map((cardRecord) => (
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
              onHasFocusCb={this.focusChangeCb}
              onRecordDeleteCb={this.recordDeleteCb}
              onConfirmCb={this.confirmCb}
            />
          ))}
          <div className="addRecordBtn">
            <button>{this.props.addBtnText}</button>
          </div>
        </div>
        {this.state.selectedRecord && this.state.selectedRecordData && (
          <IShopItemCard cardData={this.state.selectedRecordData} headline={this.props.headline} />
        )}
      </Fragment>
    );
  }
}

export default IShop;
