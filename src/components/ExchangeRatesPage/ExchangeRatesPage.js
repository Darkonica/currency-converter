import React, { Component } from "react";
import { connect } from "react-redux";

import { css } from "astroturf";

import * as currencyActions from "../../actions/currencyActions";

const styles = css`
  .content {
    margin-top: 10vh;
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

class ExchangeRatesPage extends Component {
  componentDidMount() {
    if (Object.keys(this.props.currencyList).length === 0) {
      this.props.fetchData("USD");
    }
  }

  render() {
    let exchangeRatesList;
    if (this.props.currencyList && !this.props.loading) {
      exchangeRatesList = Object.entries(this.props.currencyList.rates).map(
        rate => {
          return (
            <tr key={rate[0]}>
              <td>{rate[0]}</td>
              <td>{rate[1]}</td>
            </tr>
          );
        }
      );
    }

    return (
      <div className={styles.content}>
        <div className={styles.wrapper}>
          <h1 className={styles.title}>Exchange Rates</h1>
          <table>
            <tbody>
              <tr>
                <th>{this.props.currencyList.base}</th>
                <th>1 {this.props.currencyList.base}</th>
              </tr>
              {exchangeRatesList}
            </tbody>
          </table>
        </div>
      </div>
    );
  }
}

const mapStateToProps = state => {
  return state.currency;
};

const mapDispatchToProps = dispatch => {
  return {
    fetchData: base => {
      return dispatch(currencyActions.fetchData(base));
    },
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(ExchangeRatesPage);
