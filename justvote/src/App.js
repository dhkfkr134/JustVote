import './App.css';

import FullWidthGrid from "./components/FullWidthGrid.js";
import Subbar from './components/Subbar';
import TopBar from './components/TopBar';
import VotePage from './components/VotePage';
import MakeVote from './components/MakeVote';
import Introduce from './components/Introduce';
import Ranking from './components/Ranking';
import SignIn from './components/SignIn';
import SignUp from './components/SignUp';
import { BrowserRouter, Route, Switch } from "react-router-dom";
import { Home } from './pages';

function App() {
  return (
    <BrowserRouter>
      <div className="App">
        <TopBar />
        <Switch>

          <Route exact path="/" component={Home} />
          <Route path="/MakeVote">
            <MakeVote />
          </Route>

          <Route path="/content/:nam">
            <VotePage />
          </Route>

          <Route path="/Introduce">
            <Introduce />
          </Route>

          <Route path="/Ranking">
            <Ranking />
          </Route>

          <Route path="/SignIn">
            <SignIn />
          </Route>

          <Route path="/SignUp">
            <SignUp />
          </Route>
        </Switch>
      </div>
    </BrowserRouter>
  );
}

export default App;
