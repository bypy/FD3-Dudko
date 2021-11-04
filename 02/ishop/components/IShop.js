const IShop = React.createClass({

    displayName: "IShop",

    getDefaultProps: () => ({
        selectedRecord: null
    }),

    getInitialState: function () {
        return {
            selectedRecord: this.props.selectedRecord,
            activeRecords: this.props.records,
            lastSelected: null,
        }
    },

    getHeader: (shopCardProperties, dropFocusCb) => {
        return React.DOM.div({className: "item-properties", onClick: dropFocusCb},
            shopCardProperties.map((property, index) => React.DOM.div(
                {key: index},
                property)
            )
        );
    },

    getRecords: function () {
        return this.state.activeRecords.map(cardRecord => React.createElement(IShopItem, {
            key: cardRecord.id,
            id: cardRecord.id,
            name: cardRecord.name,
            price: cardRecord.price,
            currency: cardRecord.currency,
            url: cardRecord.url,
            quantity: cardRecord.quantity,
            details: cardRecord.details,
            focus: this.state.selectedRecord,
            onFocusChangeCb: this.focusChangeCb,
            onRecordDeleteCb: this.recordDeleteCb,
            onRecordDeleteCancelCb: this.onRecordDeleteCancelCb,
            onConfirmCb: this.confirmCb,
        }))
    },

    focusChangeCb: function (itemId) {
        this.setState({selectedRecord: itemId});
    },

    recordDeleteCb: function (itemId) {
        this.setState({activeRecords: this.state.activeRecords.filter(rec => rec.id !== itemId)});
    },

    confirmCb: function (message) {
        return confirm(message);
    },

    onRecordDeleteCancelCb: function () {
        this.setState({selectedRecord: this.state.lastSelected})
    },

    render: function () {
        return React.DOM.div({className: "IShop"},
            React.DOM.div({className: "caption"}, this.props.caption),
            this.getHeader(this.props.headline),
            this.getRecords()
        )
    }
})

