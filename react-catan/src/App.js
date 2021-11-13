import logo from './logo.svg';
import './App.css';
import Game from './components/Game'

function App() {
  return (
    <div className="App">
      <header className="App-header">
        <Game numberOfPlayers={4}/>
      </header>
    </div>
  );
}

export default App;
