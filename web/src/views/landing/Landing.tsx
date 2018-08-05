import { IRecipe } from '../../ordo';

import { Heading } from 'grommet';
import * as React from 'react';

import { getRecipes } from '../../api/recipes';
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
    getRecipes().then(recipes => this.setState({ recipes }));
  }

  public render() {
    return (
      <div className="landing">
        <div className="hero">
          <Heading>Ordo</Heading>
        </div>
        <RecipeList recipes={this.state.recipes} />
      </div>
    );
  }
}

export default Landing;
