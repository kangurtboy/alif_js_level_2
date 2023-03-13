import './App.css';
import Message from './components/Message/Message';

function App() {
  return (
    <div className="App">
      <Message text="Первое сообщение" />
      <Message text="Второе сообщение" />
      <Message text="Третье сообщение" />
    </div>
  );
}

export default App;
