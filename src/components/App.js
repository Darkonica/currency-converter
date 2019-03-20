import React, { Component } from "react";
import { BrowserRouter, Route, Switch } from "react-router-dom";

import { css } from "astroturf";

import Header from "./Header/Header";
import ExchangeRatesPage from "./ExchangeRatesPage/ExchangeRatesPage";
import ConverterPage from "./ConverterPage/ConverterPage";
import Page404 from "./Page404/Page404";

const _ = css`
  @import url("https://fonts.googleapis.com/css?family=Roboto");
  @import-normalize;

  body {
    font: 16px "Roboto", sans-serif;
    margin: 0;
    padding: 0;
  }

  * {
    box-sizing: border-box;
  }
`;

export default class App extends Component {
  render() {
    return (
      <BrowserRouter>
        <>
          <Header />
          <Switch>
            <Route path="/" component={ConverterPage} exact />
            <Route path="/exchange-rates" component={ExchangeRatesPage} />
            <Route component={Page404} />
          </Switch>
        </>
      </BrowserRouter>
    );
  }
}
