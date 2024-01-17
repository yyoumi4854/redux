import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import reportWebVitals from "./reportWebVitals";

import { applyMiddleware, createStore } from "redux";
import { Provider } from "react-redux";
import rootReducer from "./modules";
import myLogger from "./middlewares/myLogger";
import logger from "redux-logger";
import { composeWithDevTools } from "redux-devtools-extension";
import * as ReduxThunk from "redux-thunk";
import { BrowserRouter } from "react-router-dom";

// const store = createStore(rootReducer, applyMiddleware(myLogger, logger)); // 여러개의 미들웨어 적용 가능

/*
const store = createStore(
  rootReducer,
  composeWithDevTools(applyMiddleware(logger))
); // myLogger 비활성화(불필요)
 */

/*
const store = createStore(
  rootReducer,
  // logger를 사용하는 경우, logger가 가장 마지막에 와야 된다.
  composeWithDevTools(applyMiddleware(ReduxThunk.thunk, logger))
); // 여러개의 미들웨어 적용 가능

const root = ReactDOM.createRoot(document.getElementById("root"));

root.render(
  <React.StrictMode>
    <BrowserRouter>
      <Provider store={store}>
        <App />
      </Provider>
    </BrowserRouter>
  </React.StrictMode>
);
 */

import { Router } from "react-router-dom";
import { createBrowserHistory } from "history";

// const customHistory = createBrowserHistory();

const store = createStore(
  rootReducer,
  // logger 를 사용하는 경우, logger가 가장 마지막에 와야합니다.
  composeWithDevTools(
    applyMiddleware(
      ReduxThunk.withExtraArgument({ history: customHistory }),
      logger
    )
  )
); // 여러개의 미들웨어를 적용 할 수 있습니다.

const customHistory = createBrowserHistory();

const root = ReactDOM.createRoot(document.getElementById("root"));

ReactDOM.render(
  <Router history={customHistory}>
    <Provider store={store}>
      <App />
    </Provider>
  </Router>,
  document.getElementById("root")
);

reportWebVitals();
