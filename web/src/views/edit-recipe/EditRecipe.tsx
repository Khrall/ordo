import { Heading } from 'grommet';
import { find } from 'lodash';
import * as React from 'react';
import { RouteComponentProps } from 'react-router';
import { Value } from 'slate';
import { Editor } from 'slate-react';

import { getRecipes, updateRecipe } from '../../api/recipes';
import Button from '../../components/Button';
import { IRecipe } from '../../ordo';

interface IEditRecipeProps extends RouteComponentProps<{recipeId: string}> {}

interface IEditRecipeState {
  recipe: IRecipe,
  value: Value
}

const getInitialValue = (text) =>
  Value.fromJSON({
    document: {
      nodes: [
        {
          nodes: [
            {
              leaves: [{ text }],
              object: 'text'
            },
          ],
          object: 'block',
          type: 'paragraph'
        }
      ]
    }
  });

class EditRecipe extends React.Component<IEditRecipeProps, IEditRecipeState> {
  public state = {
    recipe: undefined,
    value: getInitialValue('Your recipe here ...')
  }

  public componentDidMount() {
    const { recipeId } = this.props.match.params;
    getRecipes()
      .then(recipes => find(recipes, { id: parseInt(recipeId, 10) }) as IRecipe)
      .then(recipe => {
        let value: Value;

        try {
          const jsonBody = JSON.parse(recipe.body);
          value = Value.fromJSON(jsonBody);
        } catch (e) {
          value = getInitialValue(recipe.body || 'Your recipe here ...')
        }

        this.setState({ recipe, value });
      })
  }

  public onChange = ({ value }) => {
    this.setState({ value })
  }

  public save = () => {
    console.log('Saving ...');
    const { recipe, value } = this.state;
    updateRecipe(recipe.id, {
      ...recipe,
      body: JSON.stringify(value)
    })
  }

  public render() {
    const { recipe } = this.state;

    if (!recipe) {
      return null;
    }

    return (
      <div className="edit-recipe">
        <Heading>{recipe.title || 'Untitled Recipe'}</Heading>
        <Editor
          className="edit-recipe-editor"
          value={this.state.value}
          onChange={this.onChange}
        />
        <Button label="Save" onClick={this.save} />
      </div>
    );
  }
}

export default EditRecipe;
