import { RootAction } from "app/store/rootActions";
import { getType } from "typesafe-actions";
import * as actions from "./currencies.actions";
import { CURRENCIES } from "./currencies.constants";

export interface CurrenciesState {
  all: string[];
  chosen: string[];
}

export const currenciesDefaultState: CurrenciesState = {
  all: CURRENCIES,
  chosen: [],
};

export const currenciesReducer = (
  state: CurrenciesState = currenciesDefaultState,
  action: RootAction
) => {
  switch (action.type) {
    case getType(actions.choose): {
      return {
        ...state,
        chosen: [...state.chosen, action.payload]
      };
    }
    case getType(actions.remove): {
      return {
        ...state,
        chosen: [...state.chosen.filter(currency => currency !== action.payload)]
      };
    }
    default:
      return state;
  }
};
