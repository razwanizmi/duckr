import React from "react";
import ReactDOM from "react-dom";
import { createStore, applyMiddleware, compose } from "redux";
import { Provider } from "react-redux";
import thunk from "redux-thunk";
import getRoutes from "./config/routes";
import restricted from "helpers/restricted";
import users from "redux/modules/users";

const store = createStore(
  users,
  compose(
    applyMiddleware(thunk),
    window.devToolsExtension ? window.devToolsExtension() : f => f
  )
);

const checkAuth = component => {
  return restricted(component, store);
};

ReactDOM.render(
  <Provider store={store}>{getRoutes(checkAuth)}</Provider>,
  document.getElementById("app")
);
