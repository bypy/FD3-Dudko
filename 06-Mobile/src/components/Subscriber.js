import React from 'react';
import { Fragment } from 'react';

import PropTypes from 'prop-types';

import { eventBus } from './eventBus';
import {
  LIFECYCLE_EVENT,
  RENDER_EVENT,
  ITEM_EDIT_COMPLETE,
  ITEM_EDIT,
  ITEM_DELETE,
  ITEM_SAVE,
  PREVENT_LOSING_CHANGES,
  SET_FORM_INVALID,
} from './eventsAvailable';
import { concatAndHash, newSubscriberTempId } from './utils';
import { VALIDATION_TYPES as v } from './validator';

import './Subscriber.scss';

export default class Subscriber extends React.PureComponent {
  static propTypes = {
    data: PropTypes.shape({
      id: PropTypes.number.isRequired,
      lastName: PropTypes.string.isRequired,
      firstName: PropTypes.string.isRequired,
      surName: PropTypes.string.isRequired,
      balance: PropTypes.number.isRequired,
    }), // is null in add subscriber mode
    companyInEditMode: PropTypes.bool,
    btn: PropTypes.shape({}),
  };

  static defaultProps = {
    companyInEditMode: null,
    btn: {
      edit: 'Редактировать',
      delete: 'Удалить',
    },
  };

  state = {
    subscriberInEditMode: false,
  }; // derivedProps: subscriberInEditMode, isBlockedCustomer

  static getDerivedStateFromProps(props, state) {
    eventBus.emit(LIFECYCLE_EVENT, `getDerivedStateFromProps from Subscriber id=${props.data.id} component`);
    let wasUnderEdit = state.subscriberInEditMode;
    let newEditInProgress = props.companyInEditMode;
    let dropEditMode = wasUnderEdit && newEditInProgress;
    return {
      subscriberInEditMode: dropEditMode, // other subscriber going to be changed
      isBlockedCustomer: props.data.balance < 0,
    };
  }

  componentDidMount() {
    eventBus.addListener(ITEM_SAVE, this.saveSubscriber);
  }

  componentWillUnmount() {
    eventBus.removeListener(ITEM_SAVE, this.saveSubscriber);
  }

  editSubscriber = (EO) => {
    EO.preventDefault();
    if (this.props.companyInEditMode) {
      if (confirm('Внесенные изменения будут потеряны! OK: сохранить')) {
        eventBus.emit(PREVENT_LOSING_CHANGES, true);
      } else {
        this.setState({ subscriberInEditMode: true });
        eventBus.emit(ITEM_EDIT);
        eventBus.emit(PREVENT_LOSING_CHANGES, false);
      }
    } else {
      this.setState({ subscriberInEditMode: true });
      eventBus.emit(ITEM_EDIT);
    }
  };

  unsetEditState = () => {
    this.setState({ subscriberInEditMode: false });
  };

  saveSubscriber = (argList) => {
    const [clearWarningsFlag, validationFunc] = argList;
    if (!this.state.subscriberInEditMode) return; // fires only for currently editing input field!
    clearWarningsFlag && this.hideErrors();
    const [errors, validUserData] = this.collectSubscriberErrorsAndData(validationFunc);
    if (errors.length) {
      this.showError(errors);
      eventBus.emit(SET_FORM_INVALID);
    } else {
      eventBus.emit(ITEM_EDIT_COMPLETE, validUserData);
    }
  };

  showError = (errorList) => {
    errorList.forEach((e) => {
      const { ref, errorText } = e;
      const errNode = document.createElement('span');
      errNode.className = 'invalid';
      errNode.textContent = errorText;
      ref.parentNode.appendChild(errNode);
    });
  };

  hideErrors = () => {
    const inputRefs = [this.lastNameRef, this.firstNameRef, this.surNameRef, this.balanceRef].filter((r) => !!r);
    inputRefs.forEach((ref) => {
      const errNode = ref.parentNode.querySelector('.invalid');
      errNode && ref.parentNode.removeChild(errNode);
    });
  };

  deleteRecord = () => {
    if (confirm(`Удаляем абонента ${this.props.data.firstName} c #${this.props.data.id}?`)) {
      eventBus.emit(ITEM_DELETE, this.props.data.id);
    }
  };

