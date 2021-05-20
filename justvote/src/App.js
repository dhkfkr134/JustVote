import './App.css';
import Subscribers from './components/Subscribers'
import Display from './components/Display';
import Views from './components/Views';

function App() {
  return (
    <div className="App">
      <Subscribers />
      <Display></Display>
      <Views></Views>
    </div>
  );
}

export default App;
