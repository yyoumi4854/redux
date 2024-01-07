import React from "react";
import { useSelector, useDispatch, shallowEqual } from "react-redux";
import Counter from "../components/Counter";
import { increase, decrease, setDiff } from "../modules/counter";

const CounterContainer = () => {
  // useSelector는 리덕스 스토어의 상태를 조회하는 Hook
  // state의 값은 store.getState() 함수를 호출했을 때 나타나는 결과물과 동일
  /*
    const { number, diff } = useSelector((state) => ({
      number: state.counter.number,
      diff: state.counter.diff,
    }));
    */

  // 할 일 목록의 항목을 토글 할 때에는 카운터가 리렌더링 됨
  /* 최적화 방법1. useSelector를 여러번 사용 */
  /* const number = useSelector((state) => state.counter.number);
  const diff = useSelector((state) => state.counter.diff); */
  // -> 해당 값들 하나라도 바뀌었을 때에만 컴포넌트 리렌더링 됨

  /* 최적화 방법2. react-redux의 shallowEqual함수를 useSelector의 두번째 인자로 전달 */
  const { number, diff } = useSelector(
    (state) => ({
      number: state.counter.number,
      diff: state.counter.diff,
    }),
    shallowEqual
  );
  // useSelector의 두번째 파라미터는 equalityFn
  // 이전 값과 다음 값을 비교하여 true가 나오면 리렌더링을 하지 않고 false가 나오면 리렌더링

  // useDispatch는 리덕스 스토어의 dispatch를 함수에서 사용 할 수 있게 해주는 Hook
  const dispatch = useDispatch();
  // 각 액션들을 디스패치하는 함수들 만들기
  const onIncrease = () => dispatch(increase());
  const onDecrease = () => dispatch(decrease());
  const onSetDiff = (diff) => dispatch(setDiff(diff));

  return (
    <Counter
      // 상태와
      number={number}
      diff={diff}
      // 액션을 디스패치 하는 함수들을 props로 넣어줌
      onIncrease={onIncrease}
      onDecrease={onDecrease}
      onSetDiff={onSetDiff}
    />
  );
};

export default CounterContainer;
