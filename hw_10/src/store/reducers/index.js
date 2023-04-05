import {
  POST_EDIT,
  POST_EDIT_CANCEL,
  POST_EDIT_CHANGE,
  POST_EDIT_SUBMIT,
  POST_HIDE,
  POST_LIKE,
  POST_REMOVE,
  POST_SHOW,
} from '../actions';

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

export const initialState = {
  posts: [
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
  ],
  edited: empty,
  empty,
};

export const reducer = (state, action) => {
  switch (action.type) {
    case POST_EDIT_SUBMIT:
      return reduceSubmit(state, action);
    case POST_EDIT_CANCEL:
      return reduceCancel(state, action);
    case POST_EDIT:
      return reduceEdit(state, action);
    case POST_EDIT_CHANGE:
      return reduceChange(state, action);
    case POST_HIDE:
      return reduceHide(state, action);
    case POST_LIKE:
      return reduceLike(state, action);
    case POST_REMOVE:
      return reduceRemove(state, action);
    case POST_SHOW:
      return reduceShow(state, action);
    default:
      return state;
  }
};

const reduceSubmit = (state, action) => {
  const { edited, posts } = state;
  const parsed =
    edited.tags
      ?.map((o) => o.replace('#', ''))
      .filter((o) => o.trim() !== '') || [];
  const tags = parsed.length !== 0 ? parsed : null;
  const post = {
    ...edited,
    id: edited.id || Date.now(),
    created: edited.created || Date.now(),
    tags,
    photo: edited.photo?.url ? { alt: '', ...edited.photo } : null,
  };
  if (edited?.id === 0) {
    return {
      ...state,
      posts: [{ ...post }, ...posts],
      edited: empty,
    };
  }
  return {
    ...state,
    posts: posts.map((o) => {
      if (o.id !== post.id) {
        return o;
      }
      return { ...post };
    }),
    edited: empty,
  };
};

const reduceCancel = (state, action) => {
  return state;
};

const reduceEdit = (state, action) => {
  const { id } = action.payload;
  const { posts } = initialState;
  const postToEddit = posts.find((item) => item.id === id);
  return {
    ...state,
    ['edited']: postToEddit,
  };
};

const reduceChange = (state, action) => {
  const { edited } = state;
  const { name, value } = action.payload;
  if (name === 'tags') {
    const parsed = value.split(' ');
    return { ...state, edited: { ...edited, [name]: parsed } };
  }
  if (name === 'photo' || name === 'alt') {
    const prop = name === 'photo' ? 'url' : name;
    return {
      ...state,
      edited: { ...edited, photo: { ...edited.photo, [prop]: value } },
    };
  }
  return {
    ...state,
    edited: { ...edited, [name]: value },
  };
};

const reduceHide = (state, action) => {};

const reduceLike = (state, action) => {};

const reduceRemove = (state, action) => {};

const reduceShow = (state, action) => {};
