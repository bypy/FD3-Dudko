const Filter = React.createClass({
  displayName: "FilterComponent",

  getOptions() {
    return this.props.words.map((word, index) => React.DOM.option({ key: btoa(word), value: index }, word));
  },

  render: function () {
    return React.DOM.select(
      { className: "Filter", size: (this.props.words.length).toString(), name: "my-select-component" },
      this.getOptions()
    )
  }
})