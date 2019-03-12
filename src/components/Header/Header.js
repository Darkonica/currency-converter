import React, { Component } from "react";
import { NavLink } from "react-router-dom";

export default class Header extends Component {
  render() {
    return (
      <header>
        <div className="logo">Currency Converter</div>
        <nav>
          <ul>
            <li>
              <NavLink to="/">Converter</NavLink>
            </li>
            <li>
              <NavLink to="/currency-list">Currency list</NavLink>
            </li>
          </ul>
        </nav>
      </header>
    );
  }
}
