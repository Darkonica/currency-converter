import React, { Component } from "react";
import { connect } from "react-redux";

import { css } from "astroturf";
import * as currencyActions from "../../actions/currencyActions";
import CurrencySelect from "../CurrencySelect/CurrencySelect";

const styles = css`
  @import "../../styles/mixins.scss";

  .converter {
    display: flex;
    justify-content: space-between;

    @include breakpoint(450px) {
      flex-direction: column;
    }
  }

  .block {
    width: 45%;

    @include breakpoint(450px) {
      width: 100%;
      margin-bottom: 50px;

      &:last-of-type {
        margin-bottom: 0px;
      }
    }
  }

  .inputGroup {
    margin-top: 20px;
  }
  .inputTitle {
    display: block;
    font-size: 14px;
    color: #3e3e3e;
    margin-bottom: 5px;
  }
  .input {
    width: 100%;
    padding: 10px;
  }
`;

class ExchangeConverter extends Component {
  constructor(props) {
    super(props);
    this.state = {
      firstField: {
        value: "0",
        currency: this.props.currencyList.base || "USD",
      },
      secondField: {
        value: "0",
        currency: "EUR",
      },
    };
  }

  componentDidMount() {
    if (Object.keys(this.props.currencyList).length === 0) {
      this.props.fetchData("USD");
    }
  }

  inputValidation = data => {
    const result = /^([0]|[0-9]+[\.]?[0-9]{0,4}|)$/.test(data);
    return result;
  };

  inputTranform = data => {
    if (/^([0]+)/.test(data) && !/^([0][\.])/.test(data)) {
      // if number starts from 0 without dot after it, like "000013" or "000.13" — delete unnecessary zeros
      for (let i = 0; i < data.length; i++) {
        if (data[i] !== "0") return data.slice(i);
      }
      return data.length ? data[0] : 0;
    }
    return data.length ? data : 0;
  };

  handlerChangeInput = e => {
    let value = e.target.value;
    const field = e.target.name;

    if (!this.inputValidation(value)) {
      return false;
    }

    value = this.inputTranform(value);

    if (field === "firstField") {
      const currency = this.state.secondField.currency;
      const rate = this.props.currencyList.rates[currency];
      const secondValue = (value * rate).toFixed(4);

      this.setState({
        ...this.state,
        firstField: {
          ...this.state.firstField,
          value,
        },
        secondField: {
          ...this.state.secondField,
          value: secondValue,
        },
      });
    } else {
      const currency = this.state.secondField.currency;
      const rate = this.props.currencyList.rates[currency];
      const secondValue = (value / rate).toFixed(2);

      this.setState({
        ...this.state,
        firstField: {
          ...this.state.firstField,
          value: secondValue,
        },
        secondField: {
          ...this.state.secondField,
          value,
        },
      });
    }
  };

  handleChangeSelect = e => {
    const currency = e.target.value;
    const select = e.target.name;

    if (select === "firstSelect") {
      this.props.fetchData(currency).then(() => {
        const secondCurrency = this.state.secondField.currency;
        const rate =
          secondCurrency !== currency
            ? this.props.currencyList.rates[secondCurrency]
            : 1;

        const secondValue = this.state.firstField.value
          ? (this.state.firstField.value * rate).toFixed(2)
          : "";

        this.setState({
          ...this.state,
          firstField: {
            ...this.state.firstField,
            currency,
          },
          secondField: {
            ...this.state.secondField,
            value: secondValue,
          },
        });
      });
    } else {
      const value = this.state.firstField.value;
      const rate = this.props.currencyList.rates[currency];
      const newValue = (value * rate).toFixed(4);

      this.setState({
        ...this.state,
        secondField: {
          ...this.state.secondField,
          currency,
          value: newValue,
        },
      });
    }
  };

  render() {
    let currencyOptions;
    if (!this.props.loading || this.props.currencyList.rates) {
      currencyOptions = Object.keys(this.props.currencyList.rates)
        .sort()
        .map(item => (
          <option value={item} key={item}>
            {item}
          </option>
        ));
    }

    return (
      <div className={styles.converter}>
        <div className={styles.block}>
          <CurrencySelect
            labelText="Choose currency"
            name="firstSelect"
            className={styles.select}
            onChange={this.handleChangeSelect}
            value={this.state.firstField.currency}
          >
            {currencyOptions}
          </CurrencySelect>

          <div className={styles.inputGroup}>
            <label className={styles.inputTitle} htmlFor="firstField">
              Amount:
            </label>
            <input
              type="text"
              id="firstField"
              name="firstField"
              className={styles.input}
              onChange={this.handlerChangeInput}
              value={this.state.firstField.value}
            />
          </div>
        </div>

        <div className={styles.block}>
          <CurrencySelect
            labelText="Choose currency"
            name="secondSelect"
            className={styles.select}
            onChange={this.handleChangeSelect}
            value={this.state.secondField.currency}
          >
            {currencyOptions}
          </CurrencySelect>

          <div className={styles.inputGroup}>
            <label className={styles.inputTitle} htmlFor="secondField">
              Amount:
            </label>
            <input
              type="text"
              id="secondField"
              name="secondField"
              className={styles.input}
              onChange={this.handlerChangeInput}
              value={this.state.secondField.value}
            />
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
)(ExchangeConverter);
