import "./App.css";

import TopBar from "./components/TopBar";
import VotePage from "./components/VotePage";
import MakeVote from "./components/MakeVote";
import Introduce from "./components/Introduce";
import Ranking from "./components/Ranking";
import Login from "./components/login/Login";
import SignUp from "./components/signup/SignUp";
import { BrowserRouter, Route, Switch } from "react-router-dom";
import { Home } from "./pages";

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
            <Login />
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
