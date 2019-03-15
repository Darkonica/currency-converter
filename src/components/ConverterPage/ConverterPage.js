import React, { Component } from "react";
import { connect } from "react-redux";

import * as currencyActions from "../../actions/currencyActions";

class ConverterPage extends Component {
  constructor(props) {
    super(props);
    this.state = {
      firstField: {
        amount: "",
        currency: "USD",
      },
      secondField: {
        amount: "",
        currency: "EUR",
      },
    };
  }

  componentDidMount() {
    this.props.fetchData("USD");
  }

  handlerChangeInput = e => {
    const value = e.target.value;
    const field = e.target.name;

    if (field === "firstField") {
      const currency = this.state.secondField.currency;
      const rate = this.props.currencyList.rates[currency];
      const secondValue = value * rate;

      this.setState({
        ...this.state,
        firstField: {
          ...this.state.firstField,
          amount: value,
        },
        secondField: {
          ...this.state.secondField,
          amount: secondValue,
        },
      });
      // redux change base currency here
    } else {
      console.log("second");
      const currency = this.state.firstField.currency;
      const rate = this.props.currencyList.rates[currency];
      const secondValue = value / rate;

      this.setState({
        ...this.state,
        firstField: {
          ...this.state.firstField,
          amount: secondValue,
        },
        secondField: {
          ...this.state.secondField,
          amount: value,
        },
      });
    }
  };

  handleChangeSelect = e => {
    const currency = e.target.value;
    const select = e.target.name;

    if (select === "firstSelect") {
      const secondValue =
        this.state.firstField.amount * this.props.currencyList.rates[currency];

      this.setState({
        ...this.state,
        firstField: {
          ...this.state.firstField,
          currency,
        },
        secondField: {
          ...this.state.secondField,
          amount: secondValue,
        },
      });
    } else {
      this.setState({
        ...this.state,
        secondField: {
          ...this.state.secondField,
          currency,
        },
      });
    }
  };

  render() {
    return (
      <div>
        <h1>Converter page</h1>

        <div className="converter">
          <select name="firstSelect" id="" onChange={this.handleChangeSelect}>
            <option value="USD">USD</option>
            <option value="EUR">EURO</option>
            <option value="RUB">ROUBLE</option>
          </select>
          <input
            type="text"
            name="firstField"
            onChange={this.handlerChangeInput}
            value={this.state.firstField.amount}
          />

          <select name="secondSelect" id="" onChange={this.handleChangeSelect}>
            <option value="EUR">EURO</option>
            <option value="USD">USD</option>
            <option value="RUB">ROUBLE</option>
          </select>
          <input
            type="text"
            name="secondField"
            onChange={this.handlerChangeInput}
            value={this.state.secondField.amount}
          />
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
      dispatch(currencyActions.fetchData(base));
    },
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(ConverterPage);
