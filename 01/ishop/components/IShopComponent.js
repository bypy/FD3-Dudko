const IShopComponent = React.createClass({

    displayName: "IShopComponent",

    getDefaultProps: () => {
        return {title: "Интернет-магазин"}
    },


    getHeader: (shopCardProperties) => {
        return React.DOM.tr(null,
            shopCardProperties.map((property, index) => React.DOM.th(
                {key: index},
                property)
            )
        );
    },

    getRecords: (shopCardRecords) => {
        return shopCardRecords.map(cardRecord => {
            return React.DOM.tr({key: cardRecord.id},
                React.DOM.td(null, cardRecord.name),
                React.DOM.td(null, cardRecord.price),
                React.DOM.td(null, cardRecord.currency),
                React.DOM.td(null, cardRecord.url),
                React.DOM.td(null, cardRecord.quantity),
                React.DOM.td(null, cardRecord.details),
            )
        });
    },

    render: function () {
        return React.DOM.table({className: "ishop"},
            React.DOM.caption(null, this.props.title),
            React.DOM.tbody(null,
                this.getHeader(this.props.headline),
                this.getRecords(this.props.records)
            )
        )
    }
})

