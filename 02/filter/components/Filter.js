const Filter = React.createClass({

  displayName: "FilterComponent",

  getDefaultProps() {
    return { isSort: false, filterString: "", resetBtnText: "сброс" };
  },

  getInitialState() {
    return {
      words: this.props.words.filter(w => true), // create shallow copy of a props.word array
      isSort: this.props.isSort,
      filterString: this.props.filterString,
    }
  },

  toggleSort(EO) {
    this.setState({ isSort: EO.target.checked });
  },

  applyFilter(EO) {
    this.setState({ filterString: EO.target.value });
  },

  resetAllFilters(EO) {
    EO.preventDefault();
    this.setState(this.getInitialState());
  },
  
  comparatorFunc(curr, next) {
    if (curr === next) return 0;
    else return (curr.toLowerCase() < next.toLowerCase()) ? -1 : 1;
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
          className: "filter-string", type: "text", value: this.state.filterString,
          onChange: this.applyFilter
        }
      ),
      React.DOM.input(
        {
          className: "reset", type: "button", defaultValue: this.props.resetBtnText,
          onClick: this.resetAllFilters
        }
      ),
      React.DOM.select(
        { className: "display", size: (this.state.words.length).toString(), name: "display" },
        this.getListVdom(),
      )
    )
  }
})