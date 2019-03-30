import React, { Component } from "react";
import { NavLink } from "react-router-dom";
import { css } from "astroturf";

const styles = css`
  @import "../../styles/mixins.scss";

  .header {
    width: 100%;
    padding-top: 15px;
    padding-bottom: 15px;
    background-color: #37517e;
  }

  .wrapper {
    max-width: 1280px;
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin-right: auto;
    margin-left: auto;

    @include block-paddings(desktop);

    @include breakpoint(700px) {
      flex-direction: column;
    }

    @include breakpoint(450px) {
      @include block-paddings(mobile);
    }
  }

  .logo {
    font-size: 22px;
    text-transform: uppercase;
    padding-top: 3px;

    a {
      color: #efefef;
      text-decoration: none;
    }
  }

  .navList {
    padding: 0;
    margin-top: 0px;
    margin-bottom: 0px;

    @include breakpoint(700px) {
      margin-top: 15px;
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
    color: #efefef;
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
        <div className={styles.wrapper}>
          <div className={styles.logo}>
            <NavLink to="/">Currency Converter</NavLink>
          </div>
          <nav>
            <ul className={styles.navList}>
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
                  to="/exchange-rates"
                >
                  Exchange rates
                </NavLink>
              </li>
            </ul>
          </nav>
        </div>
      </header>
    );
  }
}
