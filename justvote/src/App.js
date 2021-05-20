import './App.css';
import { Route, Switch } from 'react-router-dom';
import { BrowserRouter as Router } from 'react-router-dom';
import { Home, About } from './pages';
import Header from './components/Header';

function App() {
  return (
    <div className="App">
      <Router>
        <Header/>
        <Route exact path="/" component={Home}/>
        <Switch>
          <Route path="/about" component={About}/>
        </Switch>
      </Router>
    </div>
  );
}

export default App;
