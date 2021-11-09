/* eslint-disable react/no-deprecated */

import React from 'react';
import PropTypes from 'prop-types';

import './IShop.css';

import IShopItem from './IShopItem';
import './IShopItem.css';

const IShop = React.createClass({
  displayName: 'IShop',

  propTypes: {
    caption: PropTypes.string,
    headline: PropTypes.array.isRequired,
    records: PropTypes.arrayOf(
      PropTypes.shape({
        id: PropTypes.number.isRequired,
        name: PropTypes.string.isRequired,
        price: PropTypes.number.isRequired,
        currency: PropTypes.string.isRequired,
        url: PropTypes.string.isRequired,
        quantity: PropTypes.number.isRequired,
        details: PropTypes.string.isRequired,
      })
    ),
  },

  getDefaultProps: () => ({
    selectedRecord: null,
  }),

  getInitialState: function () {
    return {
      caption: this.props.caption || 'Just another IShop',
      selectedRecord: this.props.selectedRecord,
      shopRecords: this.props.records,
    };
  },

  getHeader: (shopCardProperties) => {
    return React.DOM.div(
      { className: 'item-properties' },
      shopCardProperties.map((property, index) => React.DOM.div({ key: index }, property))
    );
  },

  getRecords: function () {
    return this.state.shopRecords.map((cardRecord) =>
      React.createElement(IShopItem, {
        key: cardRecord.id,
        id: cardRecord.id,
        name: cardRecord.name,
        price: cardRecord.price,
        currency: cardRecord.currency,
        url: cardRecord.url,
        quantity: cardRecord.quantity,
        details: cardRecord.details,
        focus: this.state.selectedRecord,
        onFocusChangeCb: this.focusChangeCb,
        onRecordDeleteCb: this.recordDeleteCb,
        onConfirmCb: this.confirmCb,
      })
    );
  },

  focusChangeCb: function (itemId) {
    this.setState({ selectedRecord: itemId });
  },

  recordDeleteCb: function (itemId) {
    this.setState({ shopRecords: this.state.shopRecords.filter((rec) => rec.id !== itemId) });
  },

  confirmCb: function (message) {
    return confirm(message);
  },

  render: function () {
    return React.DOM.div(
      { className: 'IShop' },
      React.DOM.div({ className: 'caption' }, this.props.caption),
      this.getHeader(this.props.headline),
      this.getRecords()
    );
  },
});

export default IShop;