  collectSubscriberErrorsAndData = (getValidationError) => {
    let errorList = [];
    let lastName, lastNameError;
    if (this.lastNameRef) {
      lastNameError = getValidationError(this.lastNameRef.value, [v.notEmpty, v.isString, v.isWord, v.minLength(2)]);
      lastNameError && errorList.push({ ref: this.lastNameRef, errorText: lastNameError });
      lastName = this.lastNameRef.value;
    }
    let firstName, firstNameError;
    if (this.firstNameRef) {
      firstNameError = getValidationError(this.firstNameRef.value, [v.notEmpty, v.isString, v.isWord]);
      firstNameError && errorList.push({ ref: this.firstNameRef, errorText: firstNameError });
      firstName = this.firstNameRef.value;
    }
    let surName, surNameError;
    if (this.firstNameRef) {
      surNameError = getValidationError(this.surNameRef.value, [v.isWord]);
      surNameError && errorList.push({ ref: this.surNameRef, errorText: surNameError });
      surName = this.surNameRef.value;
    }
    let balance, balanceError;
    if (this.balanceRef) {
      balanceError = getValidationError(this.balanceRef.value, [v.notEmpty, v.isNumber]);
      balanceError && errorList.push({ ref: this.balanceRef, errorText: balanceError });
      balance = balanceError ? this.balanceRef.value : Number(this.balanceRef.value);
    }
    return [errorList, { ...this.props.data, lastName, firstName, surName, balance }];
  };

  setLastNameRef = (ref) => {
    this.lastNameRef = ref;
  };
  setFirstNameRef = (ref) => {
    this.firstNameRef = ref;
  };
  setSurNameRef = (ref) => {
    this.surNameRef = ref;
  };
  setBalanceRef = (ref) => {
    this.balanceRef = ref;
  };

  getStatusNameByCode = (isBlockedCustomer) => (isBlockedCustomer ? 'blocked' : 'active');

  render() {
    eventBus.emit(RENDER_EVENT, `${this.constructor.name} id=${this.props.data.id} component RENDER`);
    return (
      <div className="Subscriber" role="row">
        <div className="cell first left-align" role="cell">
          {this.state.subscriberInEditMode && (
            <Fragment>
              <input
                className="userDataInput"
                size={this.props.data.lastName.toString().length || 8} // 3 - default input width for empty content
                name="lastName"
                defaultValue={this.props.data.lastName}
                ref={this.setLastNameRef}
              />
              <span className="customerId">ID: {this.props.data.id}</span>
            </Fragment>
          )}
          {!this.state.subscriberInEditMode && (
            <Fragment>
              <span>{this.props.data.lastName}</span>
              <span className="customerId">ID: {this.props.data.id}</span>
            </Fragment>
          )}
        </div>
        <div className="cell left-align" role="cell">
          {this.state.subscriberInEditMode && (
            <input
              className="userDataInput"
              size={this.props.data.firstName.toString().length || 8} // 3 - default input width for empty content
              defaultValue={this.props.data.firstName}
              ref={this.setFirstNameRef}
            />
          )}
          {!this.state.subscriberInEditMode && this.props.data.firstName}
        </div>
        <div className="cell left-align" role="cell">
          {this.state.subscriberInEditMode && (
            <input
              className="userDataInput"
              size={this.props.data.surName.toString().length || 8} // 3 - default input width for empty content
              defaultValue={this.props.data.surName}
              ref={this.setSurNameRef}
            />
          )}
          {!this.state.subscriberInEditMode && this.props.data.surName}
        </div>
        <div className="cell" role="cell">
          {this.state.subscriberInEditMode && (
            <input
              className="userDataInput"
              size={this.props.data.balance.toString().length || 8} // 3 - default input width for empty content
              defaultValue={this.props.data.balance}
              ref={this.setBalanceRef}
            />
          )}
          {!this.state.subscriberInEditMode && this.props.data.balance}
        </div>
        <div className={this.state.isBlockedCustomer ? 'cell blocked' : 'cell'} role="cell">
          {this.getStatusNameByCode(this.state.isBlockedCustomer)}
        </div>
        <div className="cell" role="cell">
          <button
            className="actionBtn"
            onClick={this.editSubscriber}
            disabled={this.state.subscriberInEditMode || this.props.companyInEditMode}
          >
            {this.props.btn.edit}
          </button>
        </div>
        <div className="cell" role="cell">
          <button className="actionBtn" onClick={this.deleteRecord}>
            {this.props.btn.delete}
          </button>
        </div>
      </div>
    );
  }
}
