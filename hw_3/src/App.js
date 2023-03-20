import './App.css';
import Post from './components/Post/Post';
const post = {
  id: 1,
  author: {
    id: 1,
    avatar: 'https://alif-skills.pro/media/logo_js.svg',
    name: 'Alif Skills',
  },
  content: null,
  photo: 'https://alif-skills.pro/media/intiqol-promo.png',
  hit: true,
  likes: 100,
  likedByMe: true,
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
