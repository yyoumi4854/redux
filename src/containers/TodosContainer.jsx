import React, { useCallback } from "react";
import { useSelector, useDispatch } from "react-redux";
import Todos from "../components/Todos";
import { addTodo, toggleTodo } from "../modules/todos";

const TodosContainer = () => {
  // useSelector에서 꼭 객체를 반환할 필요는 없다.
  // 한 종류의 값만 조회하고 싶으면 그냥 원하는 값만 바로 변환하면 된다.
  const todos = useSelector((state) => state.todos);
  const dispatch = useDispatch();

  const onCreate = (text) => dispatch(addTodo(text));
  const onToggle = useCallback((id) => dispatch(toggleTodo(id)), [dispatch]); // 최적화를 위해 useCallback 사용
  // useCallback 메모이제이션될 콜백 함수, 즉 이미 생성된 함수를 반환하는 리액트 훅

  return <Todos todos={todos} onCreate={onCreate} onToggle={onToggle} />;
};

export default TodosContainer;
