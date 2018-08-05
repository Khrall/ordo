import { IRecipe } from '../ordo';

import * as React from 'react';

import RecipeListItem from './RecipeListItem';

interface IRecipeListProps {
  recipes: IRecipe[];
}

const RecipeList: React.SFC<IRecipeListProps> = (props) => (
  <div className="recipe-list">
    {
      props.recipes.map(recipe =>
        <RecipeListItem key={recipe.id} recipe={recipe} />
      )
    }
  </div>
);

export default RecipeList;
