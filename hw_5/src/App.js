import './App.css';
import Post from './components/Post/Post';
const posts = [
  {
    id: 2,
    author: {
      avatar: 'https://alif-skills.pro/media/logo_alif.svg',
      name: 'Alif Skills',
    },
    content: 'Ну как, вы справились с домашкой?',
    photo: null,
    hit: true,
    likedByMe: true,
    likes: 222,
    tags: ['deadline', 'homework'],
    created: 1603774800,
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
  },
];

const postsMarkup = posts.map(post=> <Post post={post} key={post.id}/>);

function App() {
  return (
    <div className="App">
    {postsMarkup}
    </div>
  );
}

export default App;
