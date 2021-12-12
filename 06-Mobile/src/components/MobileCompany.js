import React from 'react';
import { Fragment } from 'react';
import { PropTypes } from 'prop-types';

import { eventBus } from './eventBus';
import { LIFECYCLE_EVENT, RENDER_EVENT, FILTER_CHANGE, ITEM_CLICKED, ITEM_DELETE, ITEM_EDIT } from './eventsAvailable';
import { newSubscriberTempId } from './utils';

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
  };

  static defaultProps = {
    header: Array.prototype.map.call(
      ['Фамилия', 'Имя', 'Отчество', 'Баланс', 'Статус', 'Редактировать', 'Удалить'],
      (property, index) => (
        <div key={index} className={index === 0 ? 'cell first' : 'cell'}>
          {property}
        </div>
      )
    ),
    classname: 'MobileCompany',
    addBtnText: 'Добавить клиента',
  };

  state = {
    currentFilter: 0, // 0-all, 1-active, 2-blocked
    subscribers: this.props.subscribers,
    selectedSubscriber: null,
    editedSubscriber: null,
  };

  componentDidMount() {
    eventBus.emit(LIFECYCLE_EVENT, `componentDidMount from ${this.constructor.name} component`);
    eventBus.addListener(FILTER_CHANGE, this.setFilter);
    eventBus.addListener(ITEM_CLICKED, this.processClick);
    eventBus.addListener(ITEM_EDIT, this.setEdited);
    eventBus.addListener(ITEM_DELETE, this.deleteSubscriber);
  }

  componentWillUnmount() {
    eventBus.emit(LIFECYCLE_EVENT, `componentWillUnmount from ${this.constructor.name} component`);
    eventBus.removeListener(FILTER_CHANGE);
    eventBus.removeListener(ITEM_CLICKED);
    eventBus.removeListener(ITEM_DELETE);
  }

  setFilter = (btnName) => {
    this.setState({ currentFilter: Number(btnName) });
  };

  setEdited = (id) => {
    this.setState({ editedSubscriber: id });
  };

  processClick = () => {
    this.setState({ editedSubscriber: null });
  };

  deleteSubscriber = (id) => {
    if (id === this.state.selectedSubscriber) this.setState({ selectedSubscriber: null });
    this.setState({
      subscribers: this.state.subscribers.filter((s) => id !== s.id),
    });
  };

  createNewSubscriber = () => {
    return {
      id: newSubscriberTempId,
      lastName: '',
      firstName: '',
      surName: '',
      balance: 0,
    };
  };

  addSubscriber = () => {
    this.setState({
      subscribers: [...this.state.subscribers, this.createNewSubscriber()],
      selectedSubscriber: newSubscriberTempId,
      addMode: true,
    });
  };

  render() {
    eventBus.emit(RENDER_EVENT, `${this.constructor.name} component RENDER`);
    return (
      <Fragment>
        <span>{`Компания: ${this.props.company}`}</span>
        <hr />
        <StatusFilter currentFilter={this.state.currentFilter} />
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
              <Subscriber key={subscriber.id} data={subscriber} editedSubscriber={this.state.editedSubscriber} />
            ))}
        </div>
        <div className="addClientBtn">
          <button onClick={this.addSubscriber} disabled={this.state.addMode}>
            {this.props.addBtnText}
          </button>
        </div>
      </Fragment>
    );
  }

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
