import React, { Component } from "react";
import { connect } from "react-redux";
import * as currencyActions from "../../actions/currencyActions";

import { css } from "astroturf";
import StarIcon from "../../assets/icons/star.svg";
import CurrencySelect from "../CurrencySelect/CurrencySelect";

const styles = css`
  @import "../../styles/mixins.scss";
  .exchangeRates {
    display: flex;
    justify-content: space-between;

    @include breakpoint(800px) {
      flex-direction: column;
      align-items: center;
    }
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

    @include breakpoint(800px) {
      width: 100%;
      max-width: 400px;
      margin-bottom: 40px;
    }
  }

  .tableCont {
    width: 60%;

    @include breakpoint(800px) {
      width: 100%;
      max-width: 600px;
    }
  }
  .table {
    width: 100%;
    text-align: left;
    border-collapse: collapse;
    border-spacing: 0;

    .favorite {
      opacity: 0;
      width: 36px;
      border-bottom: none;

      @include breakpoint(800px) {
        opacity: 1;
      }
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
      padding: 9px 10px 5px;
      border-bottom: 1px solid #cecece;

      &:nth-of-type(2n) {
        text-align: right;
      }
    }
  }
`;

class ExchangeRatesList extends Component {
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
    this.props.toggleFavorite(currency);
  };

  render() {
    let currencyOptions;
    let exchangeRatesList;
    let favoriteRates = [];

    if (!this.props.loading || this.props.currencyList.rates) {
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
      <div className={styles.exchangeRates}>
        <div className={styles.baseCurrency}>
          <CurrencySelect
            name="secondSelect"
            id=""
            className={styles.select}
            onChange={this.handleChangeSelect}
            value={this.props.currencyList.base}
          >
            {currencyOptions}
          </CurrencySelect>
        </div>
        <div className={styles.tableCont}>
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
)(ExchangeRatesList);
