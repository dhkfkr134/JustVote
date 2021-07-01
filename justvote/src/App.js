import "./App.css";

import VotePage from "./components/VotePage";
import Introduce from "./components/Introduce";
import Ranking from "./components/ranking/Ranking";
import Login from "./components/login/Login";
import Header from "./components/header/Header";
import SignUp from "./components/signup/SignUp";
import { Home } from "./pages";
import MainHome from "./components/mainHome/MainHome";
import { BrowserRouter, Route, Switch } from "react-router-dom";
import VoteContainer from "./components/createvote/VoteContainer";

function App() {
  return (
    <BrowserRouter>
      <div className="App">
        <Route path="/" component={Header} />
        <Switch>
          <Route path="/Home" component={MainHome} />
          <Route path="/MakeVote" component={VoteContainer} />

          <Route path="/content/:nam" component={VotePage} />

          <Route path="/Introduce">
            <Introduce />
          </Route>

          <Route path="/Ranking" component={Ranking} />

          <Route path="/SignIn" component={Login} />

          <Route path="/SignUp" component={SignUp} />
        </Switch>
      </div>
    </BrowserRouter>
  );
}

export default App;
