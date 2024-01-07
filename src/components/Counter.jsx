import React from "react";

/* 프리젠테이셔널 컴포넌트 만들기 */
// 프리젠테이셔널 컴포넌트란, 리덕스 스토어에 직접적으로 접근하지 않고 필요한 값 또는 함수를 props로 받아와서 사용하는 컴포넌트
const Counter = ({ number, diff, onIncrease, onDecrease, onSetDiff }) => {
  const onChange = (e) => {
    // e.target.value의 타입은 문자열이기 때문에 숫자로 변환해주어야 됨
    onSetDiff(parseInt(e.target.value, 10)); // 10진수로 변환
  };

  return (
    <div>
      <h1>{number}</h1>
      <div>
        <input type="number" value={diff} min="1" onChange={onChange} />
        <button onClick={onIncrease}>+</button>
        <button onClick={onDecrease}>-</button>
      </div>
    </div>
  );
};

export default Counter;
