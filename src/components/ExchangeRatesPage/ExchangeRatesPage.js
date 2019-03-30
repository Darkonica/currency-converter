import React, { Component } from "react";

import ExchangeRatesList from "../ExchangeRatesList/ExchangeRatesList";
import { css } from "astroturf";

const styles = css`
  @import "../../styles/mixins.scss";

  .content {
    margin-top: 60px;
    padding-bottom: 60px;

    @include block-paddings(desktop);

    @include breakpoint(450px) {
      @include block-paddings(mobile);
    }
  }

  .wrapper {
    width: 100%;
    max-width: 800px;
    margin-right: auto;
    margin-left: auto;
  }

  .title {
    margin-bottom: 60px;
    text-align: center;
  }
`;

export default class ExchangeRatesPage extends Component {
  render() {
    return (
      <div className={styles.content}>
        <div className={styles.wrapper}>
          <h1 className={styles.title}>Exchange Rates</h1>

          <ExchangeRatesList />
        </div>
      </div>
    );
  }
}
