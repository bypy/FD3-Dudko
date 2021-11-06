const Filter = React.createClass({
  displayName: "FilterComponent",

  getInitialState() {
    return {
      words: this.props.words.filter(w => true), // create shallow copy of props.word array
      isSort: this.props.isSort || false,
      filterString: this.props.filterString || "",
    }
  },

  comparatorFunc(curr, next) {
    if (curr === next) return 0;
    else return (curr.toLowerCase() < next.toLowerCase()) ? -1 : 1;
  },
  
  toggleSort(EO) {
    this.setState({ isSort: EO.target.checked });
  },

  applyFilter(EO) {
    this.setState({ filterString: EO.target.value });
  },

  getListVdom() {
    let list = this.state.isSort ? this.state.words.sort(this.comparatorFunc) : this.props.words;
    const filterString = this.state.filterString.trim();
    if (filterString.length > 0) {
      list = list.filter(w => w.indexOf(this.state.filterString) !== -1);
    }
    return list.map((word, index) => React.DOM.option({ key: word, value: index }, word));
  },

  render() {
    return React.DOM.div({ className: "Filter" },
      React.DOM.input(
        {
          className: "sort", type: "checkbox", checked: this.state.isSort,
          onChange: this.toggleSort
        }
      ),
      React.DOM.input(
        {
          className: "filter", type: "text", value: this.state.filterString,
          onChange: this.applyFilter
        }
      ),
      React.DOM.select(
        { className: "display", size: (this.state.words.length).toString(), name: "display" },
        this.getListVdom(),
      )
    )
  }
})