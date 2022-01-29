import React from "react";
import ReactDOM from "react-dom";
import { Provider } from "react-redux";
import { store, persistedStore } from "./redux/store";
import App from "./App";
import { PersistGate } from "redux-persist/integration/react";
import { CircularProgress } from "@mui/material";

ReactDOM.render(
  <Provider store={store}>
    <PersistGate loading={<CircularProgress />} persistor={persistedStore}>
      <App />
    </PersistGate>
  </Provider>,
  document.getElementById("root")
);
