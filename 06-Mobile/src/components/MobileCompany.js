import React from 'react';
import { Fragment } from 'react';
import { PropTypes } from 'prop-types';

import { eventBus } from './eventBus';
import { LIFECYCLE_EVENT, RENDER_EVENT, FILTER_CHANGE, ITEM_CLICKED } from './eventsAvailable';
import { LOG_MODE } from './logModes';

import StatusFilter from './StatusFilter';
import Subscriber from './Subscriber';

import './MobileCompany.scss';


export default class MobileCompany extends React.PureComponent {
  static propTypes = {
    company: PropTypes.string.isRequired,
    subscribers: PropTypes.arrayOf(
      PropTypes.shape({
        lastName: PropTypes.string.isRequired,
        firstName: PropTypes.string.isRequired,
        surName: PropTypes.string.isRequired,
        balance: PropTypes.number.isRequired,
      }).isRequired
    ).isRequired,
    loggerMode: PropTypes.string,
    classname: PropTypes.string,
    header: PropTypes.array, // have to declare for PureComponent
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
    loggerMode: 'info',
    classname: 'MobileCompany',
  };

  state = {
    currentFilter: 0, // 0-all, 1-active, 2-blocked
    subscribers: this.props.subscribers,
    selectedSubscriber: null,
    isEditMode: false,
  };

  componentDidMount() {
    eventBus.addListener(FILTER_CHANGE, this.setFilter);
    eventBus.addListener(ITEM_CLICKED, this.setSelected);
  }

  componentWillUnmount() {
    eventBus.removeListener(FILTER_CHANGE);
    eventBus.removeListener(ITEM_CLICKED);
  }

  setFilter = (btnName) => {
    this.setState({ currentFilter: Number(btnName) });
  };

  setSelected = (id) => {
    this.setState({ selectedSubscriber: id });
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
          {this.state.subscribers.map((subscriber) => (
            <Subscriber
              key={subscriber.id}
              data={subscriber}
              selectedSubscriber={this.state.selectedSubscriber}
              currentFilter={this.state.currentFilter}
              isEditMode={this.state.isEditMode}
            />
          ))}
        </div>
      </Fragment>
    );
  }
}
