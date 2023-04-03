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
  const [posts, setPosts] = useState([]);
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
	//Сохранение поста
    if (edited?.id === 0) {
      setPosts((prevState) => [{ ...post }, ...prevState]);
      setEdited(empty);
      return;
    }
    setPosts((prevState) =>
      prevState.map((o) => {
        if (o.id !== post.id) {
          return 0;
        }
        return { ...post };
      })
    );
    setEdited(empty);
    return;
  };

  const edit = (post) => {
    //Обработчик на кнопке изменить
    setSelectedPost(() => {
      const nextState = posts.find((item) => item.id === post);
      return nextState;
    });
  };

  const formEdit = (post) => {
    //Обработчик форма редактирование
    const exitedPost = posts.find((item) => item.id === post.id);
    if (post && post?.id !== 0 && exitedPost) {
      setSelectedPost(post);
    }
    if (post.id === 0 || !exitedPost) {
      setSelectedPost(post);
    }
  };

  const cancel = () => {
    //Обработчик отмена редактирование
    setEdited(empty);
  };

  const value = {
    posts,
    edited,
    remove,
    toggleVisiblity,
    save,
    edit,
    formEdit,
    cancel,
  };

  return (
    <PostsContext.Provider value={value}>
      {props.children}
    </PostsContext.Provider>
  );
}
