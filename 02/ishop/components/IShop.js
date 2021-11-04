const IShop = React.createClass({

    displayName: "IShop",

    getDefaultProps: () => ({
        selectedRecord: null
    }),

    getInitialState: function () {
        return {
            selectedRecord: this.props.selectedRecord,
            activeRecords: this.props.records
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

    getRecords: (shopCardRecords, selectedItem, focusChangeCb, lostFocusCb, recordDeleteCb) => {
        return shopCardRecords.map(cardRecord => React.createElement(IShopItem, {
            key: cardRecord.id,
            id: cardRecord.id,
            name: cardRecord.name,
            price: cardRecord.price,
            currency: cardRecord.currency,
            url: cardRecord.url,
            quantity: cardRecord.quantity,
            details: cardRecord.details,
            focus: selectedItem,
            onFocusChangeCb: focusChangeCb,
            onLostFocusCb: lostFocusCb,
            onRecordDeleteCb: recordDeleteCb,
        }))
    },

    focusChangeCb: function (itemId) {
        this.setState({selectedRecord: itemId});
    },

    lostFocusCb: function (itemId) {
        this.setState((currState, props) => ({
                // if last selected record stays the same after loosing focus then no other record is selected
                selectedRecord: (currState.selectedRecord === itemId) ? null : this.state.selectedRecord
            })
        )
    },

    recordDeleteCb: function (itemId) {
        this.setState((currState, props) => {
            return {
                activeRecords: currState.activeRecords.filter(rec => rec.id !== itemId),
                selectedRecord: null
            };
        });
    },

    render: function () {
        return React.DOM.div({className: "IShop"},
            React.DOM.div({className: "caption"}, this.props.caption),
            this.getHeader(this.props.headline, this.dropFocus),
            this.getRecords(
                this.state.activeRecords, this.state.selectedRecord,
                this.focusChangeCb, this.lostFocusCb, this.recordDeleteCb
            )
        )
    }
})

