import React, { Component } from "react";
import { NavLink } from "react-router-dom";
import { css } from "astroturf";

const styles = css`
  .header {
    width: 100%;
    max-width: 1280px;
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin-right: auto;
    margin-left: auto;
  }

  .logo {
    font-size: 24px;
    text-transform: uppercase;

    a {
      color: #2f2f2f;
      text-decoration: none;
    }
  }

  .navItem {
    display: inline-block;
    margin-right: 40px;

    &:last-of-type {
      margin-right: 0px;
    }
  }

  .navItemLink {
    color: #2f2f2f;
    text-decoration: none;

    &.active {
      text-decoration: underline;
    }

    &:hover {
      text-decoration: underline;
    }
  }
`;

export default class Header extends Component {
  render() {
    return (
      <header className={styles.header}>
        <div className={styles.logo}>
          <NavLink to="/">Currency Converter</NavLink>
        </div>
        <nav>
          <ul>
            <li className={styles.navItem}>
              <NavLink
                className={styles.navItemLink}
                activeClassName={styles.active}
                to="/"
                exact
              >
                Converter
              </NavLink>
            </li>
            <li className={styles.navItem}>
              <NavLink
                className={styles.navItemLink}
                activeClassName={styles.active}
                to="/currency-list"
              >
                Currency list
              </NavLink>
            </li>
          </ul>
        </nav>
      </header>
    );
  }
}
