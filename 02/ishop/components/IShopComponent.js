const IShopComponent = React.createClass({

    displayName: "IShopComponent",

    getDefaultProps: () => {
        return {orientation: "landscape"}
    },


    getHeader: (shopCardProperties) => {
        return React.DOM.div({className: "row-header"},
            shopCardProperties.map((property, index) => React.DOM.div(
                {key: index},
                property)
            )
        );
    },

    getRecords: (shopCardRecords) => {
        return shopCardRecords.map(cardRecord => {
            return React.DOM.div({key: cardRecord.id, className: "row-body"},
                React.DOM.div(null, cardRecord.name),
                React.DOM.div(null, cardRecord.price),
                React.DOM.div(null, cardRecord.currency),
                React.DOM.div(null, cardRecord.url),
                React.DOM.div(null, cardRecord.quantity),
                React.DOM.div(null, cardRecord.details),
            )
        });
    },

    render: function () {
        return React.DOM.div({className: "ishop"},
            React.DOM.div({className: "caption"}, this.props.caption),
            this.getHeader(this.props.headline),
            this.getRecords(this.props.records)
        )
    }
})

