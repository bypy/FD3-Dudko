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
    editMode: PropTypes.bool,
    onRecordSaveCb: PropTypes.func,
    onRecordEditCancelCb: PropTypes.func,
  };

  static defaultProps = {
    validationIsEnabled: true,
    editMode: false, // false-view mode; true-edit mode
    saveBtnText: 'Сохранить',
    cancelBtnText: 'Отмена',
    errorInfo: null,
  };

  state = {
    isValid: true,
    id: this.props.cardData.id,
    name: this.props.cardData.name,
    price: this.props.cardData.price,
    currency: this.props.cardData.currency,
    url: this.props.cardData.url,
    quantity: this.props.cardData.quantity,
    details: this.props.cardData.details,
  };

  recordSaveHandler = (EO) => {
    // eslint-disable-next-line no-console
    console.log(EO.target.value);
  };

  recordEditCancelHandler = (EO) => {
    // eslint-disable-next-line no-console
    console.log(EO.target);
  };

  recordValidationHandler = (EO) => {
    // eslint-disable-next-line no-console
    console.log(EO.target);
  };

  userInputHandler = (EO, fieldName) => {
    this.setState({ [fieldName]: EO.target.value });
  };

  getCardRow(header, value, handler) {
    return (
      <div className="row" role="row">
        <div className="cell" role="cell">
          {header}
        </div>
        <div className="cell" role="cell">
          {this.props.editMode ? (
            <input className="userDataInput" size={value.toString().length} value={value} onChange={handler} />
          ) : (
            value
          )}
        </div>
      </div>
    );
  }

  render() {
    return (
      <div className="IShopItemCard" role="table" data-id={'# ' + this.state.id}>
        {this.getCardRow(this.props.headline[0], this.state.name, (EO) => this.userInputHandler(EO, 'name'))}
        {this.getCardRow(this.props.headline[1], this.state.price, (EO) => this.userInputHandler(EO, 'price'))}
        {this.getCardRow(this.props.headline[2], this.state.currency, (EO) =>
          this.userInputHandler(EO, 'currency')
        )}
        {this.getCardRow(this.props.headline[3], this.state.url, (EO) => this.userInputHandler(EO, 'url'))}
        {this.getCardRow(this.props.headline[4], this.state.quantity, (EO) =>
          this.userInputHandler(EO, 'quantity')
        )}
        {this.getCardRow(this.props.headline[5], this.state.details, (EO) =>
          this.userInputHandler(EO, 'details')
        )}

        {this.props.editMode && (
          <div className="row" role="row">
            <div className="cell" role="cell">
              {this.props.headline[6]}
            </div>
            <div className="cell button-cell" role="cell">
              <button className="actionBtn" onClick={this.recordSaveHandler}>
                {this.props.saveBtnText}
              </button>
              <button className="actionBtn" onClick={this.recordEditCancelHandler}>
                {this.props.cancelBtnText}
              </button>
            </div>
          </div>
        )}
      </div>
    );
  }
}
