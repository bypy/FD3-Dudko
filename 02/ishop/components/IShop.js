const IShop = React.createClass({

    displayName: "IShop",

    getHeader: (shopCardProperties) => {
        return React.DOM.div({className: "item-properties"},
            shopCardProperties.map((property, index) => React.DOM.div(
                {key: index},
                property)
            )
        );
    },

    getRecords: (shopCardRecords) => {
        return shopCardRecords.map(cardRecord => React.createElement(IShopItem, {
            key: cardRecord.id,
            name: cardRecord.name,
            price: cardRecord.price,
            currency: cardRecord.currency,
            url: cardRecord.url,
            quantity: cardRecord.quantity,
            details: cardRecord.details,
        }))
    },

    render: function () {
        return React.DOM.div({className: "IShop"},
            React.DOM.div({className: "caption"}, this.props.caption),
            this.getHeader(this.props.headline),
            this.getRecords(this.props.records)
        )
    }
})

