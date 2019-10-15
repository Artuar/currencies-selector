import * as React from "react";
import {ChosenCurrencies} from "../ChosenCurrencies/ChosenCurrencies";
import {CurrenciesList} from "../CurrenciesList/CurrenciesList";
import * as styles from "./CurrencySelector.css";

export const CurrencySelector: React.FunctionComponent = () => {
  return (
    <main className={styles.currencySelector}>
      <ChosenCurrencies/>
      <CurrenciesList/>
    </main>
  );
};
