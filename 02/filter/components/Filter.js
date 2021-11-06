const Filter = React.createClass({
  displayName: "FilterComponent",

  getInitialState() {
    return ({
      words: this.props.words.map(
        (word, index) => React.DOM.option({ key: btoa(word), value: index }, word))
    })
  },

  render() {
    return React.DOM.select(
      { className: "Filter", size: (this.state.words.length).toString(), name: "display-area" },
      this.state.words
    )
  }
})