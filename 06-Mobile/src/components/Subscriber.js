import React from 'react';
import { Fragment } from 'react';

import PropTypes from 'prop-types';

import { eventBus } from './eventBus';
import { RENDER_EVENT, ITEM_CLICKED } from './eventsAvailable';
import { LOG_MODE } from './logModes';

export default class Subscriber extends React.PureComponent {
  static propTypes = {
    data: PropTypes.shape({
      id: PropTypes.number.isRequired,
      lastName: PropTypes.string.isRequired,
      firstName: PropTypes.string.isRequired,
      surName: PropTypes.string.isRequired,
      balance: PropTypes.number.isRequired,
    }), // is null in add subscriber mode
    selectedSubscriber: PropTypes.number,
    currentFilter: PropTypes.number,
    isEditMode: PropTypes.bool,
    btn: PropTypes.shape({}),
    status: PropTypes.shape({}),
  };

  static defaultProps = {
    isEditMode: false,
    selectedSubscriber: null,
    currentFilter: 0,
    status: {
      active: {
        name: 'active',
        code: 1,
      },
      blocked: {
        name: 'blocked',
        code: 2,
      },
    },
    btn: {
      edit: 'Редактировать',
      delete: 'Удалить',
      add: 'Добавить клиента',
    },
  };

  state = {
    ...this.props.data,
    isEditMode: this.props.isEditMode,
    // currentFilter: this.props.currentFilter,
    status: 0 > this.props.data.balance ? this.props.status.blocked.code : this.props.status.active.code,
  };

  // static getDerivedStateFromProps(props, state) {
  //   eventBus.emit(
  //     LIFECYCLE_EVENT,
  //     `${LOG_MODE.DEBUG}: getDerivedStateFromProps from Subscriber id=${props.data.id} component`
  //   );
  //   return {
  //     status: 0 > props.data.balance ? props.status.blocked.code : props.status.active.code, // 1-active, 2-blocked
  //     underFocus: !state.underFocus && props.data.id === props.selectedSubscriber, // current customer have just got selection
  //     offFocus: state.underFocus && props.selectedSubscriber !== state.id, // current customer have just lost selection
  //   };
  // }

  // shouldComponentUpdate(nextProps, nextState) {
  //   let gotFocus = !this.state.underFocus && nextProps.data.id === nextProps.selectedSubscriber;
  //   let lostFocus = this.state.underFocus && nextProps.data.id !== props.selectedSubscriber;
  //   return gotFocus || lostFocus;
  // }

  clicked = () => {
    eventBus.emit(ITEM_CLICKED, this.props.data.id);
  };

  getStatusNameByCode = (statusCode) =>
    statusCode === this.props.status.blocked.code ? this.props.status.blocked.name : this.props.status.active.name;

  render() {
    eventBus.emit(RENDER_EVENT, `${this.constructor.name} id=${this.props.data.id} component RENDER`);
    return (
      (this.props.currentFilter === 0 || this.props.currentFilter === this.state.status) && (
        <div
          className={this.props.selectedSubscriber === this.props.data.id ? 'IShopItem selected' : 'IShopItem'}
          role="row"
          onClick={this.clicked}
        >
          <div className="cell first left-align" role="cell">
            {this.props.isEditMode && (
              <input
                className="userDataInput"
                size={this.state.lastName.toString().length || 3} // 3 - default input width for empty content
                defaultValue={this.state.lastName}
              />
            )}
            {!this.props.isEditMode && (
              <Fragment>
                {this.state.lastName}
                <span className="customerId">ID: {this.state.id}</span>
              </Fragment>
            )}
          </div>
          <div className="cell left-align" role="cell">
            {this.props.isEditMode && (
              <input
                className="userDataInput"
                size={this.state.lastName.toString().length || 3} // 3 - default input width for empty content
                defaultValue={this.state.firstName}
              />
            )}
            {!this.props.isEditMode && this.state.firstName}
          </div>
          <div className="cell left-align" role="cell">
            {this.props.isEditMode && (
              <input
                className="userDataInput"
                size={this.state.lastName.toString().length || 3} // 3 - default input width for empty content
                defaultValue={this.state.surName}
              />
            )}
            {!this.props.isEditMode && this.state.surName}
          </div>
          <div className="cell" role="cell">
            {this.props.isEditMode && (
              <input
                className="userDataInput"
                size={this.state.lastName.toString().length || 3} // 3 - default input width for empty content
                defaultValue={this.state.balance}
              />
            )}
            {!this.props.isEditMode && this.state.balance}
          </div>
          <div className="cell" role="cell">
            {this.getStatusNameByCode(this.state.status)}
          </div>
          <div className="cell" role="cell">
            <button className="actionBtn">{this.props.btn.edit}</button>
          </div>
          <div className="cell" role="cell">
            <button className="actionBtn">{this.props.btn.delete}</button>
          </div>
        </div>
      )
    );
  }
}
