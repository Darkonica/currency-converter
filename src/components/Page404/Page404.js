import React, { Component } from "react";
import { NavLink } from "react-router-dom";

export default class Page404 extends Component {
  render() {
    return (
      <div>
        <h1>404</h1>
        <p>Sorry, page doesn't exist</p>
        <NavLink to="/">back to home page</NavLink>
      </div>
    );
  }
}
