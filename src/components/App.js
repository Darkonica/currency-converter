import React, { Component } from "react";
import { BrowserRouter, Route, Switch } from "react-router-dom";

import Header from "./Header/Header";
import CurrencyListPage from "./CurrencyListPage/CurrencyListPage";
import ConverterPage from "./ConverterPage/ConverterPage";
import Page404 from "./Page404/Page404";

export default class App extends Component {
  render() {
    return (
      <BrowserRouter>
        <>
          <Header />
          <Switch>
            <Route path="/" component={ConverterPage} exact />
            <Route path="/currency-list" component={CurrencyListPage} />
            <Route component={Page404} />
          </Switch>
        </>
      </BrowserRouter>
    );
  }
}
