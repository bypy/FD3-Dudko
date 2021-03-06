const IShopItem = React.createClass({

    displayName: "IShopItem",

    getDefaultProps: () => ({
        deleteBtnText: "Удалить",
        confirmDeletePrompt: "Удалить запись \"%\"?"
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
        onRecordDeleteCb: React.PropTypes.func,
        onConfirmCb: React.PropTypes.func,
    },

    changeFocusHandler: function (EO) {
        if (this.props.onFocusChangeCb)
            this.props.onFocusChangeCb(this.props.id);
    },

    deleteRecordHandler: function (EO) {
        EO.stopPropagation(); // do not select record during delete process
        EO.preventDefault();
        const prompt = this.props.confirmDeletePrompt.replace("%", this.props.name);
        if (this.props.onConfirmCb(prompt) && this.props.onRecordDeleteCb) {
            this.props.onRecordDeleteCb(this.props.id);
        }
    },

    render: function () {
        let className = (this.props.id !== this.props.focus)
            ? "IShopItem"
            : "IShopItem selected";
        return React.DOM.div({
                className: className, onClick: this.changeFocusHandler
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