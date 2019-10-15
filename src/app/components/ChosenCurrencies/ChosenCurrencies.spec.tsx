import * as React from "react";
import { ChosenCurrencies } from "./ChosenCurrencies";
import { Provider } from "react-redux";
import { shallow, ReactWrapper, mount } from "enzyme";
import configureMockStore from "redux-mock-store";
import { CURRENCIES } from "../../store/currencies/currencies.constants";
import { CurrenciesState, currenciesDefaultState } from "../../store/currencies/currencies.reducer";
import * as currenciesActions from "../../store/currencies/currencies.actions";
import * as ReactReduxHooks from "react-redux";

describe("CurrencyList", () => {
  const mockStore = configureMockStore();
  let store = mockStore();
  let component: ReactWrapper;

  const mountComponent = (initialState: Partial<CurrenciesState> = {}) => {
    store = mockStore({ currencies: { ...currenciesDefaultState, ...initialState } });

    jest
      .spyOn(ReactReduxHooks, "useDispatch")
      .mockImplementation(() => store.dispatch);

    component = mount(
      <Provider store={store}>
        <ChosenCurrencies />
      </Provider>
    );
  };

  afterEach(() => {
    component && component.unmount();
  });

  it("should render ChosenCurrencies without throwing an error", () => {
    shallow(
      <Provider store={store}>
        <ChosenCurrencies />
      </Provider>
    );
  });

  it("should call remove chosen currency form list", () => {
    const currency = CURRENCIES[0];
    mountComponent({ chosen: [currency] });
    component.find(`#chosen-${currency} button`).simulate("click");
    expect(store.getActions()).toEqual([currenciesActions.remove(currency)]);
  });

  it("should mount buttons for choosing currencies", () => {
    mountComponent({ chosen: [CURRENCIES[0], CURRENCIES[1]] });
    expect(component.find("#chosen-list button")).toHaveLength(2);
  });

});
