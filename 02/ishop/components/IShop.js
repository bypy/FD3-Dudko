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
            onLostFocusCb: this.lostFocusCb,
            onRecordDeleteCb: this.recordDeleteCb,
            onConfirmCb: this.confirmCb,
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
                // do not loose focus if other than selected record has to be deleted
                selectedRecord: currState.selectedRecord === itemId ? null : currState.selectedRecord
            };
        });
    },

    confirmCb: function(message) {
        return confirm(message);
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

