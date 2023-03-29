import Post from './../Post/Post';
import PostForm from '../PostForm/PostForm';
import React, { useState } from 'react';

function Wall() {
  const [posts, setPosts] = useState([
    {
      id: 2,
      author: {
        avatar: 'https://alif-skills.pro/media/logo_alif.svg',
        name: 'Alif Skills',
      },
      content: 'Ну как, вы справились с домашкой?',
      photo: null,
      hit: true,
      likedByMe: true,
      likes: 222,
      tags: ['deadline', 'homework'],
      created: 1603774800,
      hidden: false,
    },
    {
      id: 1,
      author: {
        id: 1,
        avatar: 'https://alif-skills.pro/media/logo_alif.svg',
        name: 'Alif Skills',
      },
      content: null,
      photo: {
        url: 'https://alif-skills.pro/media/meme.jpg',
        alt: 'Мем про дедлайн',
      },
      hit: true,
      likes: 10,
      likedByMe: true,
      created: 1603501200,
      hidden: true,
    },
  ]);
  const handlePostRemove = (postID) => {
    setPosts((prev) => {
      return prev.filter((prevPost) => postID !== prevPost.id);
    });
  };
  const handleHidde = (postID) => {
    setPosts((prevState) => {
      return prevState.map((item) => {
        const post = item;
        const hidden = !post.hidden;

        if (post.id === postID) {
          return { ...post, hidden };
        }
        return item;
      });
    });
  };

  const handleSave = (post) => {
    setPosts((prev) => {
		console.log(post);
      return [post, ...prev];
    });
  };

  return (
    <>
      <PostForm onSave={handleSave} />
      {posts.map((post, id) => (
        <div  key={id}>
          <Post
            post={post}
            onRemove={handlePostRemove}
            onHide={handleHidde}
          />
        </div>
      ))}
    </>
  );
}

export default Wall;
