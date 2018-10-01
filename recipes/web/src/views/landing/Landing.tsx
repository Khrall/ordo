import { IRecipe } from '../../ordo';

import { Heading } from 'grommet';
import * as React from 'react';

import { createRecipe, getRecipes } from '../../api/recipes';
import Button from '../../components/Button';
import RecipeList from '../../components/RecipeList';

interface ILandingState {
  recipes: IRecipe[];
}

class Landing extends React.Component<{}, ILandingState> {
  constructor(props: any) {
    super(props);
    this.state = {
      recipes: []
    }
  }

  public componentDidMount() {
    this.getRecipes();
  }

  public getRecipes = () => {
    getRecipes().then(recipes => this.setState({ recipes }));
  }

  public createRecipe = () => {
    createRecipe()
    .then(this.getRecipes);
  }

  public render() {
    return (
      <div className="landing">
        <div className="hero">
          <div className="container">
            <Heading>Ordo</Heading>
            <Button
              label="New Recipe"
              onClick={this.createRecipe}
            />
          </div>
        </div>
        <RecipeList recipes={this.state.recipes} />
      </div>
    );
  }
}

export default Landing;
