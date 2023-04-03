import React, { useState, useRef, useEffect } from 'react';
import PostsProvider from '../../contexts/PostsProvider';

function PostForm() {
  const {
    save,
    cancel,
    edited: post,
    setEdited: setPost,
  } = useContext(PostsContext);
  const firstFocusEl = useRef(null);

  const handleSubmit = (evt) => {
    firstFocusEl.current.focus();
    submit();
  };

  const handleReset = (evt) => {
    evt.preventDefault();
    cancel();
  };

  const handleChange = (evt) => {
    const { name, value } = evt.target;
    change({ name, value });
  };


//   useEffect(() => {
//     //отслеживание состаяние редактируюмого поста
//     if (typeof onFormEdit === 'function') {
//       onFormEdit(edited);
//     }
//     setPost(edited);
//   }, [edited, onFormEdit, edit]);

  return (
    <div>
      <form onSubmit={handleSubmit}>
        <textarea
          name="content"
          placeholder="content"
          value={post?.content || ''}
          onChange={handleChange}
          ref={firstFocusEl}
        ></textarea>
        <input
          name="tags"
          placeholder="tags"
          value={post?.tags?.join(' ') || ''}
          onChange={handleChange}
        ></input>
        <input
          name="photo"
          placeholder="photo"
          value={post?.photo?.url || ''}
          onChange={handleChange}
        ></input>
        <input
          name="alt"
          placeholder="alt"
          value={post?.photo?.alt || ''}
          onChange={handleChange}
        ></input>
        <button>Ok</button>
        {edited !== empty && <button onClick={handleReset}>Отменить</button>}
      </form>
    </div>
  );
}

export default PostForm;
