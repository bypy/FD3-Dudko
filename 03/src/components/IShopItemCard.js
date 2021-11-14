import React from 'react';
import PropTypes from 'prop-types';

import './IShopItemCard.scss';

export default class IShopItemCard extends React.Component {
  static propTypes = {
    headline: PropTypes.array.isRequired,
    cardData: PropTypes.shape({
      id: PropTypes.number.isRequired,
      name: PropTypes.string.isRequired,
      price: PropTypes.number.isRequired,
      currency: PropTypes.string.isRequired,
      url: PropTypes.string.isRequired,
      quantity: PropTypes.number.isRequired,
      details: PropTypes.string.isRequired,
    }),
    onRecordSaveCb: PropTypes.func,
    onRecordEditCancelCb: PropTypes.func,
  };

  static defaultProps = {
    validationIsEnabled: true,
    editMode: true, // false-view; true-edit
    saveBtnText: 'Сохранить',
    cancelBtnText: 'Отмена',
    errorInfo: null,
  };

  state = {
    editMode: this.props.editMode,
    errorInfo: this.props.errorInfo,
    cardData: this.props.cardData,
  };

  recordSaveHandler = (EO) => {
    // eslint-disable-next-line no-console
    console.log(EO.target);
  };

  recordEditCancelHandler = (EO) => {
    // eslint-disable-next-line no-console
    console.log(EO.target);
  };

  recordValidationHandler = (EO) => {
    // eslint-disable-next-line no-console
    console.log(EO.target);
  };

  getCardRow(header, value) {
    return (
      <div className="row" role="row">
        <div className="cell" role="cell">
          {header}
        </div>
        <div className="cell" role="cell">
          {this.state.editMode ? (
            <input
              className="userDataInput"
              size={(value.toString()).length}
              value={value}
              onChange={this.recordValidationHandler}
            />
          ) : (
            value
          )}
        </div>
      </div>
    );
  }

  render() {
    return (
      <div className="IShopItemCard" role="table">
        {this.getCardRow(this.props.headline[0], this.state.cardData.name)}
        {this.getCardRow(this.props.headline[1], this.state.cardData.price)}
        {this.getCardRow(this.props.headline[2], this.state.cardData.currency)}
        {this.getCardRow(this.props.headline[3], this.state.cardData.url)}
        {this.getCardRow(this.props.headline[4], this.state.cardData.quantity)}
        {this.getCardRow(this.props.headline[5], this.state.cardData.details)}

        {this.state.editMode && (
          <div className="row" role="row">
            <div className="cell" role="cell">
              {this.props.headline[6]}
            </div>
            <div className="cell" role="cell">
              <button className="actionBtn" onClick={this.recordSaveHandler}>
                {this.props.editBtnText}
              </button>
            </div>
            <div className="cell" role="cell">
              <button className="actionBtn" onClick={this.recordEditCancelHandler}>
                {this.props.deleteBtnText}
              </button>
            </div>
          </div>
        )}
      </div>
    );
  }
}
