import * as React from "react";
import * as styles from "./CurrenciesList.css";
import classNames from "classnames";
import {
  allCurrenciesSelector,
  chosenCurrenciesSelector
} from "../../store/currencies/currencies.selector";
import * as currenciesActions from "../../store/currencies/currencies.actions";
import { useSelector, useDispatch } from "react-redux";

const useStateSelectors = () => ({
  allCurrencies: useSelector(allCurrenciesSelector),
  chhosenCurrencies: useSelector(chosenCurrenciesSelector)
});

const useDispatchActions = () => {
  const dispatch = useDispatch();
  return {
    choose: (currency: string) => dispatch(currenciesActions.choose(currency)),
    remove: (currency: string) => dispatch(currenciesActions.remove(currency))
  };
};

export const CurrenciesList: React.FunctionComponent = () => {
  const { allCurrencies, chhosenCurrencies } = useStateSelectors();
  const { choose, remove } = useDispatchActions();

  const handleCkick = (currency: string, chosen: boolean) =>
    chosen ? remove(currency) : choose(currency);

  return (
    <article id="currencies-list" className={styles.allCurrencies}>
      {allCurrencies.map(currency => {
        const chosen = chhosenCurrencies.indexOf(currency) !== -1;
        return (
          <button
            key={`choose-${currency}`}
            id={`choose-${currency}`}
            onClick={() => handleCkick(currency, chosen)}
            className={classNames(styles.chooseCurrency, {
              [styles.chosen]: chosen
            })}
          >
            <div className={styles.indicator}>X</div>
            <span className={styles.name}>{currency}</span>
          </button>
        );
      })}
    </article>
  );
};
