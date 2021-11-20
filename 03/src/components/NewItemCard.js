import React from 'react';
import PropTypes from 'prop-types';

import { VALIDATION_TYPES as v } from '../utils/validator';

import './IShopItemCard.scss';

export default class NewItemCard extends React.Component {
  static propTypes = {
    id: PropTypes.number.isRequired,
    headline: PropTypes.array.isRequired,
    onEditInProgressCb: PropTypes.func,
    onEditCancelCb: PropTypes.func,
    onSaveRecordCb: PropTypes.func,
    validator: PropTypes.func,
  };

  static defaultProps = {
    saveBtnText: 'Сохранить',
    cancelBtnText: 'Отмена',
  };

  state = {
    id: this.props.id,
    name: '',
    price: '',
    currency: '',
    url: '',
    quantity: '',
    details: '',
    nameValidation: 'Пустое значение не допустимо',
    priceValidation: 'Пустое значение не допустимо',
    currencyValidation: 'Пустое значение не допустимо',
    urlValidation: 'Пустое значение не допустимо',
    quantityValidation: 'Пустое значение не допустимо',
    detailsValidation: 'Пустое значение не допустимо',
    formIsValid: false,
    unsavedChanges: false,
  };

  saveRecordHandler = () => {
    if (!this.state.formIsValid) {
      return;
    }
    if (this.props.onSaveRecordCb) {
      this.props.onSaveRecordCb({
        id: this.state.id,
        name: this.state.name,
        price: Number(this.state.price),
        currency: this.state.currency,
        url: this.state.url,
        quantity: Number(this.state.quantity),
        details: this.state.details,
      });
    }
  };

  createRecordCancelHandler = () => {
    this.setState({
      id: this.props.id,
      name: '',
      price: '',
      currency: '',
      url: '',
      quantity: '',
      details: '',
      nameValidation: null,
      priceValidation: null,
      currencyValidation: null,
      urlValidation: null,
      quantityValidation: null,
      detailsValidation: null,
      formIsValid: true,
      unsavedChanges: false,
    });
    if (this.props.onEditCancelCb) this.props.onEditCancelCb(null);
  };

  userInputHandler = (fieldValue, fieldName) => {
    this.setState({ unsavedChanges: true });
    this.setState({ [fieldName]: fieldValue });
    let validationError = this.props.validator(fieldValue, this.getValidationRulesByFieldName(fieldName));
    if (validationError) {
      this.setState({ formIsValid: false });
      this.setState({ [fieldName.concat('Validation')]: validationError });
    } else {
      // check other inputs after state will be updated
      this.setState({ [fieldName.concat('Validation')]: null }, this.checkFormIsValidAndChanged);
    }
  };

  editProgressHandler = () => {
    if (this.props.onEditInProgressCb) {
      this.props.onEditInProgressCb(this.state.unsavedChanges); // true: freeze UI; false: unfreeze
    }
  };

  checkFormIsValidAndChanged = () => {
    let isFormInvalid =
      this.state.nameValidation !== null ||
      this.state.priceValidation !== null ||
      this.state.currencyValidation !== null ||
      this.state.urlValidation !== null ||
      this.state.quantityValidation !== null ||
      this.state.detailsValidation !== null;

    if (!isFormInvalid && !this.state.formIsValid) {
      // update if only form were invalid
      this.setState({ formIsValid: true });
    }

    if (
      this.state.name !== '' ||
      this.state.price !== '' ||
      this.state.currency !== '' ||
      this.state.url !== '' ||
      this.state.quantity !== '' ||
      this.state.details !== ''
    ) {
      this.setState({ unsavedChanges: true }, this.editProgressHandler);
    } else if (this.state.unsavedChanges) {
      this.setState({ unsavedChanges: false }, this.editProgressHandler); // if we've got the same form stuff after editing
    }
  };

  getValidationRulesByFieldName = (filedName) => {
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
      case 'url':
        rules = [v.notEmpty, v.isURL];
        break;
      case 'quantity':
        rules = [v.notEmpty, v.isNumber, v.isNaturalNumber];
        break;
      case 'details':
        rules = [v.notEmpty, v.isString, v.minLength(5)];
        break;
    }
    return rules;
  };

  getCardRow(header, value, errorMessage, editHandler) {
    return (
      <div className="row" role="row">
        <div className="cell" role="cell">
          {header}
        </div>
        <div className="cell" role="cell">
          <input className="userDataInput" size={value.toString().length} value={value} onChange={editHandler} />
          {errorMessage && <span className="errMessage">{errorMessage}</span>}
        </div>
      </div>
    );
  }

  render() {
    return (
      <div className="NewItemCard" role="table" data-id={'# ' + this.state.id}>
        {this.getCardRow(this.props.headline[0], this.state.name, this.state.nameValidation, (EO) =>
          this.userInputHandler(EO.target.value, 'name')
        )}
        {this.getCardRow(this.props.headline[1], this.state.price, this.state.priceValidation, (EO) =>
          this.userInputHandler(EO.target.value, 'price')
        )}
        {this.getCardRow(this.props.headline[2], this.state.currency, this.state.currencyValidation, (EO) =>
          this.userInputHandler(EO.target.value, 'currency')
        )}
        {this.getCardRow(this.props.headline[3], this.state.url, this.state.urlValidation, (EO) =>
          this.userInputHandler(EO.target.value, 'url')
        )}
        {this.getCardRow(this.props.headline[4], this.state.quantity, this.state.quantityValidation, (EO) =>
          this.userInputHandler(EO.target.value, 'quantity')
        )}
        {this.getCardRow(this.props.headline[5], this.state.details, this.state.detailsValidation, (EO) =>
          this.userInputHandler(EO.target.value, 'details')
        )}

        <div className="row" role="row">
          <div className="cell" role="cell">
            {this.props.headline[6]}
          </div>
          <div className="cell button-cell" role="cell">
            <button
              className="actionBtn"
              disabled={!(this.state.formIsValid && this.state.unsavedChanges)}
              onClick={this.saveRecordHandler}
            >
              {this.props.saveBtnText}
            </button>
            <button className="actionBtn" onClick={this.createRecordCancelHandler}>
              {this.props.cancelBtnText}
            </button>
          </div>
        </div>
      </div>
    );
  }
}
