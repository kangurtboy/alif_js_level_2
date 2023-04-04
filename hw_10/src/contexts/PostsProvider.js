import React, { useState } from 'react';
import PostsContext from './PostsContext';

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

export default function PostsProvider(props) {
  const [posts, setPosts] = useState([
    {
      id: 2,
      author: {
        id: 3,
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
  const [edited, setEdited] = useState(empty);

  const remove = (postID) => {
    //Обработчик удаления поста
    setPosts((prev) => {
      return prev.filter((prevPost) => postID !== prevPost.id);
    });
  };

  const toggleVisiblity = (postID) => {
    //Обработчик скыритие поста
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

  const save = (post) => {
    console.log(post);
    //Сохранение поста
    const exitedPost = posts.find((item) => item.id === post.id);
    if (post?.id !== empty.id && exitedPost?.id !== post.id) {
      setPosts((prevState) => [{ ...post }, ...prevState]);
      setEdited(empty);
      return;
    }

    setPosts((prevState) =>
      prevState.map((o) => {
        if (o.id === post.id) {
          return { ...post };
        }
        return { ...o };
      })
    );
    setEdited(empty);
    return;
  };

  const edit = (post) => {
    //Обработчик на кнопке изменить
    setEdited(() => {
      const nextState = posts.find((item) => item.id === post);
      return nextState;
    });
  };

  const change = (post) => {
    //Обработчик форма редактирование
    const { name, value } = post;
    if (name === 'tags') {
      setEdited((prevState) => ({ ...prevState, [name]: value.split(' ') }));
      return;
    }

    if (name === 'photo') {
      setEdited((prevState) => {
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
      setEdited((prevState) => {
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

    setEdited((prevState) => {
      return { ...prevState, [name]: value };
    });
  };

  const like = (post) => {};

  const cancel = () => {
    //Обработчик отмена редактирование
    setEdited(empty);
  };

  const value = {
    posts,
    remove,
    toggleVisiblity,
    save,
    change,
    cancel,
    edit,
    like,
    edited,
    setEdited,
    empty,
  };

  return (
    <PostsContext.Provider value={value}>
      {props.children}
    </PostsContext.Provider>
  );
}
