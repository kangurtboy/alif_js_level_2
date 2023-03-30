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
      likedByMe: false,
      likes: 0,
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
  const [edit, setEdit] = useState(false);
  const [selecTedPost, setSelectedPost] = useState(undefined);
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
      const newState = [...prev];
      const exitedPost = prev.find((item) => item.id === post.id);

      if (exitedPost) {
        const result = newState.map((item) => {
          if (item.id === post.id) {
            item = post;
          }
          return item;
        });
        return [...result];
      }
      return [{ ...post }, ...prev];
    });
    setSelectedPost(null);
  };

  const handleEdit = (post) => {
    setSelectedPost(() => {
      const nextState = posts.find((item) => item.id === post);
      setEdit(true);
      return nextState;
    });
  };
  const handleFormEdit = (post) => {};
  const handleCancel = (post) => {
    setEdit(false);
    setSelectedPost(post);
  };

  return (
    <>
      <PostForm
        onSave={handleSave}
        edited={selecTedPost}
        onCancel={handleCancel}
        edit={edit}
        onEdit={handleFormEdit}
      />
      {posts.map((post, id) => (
        <div key={id}>
          <Post
            post={post}
            onRemove={handlePostRemove}
            onHide={handleHidde}
            onEdit={handleEdit}
          />
        </div>
      ))}
    </>
  );
}

export default Wall;
