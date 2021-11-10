import React from 'react';
import PropTypes from 'prop-types';

import './IShopItem.css';

class IShopItem extends React.Component {
  static propTypes = {
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
  };

  static defaultProps = {
    deleteBtnText: 'Удалить',
    confirmDeletePrompt: 'Удалить запись "%"?',
  };

  changeFocusHandler = () => {
    if (this.props.onFocusChangeCb) this.props.onFocusChangeCb(this.props.id);
  };

  deleteRecordHandler = (EO) => {
    EO.stopPropagation(); // do not select record during delete process
    EO.preventDefault();
    const promptMessage = this.props.confirmDeletePrompt.replace('%', this.props.name);
    if (this.props.onConfirmCb(promptMessage) && this.props.onRecordDeleteCb) {
      this.props.onRecordDeleteCb(this.props.id);
    }
  };

  render() {
    const className = this.props.id !== this.props.focus ? 'IShopItem' : 'IShopItem selected';
    return (
      <div
        className={className}
        onClick={this.changeFocusHandler}
        onKeyDown={this.changeFocusHandler}
        // onClick={(e) => this.changeFocusHandler(e)}
        // onKeyDown={(e) => this.changeFocusHandler(e)} // stub
        tabIndex={this.props.id}
        role="row"
      >
        <div>{this.props.name}</div>
        <div>{this.props.price}</div>
        <div>{this.props.currency}</div>
        <div>{this.props.url}</div>
        <div>{this.props.quantity}</div>
        <div>{this.props.details}</div>
        <div>
          <input type="button" value={this.props.deleteBtnText} onClick={(e) => this.deleteRecordHandler(e)} />
        </div>
      </div>
    );
  }
}

export default IShopItem;
