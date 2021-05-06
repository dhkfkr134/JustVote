import React, { Component } from 'react';
import RecipeReviewCard from "./components/RecipeReviewCard.js";
import FullWidthGrid from "./components/FullWidthGrid.js";
import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';


class App extends Component {
  render() {
    return (
      <div className = "App">
        <FullWidthGrid></FullWidthGrid>
      </div>
    )
  }
}

export default App;
