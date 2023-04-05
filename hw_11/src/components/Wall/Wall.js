import Post from './../Post/Post';
import PostForm from '../PostForm/PostForm';
import React, { useContext } from 'react';
import { shallowEqual, useSelector } from 'react-redux';
function Wall() {
  const posts = useSelector((state) => state.posts, shallowEqual);
  return (
    <>
      <PostForm />
      {posts.map((post) => (
        <div key={post.id}>
          <Post post={post} />
        </div>
      ))}
    </>
  );
}

export default Wall;
