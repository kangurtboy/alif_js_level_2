import React, { useState, useRef, useEffect } from 'react';

const empty = {
	//Пустой пост по умолчанию
  id: 0,
  author: {
    avatar: 'https://alif-skills.pro/media/logo_js.svg',
    name: 'Alif',
    id: 1,
  },
  content: '',
  photo: null,
  hit: true,
  likes: 10,
  likedByMe: true,
  hidden: false,
  tags: [],
  created: 1603501200,
};

function PostForm({ onSave, edited = empty, onCancel, edit, onFormEdit }) {

  const [post, setPost] = useState(empty);
  const firstFocusEl = useRef(null);

  const handleSubmit = (evt) => {
    //отправка данных
    evt.preventDefault();
    const parsed =
      post.tags
        ?.map((o) => o.replace('#', ''))
        .filter((o) => o.trim() !== '') || [];
    const tags = parsed.length > 0 ? parsed : null;
    const photo = { url: post.photo?.url, alt: post.photo?.alt || '' };
    onSave({
      ...post,
      id: edited?.id ? edited.id : Date.now(),
      created: edited ? edited.created : Date.now(),
      tags,
      photo: !photo.url ? null : photo,
    });
    setPost(post);
    firstFocusEl.current.focus();
  };

  const handleChange = (evt) => {
    // обработчик ввода
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

    setPost((prevState) => {
      return { ...prevState, [name]: value };
    });
  };

  const handleCancel = (evt) => {
	//Отмена редактирование
    evt.preventDefault();
    setPost(empty);
    onCancel();
  };

  useEffect(() => {
	//отслеживание состаяние редактируюмого поста
    if (typeof onFormEdit === 'function') {
      onFormEdit(edited);
    }
    setPost(edited);
  }, [edited, onFormEdit, edit]);

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
        {edited !== empty && <button onClick={handleCancel}>Отменить</button>}
      </form>
    </div>
  );
}

export default PostForm;
