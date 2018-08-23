import { Heading } from 'grommet';
import { find } from 'lodash';
import * as React from 'react';
import { RouteComponentProps } from 'react-router';
import { Block, Schema, Value } from 'slate';
import { Editor } from 'slate-react';

import { getRecipes, updateRecipe } from '../../api/recipes';
import Button from '../../components/Button';
import { IRecipe } from '../../ordo';

interface IEditRecipeProps extends RouteComponentProps<{recipeId: string}> {}

interface IEditRecipeState {
  recipe: IRecipe;
  value: Value;
  error: string;
}

const HeadingNode = (props) => {
  return <h1>{props.children}</h1>;
}

const schema = Schema.create({
  document: {
    first: { type: 'heading' },
    nodes: [
      { match: { type: 'heading' }, min: 1, max: 1 },
      { match: { type: 'paragraph' }, min: 1 },
    ],
    normalize: (change, error) => {
      switch (error.code) {
        case 'child_type_invalid':
          const type = error.index === 0 ? 'heading' : 'paragraph';
          return change.setNodeByKey(error.child.key, type);
        case 'child_required':
          const block = Block.create(error.index === 0 ? 'heading' : 'paragraph')
          return change.insertNodeByKey(error.node.key, error.index, block)
      }
    }
  }
});

const getInitialValue = () =>
  Value.fromJSON({
    document: {
      nodes: [
        {
          object: 'block',
          type: 'heading',
          nodes: [
            {
              object: 'text',
              leaves: [{ text: 'Your Recipe' }]
            }
          ]
        },
        {
          object: 'block',
          type: 'paragraph',
          nodes: [
            {
              object: 'text',
              leaves: [{ text: 'Just a few cups of sugar ...' }]
            }
          ]
        }
      ]
    }
  });

class EditRecipe extends React.Component<IEditRecipeProps, IEditRecipeState> {
  public state = {
    recipe: undefined,
    value: undefined,
    error: undefined
  }

  public componentDidMount() {
    const { recipeId } = this.props.match.params;
    getRecipes()
      .then(recipes => find(recipes, { id: parseInt(recipeId, 10) }) as IRecipe)
      .then(recipe => {
        try {
          let value: Value;

          if (recipe.body === null) {
            value = getInitialValue();
          } else {
            const jsonBody = JSON.parse(recipe.body);
            value = Value.fromJSON(jsonBody);
          }
          this.setState({ recipe, value });
        } catch (e) {
          this.setState({ error: 'There was an error parsing your recipe!' });
        }
      })
      .catch(() => this.setState({ error: 'There was an error fetching your recipe!' }))
  }

  public onChange = ({ value }) => {
    this.setState({ value })
  }

  public save = () => {
    const { recipe, value } = this.state;
    console.log('Saving ...', recipe, value);

    let title = null;
    try {
      title = value.document.nodes.get(0).nodes.get(0).text;
    } catch (e) {
      console.log('Could not parse document title');
    }

    updateRecipe(recipe.id, {
      ...recipe,
      title,
      body: JSON.stringify(value)
    })
    .then(() => console.log('Saved!'));
  }

  public render() {
    const { value, error } = this.state;

    if (error) {
      return (
        <div>
          <h1>Error</h1>
          <p>{error}</p>
        </div>
      );
    }

    if (!value) {
      return null;
    }

    return (
      <div className="edit-recipe">
        <Editor
          className="edit-recipe-editor"
          value={value}
          onChange={this.onChange}
          schema={schema}
          renderNode={this.renderNode}
        />
        <Button label="Save" onClick={this.save} />
      </div>
    );
  }

  public renderNode = (props) => {
    switch (props.node.type) {
      case 'heading':
        return <HeadingNode {...props} />
    }
  }
}

export default EditRecipe;
