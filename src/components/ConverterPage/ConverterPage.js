import React, { Component } from "react";
import ExchangeConverter from "../ExchangeConverter/ExchangeConverter";

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

export default class ConverterPage extends Component {
  render() {
    return (
      <div className={styles.content}>
        <div className={styles.wrapper}>
          <h1 className={styles.title}>Currency Converter</h1>

          <ExchangeConverter />
        </div>
      </div>
    );
  }
}
