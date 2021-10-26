const IShopComponent = React.createClass({

    displayName: "IShopComponent",


    getHeader: (shopCardProperties) => {
        return React.DOM.tr(null,
            shopCardProperties.map(property => React.DOM.th(null, property))
        );
    },

    getRecords: (shopCardRecords) => {
        return tableRecords = shopCardRecords.map(cardRecord => {
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

    render: () => {

        return React.DOM.table({className: "ishop-table"},
            this.getHeader(this.props.headline),
            this.getRecords(this.props.records)
        )
    }
})

