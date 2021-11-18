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
    validator: PropTypes.func,
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
    selectedRecordEditMode: false,
    shopRecords: this.props.records,
  };

  getRecordData(id) {
    const filterResult = this.state.shopRecords.filter((cardRecord) => id === cardRecord.id);
    return filterResult.length > 0 ? filterResult[0] : null;
  }

  setSelectedRecord(itemId) {
    this.setState({ selectedRecord: itemId });
    this.setState({ selectedRecordData: this.getRecordData(itemId) });
  }

  changeSelectedRecordCb = (itemId) => {
    this.setSelectedRecord(itemId);
    this.setState({ selectedRecordEditMode: false });
  };

  recordEditCb = (itemId) => {
    this.setSelectedRecord(itemId);
    this.setState({ selectedRecordEditMode: true });
  };

  recordDeleteCb = (itemId) => {
    this.setState({ shopRecords: this.state.shopRecords.filter((rec) => rec.id !== itemId) });
    this.setState({ selectedRecordEditMode: false });
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
              onHasFocusCb={this.changeSelectedRecordCb}
              onRecordEditCb={this.recordEditCb}
              onRecordDeleteCb={this.recordDeleteCb}
              onConfirmCb={this.confirmCb}
            />
          ))}
          <div className="addRecordBtn">
            <button disabled={this.state.selectedRecordEditMode}>{this.props.addBtnText}</button>
          </div>
        </div>
        {this.state.selectedRecord !== null && this.state.selectedRecordData !== null && (
          <IShopItemCard
            key={this.state.selectedRecordData.id}
            headline={this.props.headline}
            cardData={this.state.selectedRecordData}
            editMode={this.state.selectedRecordEditMode}
            validator={this.props.validator}
          />
        )}
      </Fragment>
    );
  }
}

export default IShop;
