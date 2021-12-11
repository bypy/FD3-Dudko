import React from 'react';

import { PropTypes } from 'prop-types';

import { eventBus } from './eventBus';
import { LIFECYCLE_EVENT, RENDER_EVENT, ITEM_CLICKED } from './eventsAvailable';

export default class Subscriber extends React.Component {
  static propTypes = {
    data: PropTypes.shape({
      id: PropTypes.number.isRequired,
      lastName: PropTypes.string.isRequired,
      firstName: PropTypes.string.isRequired,
      surName: PropTypes.string.isRequired,
      balance: PropTypes.number.isRequired,
      status: PropTypes.string.isRequired,
    }), // is null in add subscriber mode
    selectedSubscriber: PropTypes.number,
    isEditMode: PropTypes.bool,
    btn: PropTypes.shape({}),
  };

  static defaultProps = {
    isEditMode: false,
    selectedSubscriber: null,
    btn: {
      edit: 'Редактировать',
      delete: 'Удалить',
      add: 'Добавить клиента',
    },
  };

  state = { ...this.props.data, mode: this.props.mode };

  shouldComponentUpdate(nextProps, nextState) {
    let isCurrentSelected = this.props.selectedSubscriber === this.props.data.id;
    let resetSelection = isCurrentSelected && nextProps.selectedSubscriber !== this.props.data.id;
    let setSelection = nextProps.data.id === nextProps.selectedSubscriber;
    return resetSelection || setSelection;
  }

  clicked = () => {
    eventBus.emit(ITEM_CLICKED, this.props.data.id);
  };

  render() {
    eventBus.emit(RENDER_EVENT, `${this.constructor.name} component RENDER`);
    return (
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
          {!this.props.isEditMode && this.state.lastName}
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
          {this.state.status}
        </div>
        <div className="cell" role="cell">
          <button className="actionBtn">{this.props.btn.edit}</button>
        </div>
        <div className="cell" role="cell">
          <button className="actionBtn">{this.props.btn.delete}</button>
        </div>
      </div>
    );
  }
}
