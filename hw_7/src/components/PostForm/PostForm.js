import React, { useState } from 'react';
function PostForm({ onSave }) {
  const [post, setPost] = useState({
    id: Date.now(), // просто генерируем id из даты (потом научимся правильно)
    author: {
      avatar: 'https://alif-skills.pro/media/logo_alif.svg',
      name: 'Alif Skills',
    },
    content: '',
    photo: null,
    likes: 0,
    likedByMe: false,
    hit: false,
    hidden: false,
    created: Date.now(),
    tags: [],
  });
  const handleSubmit = (evt) => {
    evt.preventDefault();
    onSave(post);
  };
  const handleChange = (evt) => {
    const { value } = evt.target;
    setPost((prevState) => ({ ...prevState, content: value }));
  };
  return (
    <form onSubmit={handleSubmit}>
      <textarea value={post.content} onChange={handleChange}></textarea>{' '}
      <button>0k</button>
    </form>
  );
}

export default PostForm;
