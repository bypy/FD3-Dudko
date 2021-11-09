/* eslint-disable react/no-deprecated */

import React from 'react';
import PropTypes from 'prop-types';

const IShopItem = React.createClass({
  displayName: 'IShopItem',

  getDefaultProps: () => ({
    deleteBtnText: 'Удалить',
    confirmDeletePrompt: 'Удалить запись "%"?',
  }),

  propTypes: {
    id: PropTypes.number.isRequired,
    name: PropTypes.string.isRequired,
    price: PropTypes.number.isRequired,
    currency: PropTypes.string.isRequired,
    url: PropTypes.string.isRequired,
    quantity: PropTypes.number.isRequired,
    details: PropTypes.string.isRequired,
    focus: PropTypes.number,
    onFocusChangeCb: PropTypes.func,
    onRecordDeleteCb: PropTypes.func,
    onConfirmCb: PropTypes.func,
  },

  changeFocusHandler: function () {
    if (this.props.onFocusChangeCb) this.props.onFocusChangeCb(this.props.id);
  },

  deleteRecordHandler: function (EO) {
    EO.stopPropagation(); // do not select record during delete process
    EO.preventDefault();
    const prompt = this.props.confirmDeletePrompt.replace('%', this.props.name);
    if (this.props.onConfirmCb(prompt) && this.props.onRecordDeleteCb) {
      this.props.onRecordDeleteCb(this.props.id);
    }
  },

  render: function () {
    let className = this.props.id !== this.props.focus ? 'IShopItem' : 'IShopItem selected';
    return React.DOM.div(
      {
        className: className,
        onClick: this.changeFocusHandler,
      },
      React.DOM.div(null, this.props.name),
      React.DOM.div(null, this.props.price),
      React.DOM.div(null, this.props.currency),
      React.DOM.div(null, this.props.url),
      React.DOM.div(null, this.props.quantity),
      React.DOM.div(null, this.props.details),
      React.DOM.div(
        null,
        React.DOM.input({ type: 'button', value: this.props.deleteBtnText, onClick: this.deleteRecordHandler })
      )
    );
  },
});

export default IShopItem;
