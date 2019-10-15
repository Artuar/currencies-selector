import { Store, createStore, applyMiddleware, Middleware } from "redux";
import { composeWithDevTools } from "redux-devtools-extension";
import { rootReducer } from "app/store/rootReducer";
import { RootState } from "app/store/rootState";

export const logger: Middleware = () => next => action => {
  if (process.env.NODE_ENV !== "production") {
    console.log(action);
  }
  return next(action);
};

export function configureStore(initialState?: RootState): Store<RootState> {
  let middleware = applyMiddleware(logger);

  if (process.env.NODE_ENV !== "production") {
    middleware = composeWithDevTools(middleware);
  }

  const store: Store<RootState> = createStore(
    rootReducer,
    initialState,
    middleware
  );

  if (module.hot) {
    module.hot.accept("app/store/rootReducer", () => {
      const nextReducer = require("app/store/rootReducer");
      store.replaceReducer(nextReducer);
    });
  }

  return store;
}
