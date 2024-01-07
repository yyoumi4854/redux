import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import reportWebVitals from "./reportWebVitals";

/* 예제 1 */
// import "./execise";

/* 예제 2 */
import { createStore } from "redux";
import { Provider } from "react-redux";
import rootReducer from "./modules";

/* 리덕스 개발자도구 적용 */
import { composeWithDevTools } from "redux-devtools-extension"; // 리덕스 개발자도구

// 예제2. 스토어 만들기
const store = createStore(rootReducer, composeWithDevTools()); // 스토어를 만듦
// composeWithDevTools를 사용하여 리덕스 개발자 도구 활성화

const root = ReactDOM.createRoot(document.getElementById("root"));

// Provider로 store를 넣어서 App을 감싸게 되면 렌더링하는 그 어떤 컴포넌트던지 리덕스 스토어에 접근 가능
root.render(
  <React.StrictMode>
    <Provider store={store}>
      <App />
    </Provider>
  </React.StrictMode>
);

reportWebVitals();
