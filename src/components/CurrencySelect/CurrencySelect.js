import React from "react";

import { css } from "astroturf";

const styles = css`
  .select {
    width: 100%;
    padding: 10px;
    background: none;
  }
`;

const CurrencySelect = props => {
  return (
    <select
      name={props.name}
      className={styles.select}
      onChange={props.onChange}
      value={props.value}
    >
      {props.children}
    </select>
  );
};

export default CurrencySelect;
