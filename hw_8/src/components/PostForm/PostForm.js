import React, { useState, useRef } from 'react';
const empty = {
  id: 0,
  author: {
    avatar: 'https://alif-skills.pro/media/logo_alif.svg',
    name: 'Alif Skills',
  },
  content: '',
  photo: null,
  hit: false,
  likes: 0,
  likedByMe: false,
  hidden: false,
  tags: [],
  created: 0,
};
function PostForm({ onSave }) {
  const [post, setPost] = useState(empty);
  const firstFocusEl = useRef(null); // начальное значение

  const handleSubmit = (evt) => {
    evt.preventDefault();
    const parsed =
      post.tags
        ?.map((o) => o.replace('#', ''))
        .filter((o) => o.trim() !== '') || [];
    const tags = parsed.length > 0 ? parsed : null;
    const photo = { url: post.photo?.url, alt: post.photo?.alt || '' };
    onSave({
      ...post,
      id: Date.now(),
      created: Date.now(),
      tags,
      photo: !photo.url ? null : photo,
    });
    setPost(empty);
    firstFocusEl.current.focus();
  };
  const handleChange = (evt) => {
    const { name, value } = evt.target;
    if (name === 'tags') {
      setPost((prevState) => ({ ...prevState, [name]: value.split(' ') }));
      return;
    }

    if (name === 'photo') {
      setPost((prevState) => {
        const nextState = { ...prevState };
        if (nextState.photo) {
          nextState.photo.url = value;
          return nextState;
        }
        nextState.photo = { url: value };
        return nextState;
      });
      return;
    }
    if (name === 'alt') {
      setPost((prevState) => {
        const nextState = { ...prevState };

        if (nextState.photo) {
          nextState.photo.alt = value;
          return nextState;
        }
        nextState.photo = { alt: value };
        return nextState;
      });
      return;
    }

    setPost((prevState) => ({ ...prevState, [name]: value }));
  };

  return (
    <form onSubmit={handleSubmit}>
      <textarea
        name="content"
        placeholder="content"
        value={post.content}
        onChange={handleChange}
        ref={firstFocusEl}
      ></textarea>
      <input
        name="tags"
        placeholder="tags"
        value={post.tags.join(' ') || ''}
        onChange={handleChange}
      ></input>
      <input
        name="photo"
        placeholder="photo"
        value={post.photo?.url || ''}
        onChange={handleChange}
      ></input>
      <input
        name="alt"
        placeholder="alt"
        value={post.photo?.alt || ''}
        onChange={handleChange}
      ></input>
      <button>Ok</button>
    </form>
  );
}

export default PostForm;
