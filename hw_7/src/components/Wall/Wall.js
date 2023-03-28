import Post from './../Post/Post';
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

  return (
    <div className="Wall">
      {posts.map((post, id) => (
        <Post
          post={post}
          key={id}
          onRemove={handlePostRemove}
          onHide={handleHidde}
        />
      ))}
    </div>
  );
}

export default Wall;
