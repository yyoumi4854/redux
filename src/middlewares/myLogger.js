// 단순히 전달받은 액션을 출력하고 다음으로 넘기는 작업
const myLogger = (store) => (next) => (action) => {
  console.log(action); // 먼저 액션을 출력
  const result = next(action); // 다음 미들웨어 (또는 리듀서)에게 액션을 전달

  // 업데이트 이휴의 상태를 조회
  console.log("\t", store.getState()); // '\t'는 탭 문자

  return result; // 여기서 반환하는 값은 dispatch(action)의 결과물이 됨, 기본: undefined
};

export default myLogger;
