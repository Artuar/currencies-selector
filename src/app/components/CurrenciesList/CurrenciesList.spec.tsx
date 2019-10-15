import * as React from "react";
import { CurrenciesList } from "./CurrenciesList";
import { Provider } from "react-redux";
import { shallow, ReactWrapper, mount } from "enzyme";
import configureMockStore from "redux-mock-store";
import * as currenciesActions from "../../store/currencies/currencies.actions";
import * as ReactReduxHooks from "react-redux";
import {
  CurrenciesState,
  currenciesDefaultState
} from "../../store/currencies/currencies.reducer";
import { CURRENCIES } from "../../store/currencies/currencies.constants";

describe("CurrenciesList", () => {
  const mockStore = configureMockStore();
  let store = mockStore();
  let component: ReactWrapper;

  const mountComponent = (initialState: Partial<CurrenciesState> = {}) => {
    store = mockStore({
      currencies: { ...currenciesDefaultState, ...initialState }
    });

    jest
      .spyOn(ReactReduxHooks, "useDispatch")
      .mockImplementation(() => store.dispatch);

    component = mount(
      <Provider store={store}>
        <CurrenciesList />
      </Provider>
    );
  };

  afterEach(() => {
    component && component.unmount();
  });

  it("should render CurrenciesList without throwing an error", () => {
    shallow(
      <Provider store={store}>
        <CurrenciesList />
      </Provider>
    );
  });

  it("should call remove currency from list", () => {
    const currency = CURRENCIES[0];
    mountComponent({ chosen: [currency] });
    component.find(`#choose-${currency}`).simulate("click");
    expect(store.getActions()).toEqual([currenciesActions.remove(currency)]);
  });

  it("should call choose currency to list", () => {
    const currency = CURRENCIES[0];
    mountComponent();
    component.find(`#choose-${currency}`).simulate("click");
    expect(store.getActions()).toEqual([currenciesActions.choose(currency)]);
  });

  it("should mount buttons for choosing currencies", () => {
    mountComponent();
    expect(component.find("#currencies-list button")).toHaveLength(
      CURRENCIES.length
    );
  });
});
