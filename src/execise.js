import { createStore } from "redux";

// createStore는 스토어를 만들어주는 함수
// 리액트 프로젝트에서는 단 하나의 스토어를 만듦

/* 리덕스에서 관리 할 상태 정의 */
const initialState = {
  counter: 0,
  text: "",
  list: [],
};

/* 액션 타입 정의 */
// 액션 타입은 주로 대문자
const INCREASE = "INCREASE";
const DECREASE = "DECREASE";
const CHANGE_TEXT = "CHANGE_TEXT";
const ADD_TO_LIST = "ADD_TO_LIST";

/* 액션 생성함수 정의 */
// 액션 생성함수는 주로 camelCase
const increase = () => ({
  type: INCREASE, // 액션 객체에는 type 값 필수
});

const decrease = () => ({
  type: DECREASE,
});

const changeText = (text) => ({
  type: CHANGE_TEXT,
  text, // 액션안에는 type 외에 추가적인 필드를 넣어도 됨
});

const addToList = (item) => ({
  type: ADD_TO_LIST,
  item,
});

/* 리듀서 만들기 */
// 위 액션 생성함수들을 통해 만들어진 객체들을 참조하여 새로운 상태를 만드는 함수
// 주의 : 리듀서에서는 불변성을 꼭 지켜줘야 됨!!
const reducer = (state = initialState, action) => {
  // state의 초기값을 initialState로 지정
  switch (action.type) {
    case INCREASE:
      return {
        ...state,
        counter: state.counter + 1,
      };
    case DECREASE:
      return {
        ...state,
        counter: state.counter - 1,
      };
    case CHANGE_TEXT:
      return {
        ...state,
        text: action.text,
      };
    case ADD_TO_LIST:
      return {
        ...state,
        list: state.list.concat(action.item),
      };
    default:
      return state; // 리듀서에서는 기존 state를 그대로 반환하도록 작성
  }
};

/* 스토어 만들기 */
const store = createStore(reducer);

console.log(store.getState()); // 현재 store안에 들어있는 상태를 조회

// 스토어안에 들어있는 상태가 바뀔 때 마다 호출되는 listener함수
const listener = () => {
  const state = store.getState();
  console.log(state);
};

const unsubscribe = store.subscribe(listener);
// 구독을 해제하고 싶을 때는 unsubscribe()를 호출하면 된다.

// 액션들을 디스패치
store.dispatch(increase());
store.dispatch(decrease());
store.dispatch(changeText("안녕하세요"));
store.dispatch(addToList({ id: 1, text: "와우" }));

// 리덕스 스토어 안의 상태는 액션이 디스패치됨에 따라 업데이트됨
// listener라는 함수를 만들어 리덕스 상태에 변화가 생겼을 때마다 콘솔에 상태를 출력하도록 처리
