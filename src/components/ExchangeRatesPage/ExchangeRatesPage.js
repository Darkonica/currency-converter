import React, { Component } from "react";
import { connect } from "react-redux";

import { css } from "astroturf";

import * as currencyActions from "../../actions/currencyActions";

import StarIcon from "../../assets/icons/star.svg";

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

    .favorite {
      opacity: 0;
      width: 30px;
      border-bottom: none;
    }
    .favoriteButton {
      width: 16px;
      height: 16px;
      padding: 0;
      background: none;
      border: none;
      cursor: pointer;

      svg {
        width: 16px;
        height: 16px;
        fill: #fff;
        stroke: #000;
      }
    }
    .favoriteRate {
      font-weight: 600;

      & > .favorite {
        opacity: 1;
      }
      .favoriteButton {
        svg {
          fill: #000;
        }
      }
    }

    tbody tr {
      &:hover .favorite {
        opacity: 1;
      }
    }

    th {
      padding: 5px 10px;
      border-bottom: 1px solid #cecece;

      &:nth-of-type(2n) {
        text-align: right;
      }
    }

    td {
      font-size: 14px;
      color: #4e4e4e;
      padding: 5px 10px;
      border-bottom: 1px solid #cecece;

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
    this.props.fetchData(currency);
  };

  handleFavoriteCurrency = e => {
    const currency = e.target.closest("tr").dataset.currency;
    console.log("favorite: " + currency);
    this.props.toggleFavorite(currency);
  };

  render() {
    let currencyOptions;
    let exchangeRatesList;
    let favoriteRates = [];

    if (this.props.currencyList && !this.props.loading) {
      favoriteRates = Object.entries(this.props.currencyList.rates)
        .filter(rate => this.props.favorites.includes(rate[0]))
        .sort()
        .map(rate => {
          // We don't need a base rate in a list
          if (rate[0] === this.props.currencyList.base) return null;
          return (
            <tr
              key={rate[0]}
              data-currency={rate[0]}
              className={styles.favoriteRate}
            >
              <td>{rate[0]}</td>
              <td>{rate[1]}</td>
              <td className={styles.favorite}>
                <button
                  className={styles.favoriteButton}
                  onClick={this.handleFavoriteCurrency}
                >
                  <StarIcon className={styles.favoriteIcon} />
                </button>
              </td>
            </tr>
          );
        });

      exchangeRatesList = Object.entries(this.props.currencyList.rates)
        .filter(rate => !this.props.favorites.includes(rate[0]))
        .sort()

        .map(rate => {
          // We don't need a base rate in a list
          if (rate[0] === this.props.currencyList.base) return null;
          return (
            <tr key={rate[0]} data-currency={rate[0]}>
              <td>{rate[0]}</td>
              <td>{rate[1]}</td>
              <td className={styles.favorite}>
                <button
                  className={styles.favoriteButton}
                  onClick={this.handleFavoriteCurrency}
                >
                  <StarIcon />
                </button>
              </td>
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

              {/* <div className={styles.inputGroup}>
                <div className={styles.inputTitle}>Amount:</div>
                <input
                  type="text"
                  name="secondField"
                  className={styles.input}
                  // onChange={this.handlerChangeInput}
                  // value={this.state.secondField.value}
                />
              </div> */}
            </div>
            <table className={styles.table}>
              <thead>
                <tr>
                  <th>{this.props.currencyList.base}</th>
                  <th>1 {this.props.currencyList.base}</th>
                </tr>
              </thead>
              <tbody>
                {favoriteRates}
                {exchangeRatesList}
              </tbody>
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
    toggleFavorite: currency => {
      return dispatch(currencyActions.toggleFavorite(currency));
    },
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(ExchangeRatesPage);
