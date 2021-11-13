import React from 'react';
import PropTypes from 'prop-types';

import './IShopItem.scss';

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
    editBtnText: 'Редактировать',
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
        className={`${className}`}
        onClick={this.changeFocusHandler}
        onKeyDown={this.changeFocusHandler}
        tabIndex={this.props.id}
        role="row"
      >
        <div className="cell first left-align" role="cell">
          {this.props.name}
        </div>
        <div className="cell" role="cell">
          {this.props.price}
        </div>
        <div className="cell" role="cell">
          {this.props.currency}
        </div>
        <div className="cell left-align" role="cell">
          {this.props.url}
        </div>
        <div className="cell" role="cell">
          {this.props.quantity}
        </div>
        <div className="cell" role="cell">
          {this.props.details}
        </div>
        <div className="cell" role="row">
          <div className="actionBtn" role="cell">
            <button type="button" onClick={this.deleteRecordHandler}>{this.props.editBtnText}</button>
          </div>
          <div className="actionBtn" role="cell">
            <button type="button" onClick={this.deleteRecordHandler}>{this.props.deleteBtnText}</button>
          </div>
        </div>
      </div>
    );
  }
}

export default IShopItem;
