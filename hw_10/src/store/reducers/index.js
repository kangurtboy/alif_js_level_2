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
  likes: 1,
  likedByMe: true,
  hidden: false,
  tags: [],
  created: 1603501200,
};

export const initialState = {
  posts: [
    // {
    //   id: 1,
    //   author: {
    //     id: 1,
    //     avatar: 'https://alif-skills.pro/media/logo_alif.svg',
    //     name: 'Alif Skills',
    //   },
    //   content: null,
    //   photo: {
    //     url: 'https://alif-skills.pro/media/meme.jpg',
    //     alt: 'Мем про дедлайн',
    //   },
    //   hit: true,
    //   likes: 10,
    //   likedByMe: true,
    //   created: 1603501200,
    //   hidden: true,
    // },
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

const reduceSubmit = (state) => {
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

const reduceCancel = (state) => {
  return {
    ...state,
    ['edited']: empty,
  };
};

const reduceEdit = (state, action) => {
  const { id } = action.payload;
  const { posts } = state;
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

const reduceLike = (state, action) => {
  const { id } = action.payload;
  const { posts } = state;
  const postToLike = { ...posts.find((item) => item.id === id) };
  postToLike.likedByMe = !postToLike.likedByMe;
  const changedPosts = posts.map((item) => {
    if (postToLike.id === item.id) {
      item = postToLike;
    }
    return item;
  });

  return { ...state, posts: changedPosts };
};

const reduceRemove = (state, action) => {
  const { posts } = state;
  const { id } = action.payload;
  const filtered = posts.filter((item) => item.id !== id);
  return {
    ...state,
    ['posts']: filtered,
  };
};

const reduceShow = (state, action) => {};
