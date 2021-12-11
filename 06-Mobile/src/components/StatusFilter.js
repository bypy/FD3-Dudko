import React from 'react';
import { PropTypes } from 'prop-types';

import { eventBus } from './eventBus';
import { LIFECYCLE_EVENT, RENDER_EVENT, FILTER_CHANGE } from './eventsAvailable';

export default class StatusFilter extends React.PureComponent {
  static propTypes = {
    currentFilter: PropTypes.string.isRequired,
    btn: PropTypes.shape({}),
  };

  static defaultProps = {
    btn: {
      all: 'Все',
      active: 'Активные',
      blocked: 'Заблокированные',
    },
  };

  filterChanged = (EO) => {
    EO.stopPropagation();
    EO.preventDefault();
    eventBus.emit(FILTER_CHANGE, EO.target.name);
  };

  render() {
    eventBus.emit(RENDER_EVENT, `${this.constructor.name} component RENDER`);
    return (
      <div className="statusFilter">
        <span onClick={this.filterChanged}>
          <button name="0" className={this.props.currentFilter === '0' ? 'active' : null}>
            {this.props.btn.all}
          </button>
          <button name="1" className={this.props.currentFilter === '1' ? 'active' : null}>
            {this.props.btn.active}
          </button>
          <button name="2" className={this.props.currentFilter === '2' ? 'active' : null}>
            {this.props.btn.blocked}
          </button>
        </span>
      </div>
    );
  }
}
