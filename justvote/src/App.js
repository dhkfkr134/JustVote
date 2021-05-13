import React, { Component } from 'react';
import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import AppRouter from './components/route/Router';

class App extends Component {

  render() {

    return (
      <div className = "App">
        <AppRouter></AppRouter>
      </div>
    )
  }
}

export default App;