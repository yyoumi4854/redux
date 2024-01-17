/* 포스트 구현 */
/* 프리젠테이셔널 컴포넌트 */
import React from "react";

const Post = ({ post }) => {
  const { title, body } = post;
  return (
    <div>
      <h1>{title}</h1>
      <p>{body}</p>
    </div>
  );
};

export default Post;
