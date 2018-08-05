import { Heading } from 'grommet';
import { find } from 'lodash';
import * as React from 'react';
import { RouteComponentProps } from 'react-router';

import { getRecipes } from '../../api/recipes';
import { IRecipe } from '../../ordo';

interface IEditRecipeProps extends RouteComponentProps<{recipeId: string}> {}

interface IEditRecipeState {
  recipe: IRecipe
}

class EditRecipe extends React.Component<IEditRecipeProps, IEditRecipeState> {
  constructor(props: IEditRecipeProps) {
    super(props);
    this.state = { recipe: undefined }
  }

  public componentDidMount() {
    const { recipeId } = this.props.match.params;
    getRecipes()
      .then(recipes => find(recipes, { id: parseInt(recipeId, 10) }) as IRecipe)
      .then(recipe => this.setState({ recipe }))
  }

  public render() {
    const { recipe } = this.state;

    if (!recipe) {
      return null;
    }

    return (
      <div className="edit-recipe">
        <Heading>{recipe.title || 'Untitled Recipe'}</Heading>
        <div className="body">
          {recipe.body || 'Your recipe here ...'}
        </div>
      </div>
    );
  }
}

export default EditRecipe;
