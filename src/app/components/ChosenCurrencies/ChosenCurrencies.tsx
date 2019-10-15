import * as React from "react";
import * as styles from "./ChosenCurrencies.css";
import * as currenciesActions from "../../store/currencies/currencies.actions";
import { useSelector, useDispatch } from "react-redux";
import { chosenCurrenciesSelector } from "../../store/currencies/currencies.selector";

const useStateSelectors = () => ({
  chosenCurrencies: useSelector(chosenCurrenciesSelector)
});

const useDispatchActions = () => {
  const dispatch = useDispatch();
  return {
    remove: (currency: string) => dispatch(currenciesActions.remove(currency))
  };
};

export const ChosenCurrencies: React.FunctionComponent = () => {
  const { chosenCurrencies } = useStateSelectors();
  const { remove } = useDispatchActions();

  return (
    <section id="chosen-list" className={styles.chosenCurrencies}>
      {chosenCurrencies.map(currency => (
        <div
          id={`chosen-${currency}`}
          key={`chosen-${currency}`}
          className={styles.chosenCurrency}
        >
          <span>{currency}</span>
          <button className={styles.remove} onClick={() => remove(currency)}>
            x
          </button>
        </div>
      ))}
    </section>
  );
};
