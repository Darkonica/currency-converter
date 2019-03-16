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

  .converter {
    display: flex;
    justify-content: space-between;
  }

  .block {
    width: 45%;
  }
  .select {
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
`;

class ConverterPage extends Component {
  constructor(props) {
    super(props);
    this.state = {
      firstField: {
        value: "",
        currency: "USD",
      },
      secondField: {
        value: "",
        currency: "EUR",
      },
    };
  }

  componentDidMount() {
    if (Object.keys(this.props.currencyList).length === 0) {
      this.props.fetchData("USD");
    }
  }

  handlerChangeInput = e => {
    const value = e.target.value;
    const field = e.target.name;

    if (field === "firstField") {
      const currency = this.state.secondField.currency;
      const rate = this.props.currencyList.rates[currency];
      const secondValue = (value * rate).toFixed(2);

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
      console.log("second");
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

        console.log(rate);
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
      const newValue = (value * rate).toFixed(2);

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
    if (!this.props.loading) {
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
          <h1 className={styles.title}>Currency Converter</h1>
          <div className={styles.converter}>
            <div className={styles.block}>
              <select
                name="firstSelect"
                id=""
                className={styles.select}
                onChange={this.handleChangeSelect}
                value={this.state.firstField.currency}
              >
                {currencyOptions}
              </select>

              <div className={styles.inputGroup}>
                <div className={styles.inputTitle}>Amount:</div>
                <input
                  type="text"
                  name="firstField"
                  className={styles.input}
                  onChange={this.handlerChangeInput}
                  value={this.state.firstField.value}
                />
              </div>
            </div>

            <div className={styles.block}>
              <select
                name="secondSelect"
                id=""
                className={styles.select}
                onChange={this.handleChangeSelect}
                value={this.state.secondField.currency}
              >
                {currencyOptions}
              </select>

              <div className={styles.inputGroup}>
                <div className={styles.inputTitle}>Amount:</div>
                <input
                  type="text"
                  name="secondField"
                  className={styles.input}
                  onChange={this.handlerChangeInput}
                  value={this.state.secondField.value}
                />
              </div>
            </div>
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
)(ConverterPage);
