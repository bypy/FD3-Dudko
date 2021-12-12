import React from 'react';
import { Fragment } from 'react';
import PropTypes from 'prop-types';

import './IShop.scss';

import IShopItem from './IShopItem';
import IShopItemCard from './IShopItemCard';
import NewItemCard from './NewItemCard';

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
    tableAria: 'Anti-virus price-list',
    addBtnText: 'Новый',
  };

  state = {
    caption: this.props.caption || 'Just another IShop',
    selectedRecord: null,
    selectedRecordData: null,
    shopRecords: this.props.records,
    editMode: false,
    createMode: false,
    editInProgress: false,
    nextId: this.props.records.length + 1,
  };

  getRecordData(id) {
    const filterResult = this.state.shopRecords.filter((cardRecord) => id === cardRecord.id);
    return filterResult.length > 0 ? filterResult[0] : null;
  }

  setSelectedRecordData(itemId) {
    this.setState({ selectedRecord: itemId });
    this.setState({ selectedRecordData: this.getRecordData(itemId) });
  }

  updateNextId() {
    let lastId = this.state.shopRecords.length;
    this.state.shopRecords.forEach((rec) => {
      if (lastId < rec.id) lastId = rec.id;
    });
    this.setState({ nextId: lastId + 1 });
  }

  changeSelectedRecordCb = (itemId) => {
    this.setSelectedRecordData(itemId);
    this.setState({ editMode: false });
  };

  recordEditCb = (itemId) => {
    this.setSelectedRecordData(itemId);
    this.setState({ editMode: true });
  };

  recordDeleteCb = (itemId) => {
    this.setState({ shopRecords: this.state.shopRecords.filter((rec) => rec.id !== itemId) }, this.updateNextId);
    this.setState({ editMode: false });
  };

  editInProgressCb = (status) => {
    this.setState({ editInProgress: status });
  };

  editCancelCb = (itemId) => {
    this.setState({ editInProgress: false, editMode: false, createMode: false, selectedRecord: itemId });
  };

  saveRecordCb = (editedCardData) => {
    let isNewCard = true;
    let updatedShopRecords = this.state.shopRecords.map((cardData) => {
      if (cardData.id === editedCardData.id) {
        isNewCard = false;
        return editedCardData;
      } else return cardData;
    });
    if (isNewCard) updatedShopRecords.push(editedCardData);
    if (this.state.createMode) this.setState({ createMode: false });
    this.setState({ shopRecords: updatedShopRecords, editMode: false, editInProgress: false }, this.updateNextId);
  };

  addNewRecordCb = () => {
    this.changeSelectedRecordCb(null); // reuse method to deselect record and drop edit mode
    this.setState({ createMode: true });
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
              selectedRecord={this.state.selectedRecord}
              onHasFocusCb={this.changeSelectedRecordCb}
              onRecordEditCb={this.recordEditCb}
              onRecordDeleteCb={this.recordDeleteCb}
              onConfirmCb={this.confirmCb}
              editMode={this.state.editMode}
              createMode={this.state.createMode}
              freezeMode={this.state.editInProgress}
            />
          ))}
          <div className="addRecordBtn">
            <button disabled={this.state.editMode || this.state.createMode} onClick={this.addNewRecordCb}>
              {this.props.addBtnText}
            </button>
          </div>
        </div>
        {!this.state.createMode && this.state.selectedRecord !== null && this.state.selectedRecordData !== null && (
          <IShopItemCard
            key={this.state.selectedRecordData.id}
            cardData={this.state.selectedRecordData}
          />
        )}
        {this.state.createMode && (
          <NewItemCard
            id={this.state.nextId}
            headline={this.props.headline}
            onEditInProgressCb={this.editInProgressCb}
            onEditCancelCb={this.editCancelCb}
            onSaveRecordCb={this.saveRecordCb}
            validator={this.props.validator}
          />
        )}
      </Fragment>
    );
  }
}

export default IShop;
