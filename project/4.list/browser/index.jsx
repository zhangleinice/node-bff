// const Container = require("../component/container.jsx");
// const React = require("react");
// const ReactDom = require("react-dom");

import React from "react";
import ReactDom from "react-dom";
import Container from "../component/container";

class App extends React.Component {
  constructor() {
    super();
    this.state = {
      column: reactInitData,
      filtType: reactInitFiltType,
      sortType: reactInitSortType,
    };
  }
  render() {
    return (
      <Container
        columns={this.state.columns}
        filt={(filtType) => {
          fetch(`./data?sort=${this.state.sortType}&filt=${filtType}`)
            .then((res) => res.json())
            .then((json) => {
              this.setState({
                columns: json,
                filtType: filtType,
              });
            });
        }}
        sort={(sortType) => {
          fetch(`./data?sort=${sortType}&filt=${this.state.filtType}`)
            .then((res) => res.json())
            .then((json) => {
              this.setState({
                columns: json,
                sortType: sortType,
              });
            });
        }}
      />
    );
  }
}

ReactDom.render(<App />, document.getElementById("reactapp"));
