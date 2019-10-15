import { createSelector } from "reselect";
import { RootState } from "app/store/rootState";
import { CurrenciesState } from "./currencies.reducer";

const currenciesSelector = (state: RootState): CurrenciesState => state.currencies;

export const allCurrenciesSelector = createSelector(
  currenciesSelector,
  (state: CurrenciesState): string[] => state.all
);

export const chosenCurrenciesSelector = createSelector(
  currenciesSelector,
  (state: CurrenciesState): string[] => state.chosen
);
