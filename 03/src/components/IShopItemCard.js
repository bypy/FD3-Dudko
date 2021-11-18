import React from 'react';
import PropTypes from 'prop-types';

import { VALIDATION_TYPES as v } from './../utils/validator';

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
    validator: PropTypes.func,
  };

  static defaultProps = {
    validationIsEnabled: true,
    editMode: false, // false-view mode; true-edit mode
    saveBtnText: 'Сохранить',
    cancelBtnText: 'Отмена',
    errorInfo: null,
  };

  state = {
    id: this.props.cardData.id,
    name: this.props.cardData.name,
    price: this.props.cardData.price,
    currency: this.props.cardData.currency,
    url: this.props.cardData.url,
    quantity: this.props.cardData.quantity,
    details: this.props.cardData.details,
    idValidation: null,
    nameValidation: null,
    priceValidation: null,
    currencyValidation: null,
    urlValidation: null,
    quantityValidation: null,
    detailsValidation: null,
    formIsValid: true,
    unsavedChanges: false,
  };

  recordSaveHandler = (EO) => {
    // eslint-disable-next-line no-console
    console.log(EO.target.value);
    if (!this.state.isValid) {
      return;
    }
    if (this.props.onRecordSaveCb) {
      this.props.onRecordSaveCb([
        this.state.id,
        this.state.name,
        this.state.price,
        this.state.currency,
        this.state.url,
        this.state.quantity,
        this.state.details,
      ]);
    }
  };

  recordEditCancelHandler = (EO) => {
    // eslint-disable-next-line no-console
    console.log(EO.target);
    this.props.onRecordEditCancelCb();
  };

  // checkFormIsValid = () => {
  //   let {
  //     idValidation,
  //     nameValidation,
  //     priceValidation,
  //     currencyValidation,
  //     urlValidation,
  //     quantityValidation,
  //     detailsValidation,
  //   } = this.state;
  //   let errors = [
  //     idValidation,
  //     nameValidation,
  //     priceValidation,
  //     currencyValidation,
  //     urlValidation,
  //     quantityValidation,
  //     detailsValidation,
  //   ].find((error) => error !== null);
  //   if (errors.length > 0) {
  //     this.setState({ formIsValid: false });
  //   }
  // };

  userInputHandler = (EO, fieldName) => {
    this.setState({ unsavedChanges: true });
    this.setState({ [fieldName]: EO.target.value });
    if (!this.props.validationIsEnabled) return;
    let validationError = this.props.validator(EO.target.value, this.getValidationRulesByFieldName(fieldName));
    if (validationError) {
      this.setState({ formIsValid: false });
      this.setState({ [fieldName.concat('Validation')]: validationError });
    }
  };

  getCardRow(header, value, errorMessage, editHandler) {
    return (
      <div className="row" role="row">
        <div className="cell" role="cell">
          {header}
        </div>
        <div className="cell" role="cell">
          {this.props.editMode && (
            <input
              className="userDataInput"
              size={value.toString().length}
              value={value}
              onChange={editHandler}
              // onBlur={this.checkFormIsValid}
            />
          )}
          {errorMessage && <span className="errMessage">{errorMessage}</span>}

          {!this.props.editMode && value}
        </div>
      </div>
    );
  }

  getValidationRulesByFieldName(filedName) {
    let rules = [];
    switch (filedName) {
      case 'name':
        rules = [v.notEmpty, v.isString];
        break;
      case 'price':
        rules = [v.notEmpty, v.isNumber];
        break;
      case 'currency':
        rules = [v.notEmpty, v.isCurrency];
        break;
      case 'quantity':
        rules = [v.notEmpty, v.isNumber, v.isNaturalNumber];
        break;
      case 'details':
        rules = [v.notEmpty, v.isString, v.minLength(5)];
        break;
    }
    return rules;
  }

  render() {
    return (
      <div className="IShopItemCard" role="table" data-id={'# ' + this.state.id}>
        {this.getCardRow(this.props.headline[0], this.state.name, this.state.nameValidation, (EO) =>
          this.userInputHandler(EO, 'name')
        )}
        {this.getCardRow(this.props.headline[1], this.state.price, this.state.priceValidation, (EO) =>
          this.userInputHandler(EO, 'price')
        )}
        {this.getCardRow(this.props.headline[2], this.state.currency, this.state.currencyValidation, (EO) =>
          this.userInputHandler(EO, 'currency')
        )}
        {this.getCardRow(this.props.headline[3], this.state.url, this.state.urlValidation, (EO) =>
          this.userInputHandler(EO, 'url')
        )}
        {this.getCardRow(this.props.headline[4], this.state.quantity, this.state.quantityValidation, (EO) =>
          this.userInputHandler(EO, 'quantity')
        )}
        {this.getCardRow(this.props.headline[5], this.state.details, this.state.detailsValidation, (EO) =>
          this.userInputHandler(EO, 'details')
        )}

        {this.props.editMode && (
          <div className="row" role="row">
            <div className="cell" role="cell">
              {this.props.headline[6]}
            </div>
            <div className="cell button-cell" role="cell">
              <button
                className="actionBtn"
                disabled={!(this.state.formIsValid && this.state.unsavedChanges)}
                onClick={this.recordSaveHandler}
              >
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
