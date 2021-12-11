import React from 'react';
import { Fragment } from 'react';
import { PropTypes } from 'prop-types';

import Subscriber from './Subscriber';

import './IShop.scss';
import './IShopItem.scss';

export default class MobileCompany extends React.Component {
  static propTypes = {
    subscribers: PropTypes.arrayOf(
      PropTypes.shape({
        lastName: PropTypes.string.isRequired,
        firstName: PropTypes.string.isRequired,
        surName: PropTypes.string.isRequired,
        balance: PropTypes.number.isRequired,
        status: PropTypes.string.isRequired,
      }).isRequired
    ).isRequired,
    loggerMode: PropTypes.string,
    classname: PropTypes.string,
  };

  static defaultProps = {
    btn: {
      company1: 'A1',
      company2: 'MTS',
      all: 'Все',
      active: 'Активные',
      blocked: 'Заблокированные',
      edit: 'Редактировать',
      delete: 'Удалить',
      add: 'Добавить клиента',
    },
    // header: ['Фамилия', 'Имя', 'Отчество', 'Баланс', 'Статус', 'Редактировать', 'Удалить'],
    header: Array.prototype.map.call(
      ['Фамилия', 'Имя', 'Отчество', 'Баланс', 'Статус', 'Редактировать', 'Удалить'],
      (property, index) => (
        <div key={index} className={index === 0 ? 'cell first' : 'cell'} role="columnheader">
          {property}
        </div>
      )
    ),
    loggerMode: 'info',
    classname: 'IShop',
  };

  state = {
    subscribers: this.props.subscribers.map((subscriber) => <Subscriber key={subscriber.id} data={subscriber} />),
  };

  componentWillMount() {

  }

  render() {
    return (
      <Fragment>
        <div className={this.props.classname} role="table">
          <div className="headerWrapper">
            <div className="iShopHeader" role="row">
              {this.props.header}
            </div>
          </div>
          {this.state.subscribers}
        </div>
      </Fragment>
    );
  }
}
