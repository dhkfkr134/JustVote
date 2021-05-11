import React, { Component } from 'react';
import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import SignIn from './components/SignIn';
import SignUp from './components/SignUp';

class App extends Component {

  constructor(props) {
    super(props);
    this.state = {
      posts: ""
    }
  }

  componentWillMount() {
    fetch('/demo/hello')
      .then(data => console.log(data));
  }

  render() {

    return (
      <div className = "App">
        <SignUp></SignUp>
      </div>
    )
  }
}

export default App;