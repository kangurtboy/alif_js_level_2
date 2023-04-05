import Post from './../Post/Post';
import PostForm from '../PostForm/PostForm';
import React, { useContext } from 'react';
import PostsContext from '../../contexts/PostsContext';
function Wall() {
  const { state: {posts} } = useContext(PostsContext);
  return (
    <>
      <PostForm />
      {posts.map((post) => (
        <div key={post.id}>
          <Post post={post}/>
        </div>
      ))}
    </>
  );
}

export default Wall;
