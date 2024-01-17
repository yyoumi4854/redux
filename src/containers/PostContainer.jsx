import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { getPost, clearPost, goToHome } from "../modules/posts";
import Post from "../components/Post";
import { useNavigate } from "react-router-dom";

// postId 값을 props로 받아오고 이값을 라우터의 URL 파라미터로 읽어옴
const PostContainer = ({ postId }) => {
  // const { data, loading, error } = useSelector((state) => state.posts.post);

  /* 요청은 하지만 로딩중을 보여주지 않는 방법 - 아예 요청을 하지 않는 방식으로 해결 */
  const { data, loading, error } = useSelector(
    (state) => state.posts.post[postId]
  ) || {
    loading: false,
    data: null,
    error: null,
  }; // 아예 데이터가 존재하지 않을 때가 있으므로, 비구조화 할당이 오류나지 않도록
  const dispatch = useDispatch();
  const navigate = useNavigate();

  useEffect(() => {
    dispatch(getPost(postId));
    return () => {
      dispatch(clearPost());
    };
  }, [postId, dispatch]);

  if (loading && !data) return <div>로딩중...</div>; // 로딩중이고 데이터 없을때만
  if (error) return <div>에러 발생!</div>;
  if (!data) return null;

  return (
    <>
      {/* <button onClick={() => dispatch(goToHome())}>홈으로 이동</button> */}
      <button onClick={() => dispatch(goToHome(navigate))}>홈으로 이동</button>
      <Post post={data} />
    </>
  );
};

export default PostContainer;
