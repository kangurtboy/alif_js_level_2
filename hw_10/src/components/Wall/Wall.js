import Post from './../Post/Post';
import PostForm from '../PostForm/PostForm';
import React, { useContext, useState } from 'react';
import PostsContext from '../../contexts/PostsContext';

function Wall() {
	const {posts} = useContext(PostsContext);
  return (
    <>
      <PostForm />
      {posts.map((post) => (
        <div key={post.id}>
          <Post />
        </div>
      ))}
    </>
  );
}

export default Wall;
