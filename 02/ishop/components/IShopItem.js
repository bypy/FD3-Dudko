const IShopItem = React.createClass({
    displayName: "IShopItem",

    propTypes: {
        name: React.PropTypes.string.isRequired,
        price: React.PropTypes.number.isRequired,
        currency: React.PropTypes.string.isRequired,
        url: React.PropTypes.string.isRequired,
        quantity: React.PropTypes.number.isRequired,
        details: React.PropTypes.string.isRequired,
    },

    render: function () {
        return React.DOM.div({className: "IShopItem"},
            React.DOM.div(null, this.props.name),
            React.DOM.div(null, this.props.price),
            React.DOM.div(null, this.props.currency),
            React.DOM.div(null, this.props.url),
            React.DOM.div(null, this.props.quantity),
            React.DOM.div(null, this.props.details),
        )
    }
});