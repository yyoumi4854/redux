/* PostList를 위한 컨테이너 컴포넌트 */
import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import PostList from "../components/PostList";
import { getPosts } from "../modules/posts";

const PostListContainer = () => {
  const { data, loading, error } = useSelector((state) => state.posts.posts);
  const dispatch = useDispatch();

  /* API 재로딩 문제 해결 : 만약 데이터가 이미 존재한다면 요청을 하지 않기 - 수정 */
  // 컴포넌트 마운트 후 포스트 목록 요청
  useEffect(() => {
    if (data) return; // 수정
    dispatch(getPosts());
  }, [data, dispatch]); // 수정

  if (loading && !data) return <div>로딩중...</div>; // 수정 : 로딩중이면서, 데이터가 없을 때에만 로딩중... 표시
  if (error) return <div>에러 발생!</div>;
  if (!data) return null;
  return <PostList posts={data} />;
};

export default PostListContainer;
