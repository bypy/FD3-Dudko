import React from 'react';
import { Fragment } from 'react';
import { PropTypes } from 'prop-types';

import { eventBus } from './eventBus';
import {
  LIFECYCLE_EVENT,
  RENDER_EVENT,
  FILTER_CHANGE,
  ITEM_EDIT_COMPLETE,
  ITEM_DELETE,
  ITEM_EDIT,
  ITEM_SAVE,
  SET_FORM_INVALID,
} from './eventsAvailable';

import { newSubscriberTempId, newSubscriberInitBalance } from './utils';

import StatusFilter from './StatusFilter';
import Subscriber from './Subscriber';

import './MobileCompany.scss';

export default class MobileCompany extends React.PureComponent {
  static propTypes = {
    company: PropTypes.string.isRequired,
    subscribers: PropTypes.arrayOf(
      PropTypes.shape({
        id: PropTypes.number.isRequired,
        lastName: PropTypes.string.isRequired,
        firstName: PropTypes.string.isRequired,
        surName: PropTypes.string.isRequired,
        balance: PropTypes.number.isRequired,
      }).isRequired
    ).isRequired,
    classname: PropTypes.string,
    header: PropTypes.array, // have to declare for PureComponent
    addBtnText: PropTypes.string,
    saveBtnText: PropTypes.string,
    cancelBtnText: PropTypes.string,
    validator: PropTypes.func,
  };

  static defaultProps = {
    header: Array.prototype.map.call(
      ['Фамилия*', 'Имя*', 'Отчество', 'Баланс*', 'Статус', 'Редактировать', 'Удалить'],
      (property, index) => (
        <div key={index} className={index === 0 ? 'cell first' : 'cell'}>
          {property}
        </div>
      )
    ),
    classname: 'MobileCompany',
    addBtnText: 'Добавить клиента',
    saveBtnText: 'Сохранить клиента',
    cancelBtnText: 'Отмена',
  };

  state = {
    currentFilter: 0, // 0-all, 1-active, 2-blocked
    subscribers: this.props.subscribers,
    companyInEditMode: false,
  };

  componentDidMount() {
    eventBus.emit(LIFECYCLE_EVENT, `componentDidMount from ${this.constructor.name} component`);
    eventBus.addListener(FILTER_CHANGE, this.setFilter);
    eventBus.addListener(ITEM_EDIT, this.setEditInProgress);
    eventBus.addListener(SET_FORM_INVALID, this.setFormInvalid);
    eventBus.addListener(ITEM_EDIT_COMPLETE, this.updateSubscribersData);
    eventBus.addListener(ITEM_DELETE, this.deleteSubscriber);
  }

  componentWillUnmount() {
    eventBus.emit(LIFECYCLE_EVENT, `componentWillUnmount from ${this.constructor.name} component`);
    eventBus.removeListener(FILTER_CHANGE, this.setFilter);
    eventBus.removeListener(ITEM_EDIT, this.setEditInProgress);
    eventBus.removeListener(SET_FORM_INVALID, this.setFormInvalid);
    eventBus.removeListener(ITEM_EDIT_COMPLETE, this.updateSubscribersData);
    eventBus.removeListener(ITEM_DELETE, this.deleteSubscriber);
  }

  setFilter = (btnName) => {
    this.setState({ currentFilter: Number(btnName) });
  };

  setEditInProgress = () => {
    this.setState({ companyInEditMode: true });
  };

  setFormInvalid = () => {
    this.setState({ invalidForm: true });
  };

  updateSubscribersData = (enteredSubscriberData) => {
    let actualSubscribers = [];
    this.state.subscribers.forEach((stateSubscriber, index) => {
      // state has empty subscriber template
      if (stateSubscriber.id !== enteredSubscriberData.id && stateSubscriber.id !== newSubscriberTempId) {
        actualSubscribers.push(stateSubscriber);
      } else {
        // exclude empty subscriber template and replace with entered subscriber data
        actualSubscribers.push(enteredSubscriberData);
      }
    });
    this.setState({
      subscribers: actualSubscribers,
      companyInEditMode: false,
      invalidForm: false,
      createSubscriberMode: false,
    });
  };

  resetCompanyEditMode = () => {
    if (this.state.createSubscriberMode) {
      this.setState({
        subscribers: this.state.subscribers.filter((s) => s.id !== newSubscriberTempId),
      });
    }
    this.setState({ companyInEditMode: false });
  };

  addSubscriber = () => {
    this.setState({
      subscribers: [...this.state.subscribers, this.newSubscriberTemplate()],
      selectedSubscriber: newSubscriberTempId,
      companyInEditMode: true,
      createSubscriberMode: true,
    });
  };

  deleteSubscriber = (id) => {
    if (id === this.state.selectedSubscriber) this.setState({ selectedSubscriber: null });
    this.setState({
      subscribers: this.state.subscribers.filter((s) => id !== s.id),
    });
  };

  saveChangesRequest = () => {
    eventBus.emit(ITEM_SAVE, [this.state.invalidForm, this.props.validator]);
  };

  render() {
    eventBus.emit(RENDER_EVENT, `${this.constructor.name} component RENDER`);
    return (
      <Fragment>
        <span>{`Компания: ${this.props.company}`}</span>
        <hr />
        <StatusFilter currentFilter={this.state.currentFilter} companyInEditMode={this.state.companyInEditMode} />
        <hr />
        <div className={this.props.classname} role="table">
          <div className="headerWrapper">
            <div className="mCompanyHeader" role="row">
              {this.props.header}
            </div>
          </div>
          {this.state.subscribers
            .filter(
              (subscriber) =>
                this.state.currentFilter === 0 ||
                (this.state.currentFilter === 1 && !(subscriber.balance < 0)) ||
                (this.state.currentFilter === 2 && subscriber.balance < 0)
            )
            .map((subscriber) => (
              <Subscriber key={subscriber.id} data={subscriber} companyInEditMode={this.state.companyInEditMode} />
            ))}
        </div>
        <hr />
        <div className="ctrlButtons">
          <span className="buttons-tab" onClick={this.filterChanged}>
            <button onClick={this.addSubscriber} disabled={this.state.companyInEditMode || this.state.invalidForm}>
              {this.props.addBtnText}
            </button>
            <button onClick={this.saveChangesRequest} disabled={!this.state.companyInEditMode}>
              {this.props.saveBtnText}
            </button>
            <button onClick={this.resetCompanyEditMode} disabled={!this.state.companyInEditMode}>
              {this.props.cancelBtnText}
            </button>
          </span>
        </div>
      </Fragment>
    );
  }

  newSubscriberTemplate = () => {
    return {
      id: newSubscriberTempId,
      lastName: '',
      firstName: '',
      surName: '',
      balance: newSubscriberInitBalance,
    };
  };

  componentWillReceiveProps(nextProps) {
    eventBus.emit(LIFECYCLE_EVENT, `componentWillReceiveProps from ${this.constructor.name} component`);
  }

  componentWillUpdate = () => {
    eventBus.emit(LIFECYCLE_EVENT, `componentWillUpdate from ${this.constructor.name} component`);
  };

  componentDidUpdate = (oldProps, oldState) => {
    eventBus.emit(LIFECYCLE_EVENT, `componentDidUpdate from ${this.constructor.name} component`);
  };

  componentWillMount() {
    eventBus.emit(LIFECYCLE_EVENT, `componentWillMount from ${this.constructor.name} component`);
  }
}
