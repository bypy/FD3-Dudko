const IShopItem = React.createClass({
    displayName: "IShopItem",

    getDefaultProps: () => ({
        deleteBtnText: "Удалить",
        confirmPrompt: "Удалить запись {%%}?"
    }),

    propTypes: {
        id: React.PropTypes.number.isRequired,
        name: React.PropTypes.string.isRequired,
        price: React.PropTypes.number.isRequired,
        currency: React.PropTypes.string.isRequired,
        url: React.PropTypes.string.isRequired,
        quantity: React.PropTypes.number.isRequired,
        details: React.PropTypes.string.isRequired,
        focus: React.PropTypes.number,
        onFocusChangeCb: React.PropTypes.func,
        onLostFocusCb: React.PropTypes.func,
        onRecordDeleteCb: React.PropTypes.func,
        confirmMethod: React.PropTypes.func,
    },

    changeFocusHandler: function (EO) {
        if (this.props.onFocusChangeCb) this.props.onFocusChangeCb(
            this.props.confirmPrompt.replace("{%%}", this.props.name));
    },

    deleteRecordHandler: function (EO) {
        EO.stopPropagation();
        //this.changeFocusHandler(EO);
        if (this.props.confirmMethod) this.props.confirmMethod(this.props.name)
        if (this.props.onRecordDeleteCb) this.props.onRecordDeleteCb(this.props.id);
    },

    lostFocusHandler: function (EO) {
        if (this.props.onLostFocusCb) this.props.onLostFocusCb(this.props.id);
    },

    render: function () {
        let className = (this.props.id !== this.props.focus)
            ? "IShopItem"
            : "IShopItem selected";
        return React.DOM.div({
                className: className, tabIndex: this.props.id,
                onClick: this.changeFocusHandler, onBlur: this.lostFocusHandler
            },
            React.DOM.div(null, this.props.name),
            React.DOM.div(null, this.props.price),
            React.DOM.div(null, this.props.currency),
            React.DOM.div(null, this.props.url),
            React.DOM.div(null, this.props.quantity),
            React.DOM.div(null, this.props.details),
            React.DOM.div(null,
                React.DOM.input({type: "button", value: this.props.deleteBtnText, onClick: this.deleteRecordHandler})),
        )
    }
});