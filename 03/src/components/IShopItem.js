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
    selectedRecord: PropTypes.number,
    onHasFocusCb: PropTypes.func,
    onRecordDeleteCb: PropTypes.func,
    onRecordEditCb: PropTypes.func,
    onConfirmCb: PropTypes.func,
    editMode: PropTypes.bool,
    createMode: PropTypes.bool,
    freezeMode: PropTypes.bool,
  };

  static defaultProps = {
    editMode: false,
    createMode: false,
    freezeMode: false,
    deleteBtnText: 'Удалить',
    editBtnText: 'Редактировать',
    confirmDeletePrompt: 'Удалить запись "%"?',
  };

  hasFocusHandler = () => {
    if (this.props.freezeMode || this.props.createMode) return;
    if (this.props.onHasFocusCb) this.props.onHasFocusCb(this.props.id);
  };

  deleteRecordHandler = (EO) => {
    if (this.props.editMode || this.props.createMode) return;
    EO.stopPropagation(); // do not select record during delete process
    EO.preventDefault();
    const promptMessage = this.props.confirmDeletePrompt.replace('%', this.props.name);
    if (this.props.onConfirmCb(promptMessage) && this.props.onRecordDeleteCb) {
      this.props.onRecordDeleteCb(this.props.id);
    }
  };

  editRecordHandler = (EO) => {
    if (this.props.freezeMode || this.props.createMode) return;
    EO.stopPropagation(); // we do not want to onFocus event to be fired
    EO.preventDefault();
    if (this.props.onRecordEditCb) this.props.onRecordEditCb(this.props.id);
  };

  render() {
    const className = this.props.id !== this.props.selectedRecord ? 'IShopItem' : 'IShopItem selected';
    return (
      <div
        className={`${className}`}
        onClick={this.hasFocusHandler}
        onKeyDown={this.hasFocusHandler}
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
        <div className="cell column" role="table">
          <button
            className="actionBtn"
            disabled={this.props.freezeMode || this.props.createMode}
            onClick={this.editRecordHandler}
          >
            {this.props.editBtnText}
          </button>
          <button
            className="actionBtn"
            disabled={this.props.editMode || this.props.createMode}
            onClick={this.deleteRecordHandler}
          >
            {this.props.deleteBtnText}
          </button>
        </div>
      </div>
    );
  }
}

export default IShopItem;
