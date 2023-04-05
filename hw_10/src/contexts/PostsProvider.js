import React, { useReducer, useMemo } from 'react';
import PostsContext from './PostsContext';
import { reducer, initialState } from '../store/reducers';

export default function PostsProvider(props) {
  const [state, dispatch] = useReducer(reducer, initialState);
  const value = useMemo(() => ({ state, dispatch }), [state]);
  // const { posts, empty, edited } = state;

  //   const remove = (postID) => {
  //     //Обработчик удаления поста

  //     return posts.filter((item) => postID !== item.id);
  //   };

  //   const toggleVisiblity = (postID) => {
  //     //Обработчик скыритие поста
  //     return posts.map((item) => {
  //       const post = item;
  //       const hidden = !post.hidden;

  //       if (post.id === postID) {
  //         return { ...post, hidden };
  //       }
  //       return item;
  //     });
  //   };

  // //   const save = (post) => {
  // //     //Сохранение поста
  // //     const exitedPost = posts.find((item) => item.id === post.id);

  // //     if (post?.id !== empty.id && exitedPost?.id !== post.id) {
  // //       return [{ ...post }, ...posts];
  // //     }

  // //     return posts.map((o) => {
  // //       if (o.id === post.id) {
  // //         return { ...post };
  // //       }
  // //       return { ...o };
  // //     });
  // //   };

  //   const edit = (post) => {
  //     //Обработчик на кнопке изменить
  //     const nextState = posts.find((item) => item.id === post);
  //     return nextState;
  //   };

  //   const change = (post) => {
  //     //Обработчик форма редактирование
  //     const { name, value } = post;
  //     if (name === 'tags') {
  //       edited = { ...edited, [name]: value.split(' ') };
  //       return;
  //     }

  //     if (name === 'photo') {
  //       const nextState = { ...post };
  //       if (nextState.photo) {
  //         nextState.photo.url = value;
  //         return nextState;
  //       }
  //       nextState.photo = { url: value };
  //       return nextState;
  //     }

  //     if (name === 'alt') {
  //       const nextState = { ...post };

  //       if (nextState.photo) {
  //         nextState.photo.alt = value;
  //         return nextState;
  //       }
  //       nextState.photo = { alt: value };
  //       return nextState;
  //     }

  //     return { ...post, [name]: value };
  //   };

  //   // const like = (post) => {};

  //   const cancel = () => {
  //     //Обработчик отмена редактирование
  //     edited = empty;
  //   };

  return (
    <PostsContext.Provider value={value}>
      {props.children}
    </PostsContext.Provider>
  );
}
