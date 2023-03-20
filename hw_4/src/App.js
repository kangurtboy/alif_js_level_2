import './App.css';
import Post from './components/Post/Post';
const post = {
  id: 1,
  author: {
    id: 1,
    name: 'Alif Skills',
    content: null,
  },
  photo: {
    url: 'https://alif-skills.pro/media/meme.jpg',
    alt: 'Мем про дедлайн',
    avatar: 'https://alif-skills.pro/media/logo_alif.svg',
  },
  hit: true,
  likes: 10,
  likedByMe: true,
  tags: ['meme', 'kadu'],
  created: 1603501200,
};

function App() {
  return (
    <div className="App">
      <Post post={post} />
    </div>
  );
}

export default App;
