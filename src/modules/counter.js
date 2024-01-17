// 액션 타입, 액션 생성함수, 리듀서를 한 파일에 작성하는 Ducks 패턴

/* 액션타입 */
// Ducks 패턴을 따르는 리덕스 모듈에서는 액션 이름에 'counter/INCREASE'와 같이 앞부분에 접두어를 두지만
// 이번에는 액션이름이 중복되는 일이 없음으로 생략
const INCREASE = "INCREASE";
const DECREASE = "DECREASE";

/* 액션 생성 함수 */
export const increase = () => ({ type: INCREASE });
export const decrease = () => ({ type: DECREASE });

// 액션 생성 함수 대용
/* getState를 쓰지 않는다면 굳이 파라미터로 받아올 필요 없다. */
export const increaseAsync = () => (dispatch) => {
  setTimeout(() => dispatch(increase()), 2000);
};
export const decreaseAsync = () => (dispatch) => {
  setTimeout(() => dispatch(decrease()), 2000);
};

/* 초기값 (상태가 객체가 아니라 그냥 숫자여도 상관 없음) */
const initialState = 0;

const counter = (state = initialState, action) => {
  switch (action.type) {
    case INCREASE:
      return state + 1;
    case DECREASE:
      return state - 1;
    default:
      return state;
  }
};

export default counter;
