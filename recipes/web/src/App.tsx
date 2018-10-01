import * as React from 'react';
import { Route } from 'react-router-dom';

import EditRecipe from './views/edit-recipe/EditRecipe';
import Landing from './views/landing/Landing';

class App extends React.Component {
  public render() {
    return (
      <div className="app">
        <Route exact path="/" component={Landing} />
        <Route path="/edit-recipe/:recipeId" component={EditRecipe} />
      </div>
    );
  }
}

export default App;
