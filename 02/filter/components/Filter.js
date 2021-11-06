const Filter = React.createClass({
  displayName: "FilterComponent",

  getInitialState: function() {
    return {
      words: this.props.words.map(
        (word, index) => React.DOM.option({ key: btoa(word), value: index }, word)).sort(),
      isSort: this.props.isSort,
    }
  },

  toggleSort: function(EO) {
    console.log(this.state.isSort);
    console.log(EO.target.checked);
    this.setState({ isSort: EO.target.checked });
  },

  render: function() {
    return React.DOM.div({ className: "Filter" },
      React.DOM.input(
        {
          className: "sort", type: "checkbox", checked: this.state.isSort,
          onChange: this.toggleSort
        }
      ),
      React.DOM.select(
        { className: "display", size: (this.state.words.length).toString(), name: "display" },
        // this.state.isSort ? this.state.words.sort() : this.state.words
        this.state.words
      )
    )
  }
})