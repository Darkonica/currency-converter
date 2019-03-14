import React, { Component } from "react";
import { connect } from "react-redux";
import * as currencyActions from "../../actions/currencyActions";

class CurrencyListPage extends Component {
  componentDidMount() {
    this.props.fetchData();
  }

  render() {
    console.log(this.props.loading);
    return (
      <div>
        <h1>CurrencyListPage</h1>
        {this.props.loading && <p>Loading...</p>}
        {this.props.currencyList && this.props.currencyList.base}
      </div>
    );
  }
}

const mapStateToProps = state => {
  return state.currency;
};

const mapDispatchToProps = dispatch => {
  return {
    fetchData: () => {
      dispatch(currencyActions.fetchData());
    },
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(CurrencyListPage);
