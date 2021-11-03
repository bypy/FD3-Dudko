const IShopItem = React.createClass({
    displayName: "IShopItem",

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
    },

    changeFocusHandler: function(EO) {
        if (this.props.onFocusChangeCb)
            this.props.onFocusChangeCb(this.props.id);
    },

    render: function () {
        let className = (this.props.id !== this.props.focus)
            ? "IShopItem"
            : "IShopItem selected";
        return React.DOM.div({className: className, onClick: this.changeFocusHandler},
            React.DOM.div(null, this.props.name),
            React.DOM.div(null, this.props.price),
            React.DOM.div(null, this.props.currency),
            React.DOM.div(null, this.props.url),
            React.DOM.div(null, this.props.quantity),
            React.DOM.div(null, this.props.details),
        )
    }
});