import React, { Component } from "react";
import { connect } from "react-redux";

import { css } from "astroturf";

import * as currencyActions from "../../actions/currencyActions";

const styles = css`
  .content {
    margin-top: 60px;
    padding-bottom: 60px;
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

  .exchangeRates {
    display: flex;
    justify-content: space-between;
  }
  .inputGroup {
    margin-top: 20px;
  }
  .inputTitle {
    margin-bottom: 5px;
  }
  .input {
    width: 100%;
    padding: 10px;
  }

  .baseCurrency {
    width: 30%;
  }

  .table {
    width: 60%;
    text-align: left;
    border-collapse: collapse;
    border-spacing: 0;

    th {
      padding: 5px 10px;
      &:nth-of-type(2n) {
        text-align: right;
      }
    }

    tr {
      border-bottom: 1px solid #cecece;
    }

    td {
      font-size: 14px;
      color: #4e4e4e;
      padding: 5px 10px;

      &:nth-of-type(2n) {
        text-align: right;
      }
    }
  }
`;

class ExchangeRatesPage extends Component {
  componentDidMount() {
    if (Object.keys(this.props.currencyList).length === 0) {
      this.props.fetchData("USD");
    }
  }

  handleChangeSelect = e => {
    const currency = e.target.value;
    this.props
      .fetchData(currency)
      .then(() => console.log(this.props.currencyList.base));
  };

  render() {
    let currencyOptions;
    let exchangeRatesList;

    if (this.props.currencyList && !this.props.loading) {
      exchangeRatesList = Object.entries(this.props.currencyList.rates)
        .sort()
        .map(rate => {
          // We don't need a base rate in a list
          if (rate[0] === this.props.currencyList.base) return null;
          return (
            <tr key={rate[0]}>
              <td>{rate[0]}</td>
              <td>{rate[1]}</td>
            </tr>
          );
        });

      currencyOptions = Object.keys(this.props.currencyList.rates)
        .sort()
        .map(item => (
          <option value={item} key={item}>
            {item}
          </option>
        ));
    }

    return (
      <div className={styles.content}>
        <div className={styles.wrapper}>
          <h1 className={styles.title}>Exchange Rates</h1>

          <div className={styles.exchangeRates}>
            <div className={styles.baseCurrency}>
              <select
                name="secondSelect"
                id=""
                className={styles.select}
                onChange={this.handleChangeSelect}
                value={this.props.currencyList.base}
              >
                {currencyOptions}
              </select>

              <div className={styles.inputGroup}>
                <div className={styles.inputTitle}>Amount:</div>
                <input
                  type="text"
                  name="secondField"
                  className={styles.input}
                  // onChange={this.handlerChangeInput}
                  // value={this.state.secondField.value}
                />
              </div>
            </div>
            <table className={styles.table}>
              <thead>
                <tr>
                  <th>{this.props.currencyList.base}</th>
                  <th>1 {this.props.currencyList.base}</th>
                </tr>
              </thead>
              <tbody>{exchangeRatesList}</tbody>
            </table>
          </div>
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
