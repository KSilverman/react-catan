import logo from './logo.svg';
import './App.css';
import Game from './components/Game'
import 'bootstrap/dist/css/bootstrap.min.css';

function App() {
  return (
    <div className="App">
      <header className="App-header">
        <Game numberOfPlayers={3}/>
      </header>
    </div>
  );
}

export default App;
