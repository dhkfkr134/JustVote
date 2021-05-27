import "./App.css";

import VotePage from "./components/VotePage";
import MakeVote from "./components/MakeVote";
import Introduce from "./components/Introduce";
import Ranking from "./components/Ranking";
import Login from "./components/login/Login";
import Header from "./components/header/Header";
import SignUp from "./components/signup/SignUp";
import { Home } from "./pages";
import { BrowserRouter, Route, Switch } from "react-router-dom";
import VoteContainer from "./components/createvote/VoteContainer";

function App() {
  return (
    <BrowserRouter>
      <div className="App">
        <Route path="/" component={Header} />
        <Switch>
          <Route path="/Home" component={Home} />
          <Route path="/MakeVote" component={VoteContainer} />

          <Route path="/content/:nam">
            <VotePage />
          </Route>

          <Route path="/Introduce">
            <Introduce />
          </Route>

          <Route path="/Ranking">
            <Ranking />
          </Route>

          <Route path="/SignIn" component={Login} />

          <Route path="/SignUp">
            <SignUp />
          </Route>
        </Switch>
      </div>
    </BrowserRouter>
  );
}

export default App;
