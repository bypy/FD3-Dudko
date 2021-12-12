import React from 'react';
import { Fragment } from 'react';

import PropTypes from 'prop-types';

import { eventBus } from './eventBus';
import { LIFECYCLE_EVENT, RENDER_EVENT, ITEM_CLICKED, ITEM_EDIT, EDIT_COMPLETE, ITEM_DELETE } from './eventsAvailable';
import { concatAndHash, newSubscriberTempId } from './utils';
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
    editedSubscriber: PropTypes.number,
    btn: PropTypes.shape({}),
  };

  static defaultProps = {
    editedSubscriber: null,
    btn: {
      edit: 'Редактировать',
      delete: 'Удалить',
    },
  };

  state = {};

  static getDerivedStateFromProps(props, state) {
    eventBus.emit(LIFECYCLE_EVENT, `getDerivedStateFromProps from Subscriber id=${props.data.id} component`);
    return {
      isEditMode: props.editedSubscriber === props.data.id,
      isBlocked: props.data.balance < 0,
    };
  }

  clickedOutside = () => {
    if (this.props.data.id === this.state.editedSubscriber) return;
    eventBus.emit(ITEM_CLICKED, this.props.data.id);
    this.updateSubscriberData();
  };

  editRecord = (EO) => {
    EO.stopPropagation();
    eventBus.emit(ITEM_EDIT, this.props.data.id);
  };

  deleteRecord = () => {
    if (confirm(`Удаляем абонента ${this.props.data.firstName} c #${this.props.data.id}?`)) {
      eventBus.emit(ITEM_DELETE, this.props.data.id);
    }
  };

  updateSubscriberData = () => {};

  setLastNameRef = (ref) => {
    this.lastNameRef = ref;
  };
  setFirstNameRef = (ref) => {
    this.firstNameRef = ref;
  };
  setSurNameRef = (ref) => {
    this.surNameRef = ref;
  };

  getStatusNameByCode = (isBlocked) => (isBlocked ? 'blocked' : 'active');

  render() {
    eventBus.emit(RENDER_EVENT, `${this.constructor.name} id=${this.props.data.id} component RENDER`);
    return (
      <div className="Subscriber" role="row" onClick={this.clickedOutside}>
        <div className="cell first left-align" role="cell">
          {this.state.isEditMode && (
            <Fragment>
              <input
                className="userDataInput"
                size={this.props.data.lastName.toString().length || 3} // 3 - default input width for empty content
                defaultValue={this.props.data.lastName}
                ref={this.setLastNameRef}
              />
              <span className="customerId">ID: {this.props.data.id}</span>
            </Fragment>
          )}
          {!this.state.isEditMode && (
            <Fragment>
              <span>{this.props.data.lastName}</span>
              <span className="customerId">ID: {this.props.data.id}</span>
            </Fragment>
          )}
        </div>
        <div className="cell left-align" role="cell">
          {this.state.isEditMode && (
            <input
              className="userDataInput"
              size={this.props.data.firstName.toString().length || 3} // 3 - default input width for empty content
              defaultValue={this.props.data.firstName}
              ref={this.setFirstNameRef}
            />
          )}
          {!this.state.isEditMode && this.props.data.firstName}
        </div>
        <div className="cell left-align" role="cell">
          {this.state.isEditMode && (
            <input
              className="userDataInput"
              size={this.props.data.surName.toString().length || 3} // 3 - default input width for empty content
              defaultValue={this.props.data.surName}
              ref={this.setSurNameRef}
            />
          )}
          {!this.state.isEditMode && this.props.data.surName}
        </div>
        <div className="cell" role="cell">
          {this.state.isEditMode && (
            <input
              className="userDataInput"
              size={this.props.data.balance.toString().length || 3} // 3 - default input width for empty content
              defaultValue={this.props.data.balance}
            />
          )}
          {!this.state.isEditMode && this.props.data.balance}
        </div>
        <div className={this.state.isBlocked ? 'cell blocked' : 'cell'} role="cell">
          {this.getStatusNameByCode(this.state.isBlocked)}
        </div>
        <div className="cell" role="cell">
          <button className="actionBtn" onClick={this.editRecord} disabled={this.state.isEditMode}>
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
