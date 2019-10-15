import { ActionType } from "typesafe-actions";
import * as currenciesActions from "./currencies/currencies.actions";

export type CurrenciesAction = ActionType<typeof currenciesActions>;

export type RootAction = CurrenciesAction;
