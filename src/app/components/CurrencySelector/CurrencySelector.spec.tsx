import * as React from "react";
import { CurrencySelector } from "./CurrencySelector";
import { Provider } from "react-redux";
import { shallow } from "enzyme";
import configureMockStore from "redux-mock-store";

const mockStore = configureMockStore();
const store = mockStore({});

describe("CurrencySelector", () => {
  it("should render CurrencySelector without throwing an error", () => {
    shallow(
      <Provider store={store}>
        <CurrencySelector />
      </Provider>
    );
  });
});
