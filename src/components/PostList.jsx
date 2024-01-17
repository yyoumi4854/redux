/* 포스트 목록 구현 */
/* 프리젠테이셔널 컴포넌트 */
import React from "react";
import { Link } from "react-router-dom";

const PostList = ({ posts }) => {
  return (
    <ul>
      {posts.map((post) => (
        <li key={post.id}>
          <Link to={`/${post.id}`}>{post.title}</Link>
        </li>
      ))}
    </ul>
  );
};

export default PostList;
