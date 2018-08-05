import { IRecipe } from '../ordo';

import * as React from 'react';

interface IRecipeListItemProps {
  recipe: IRecipe;
}

const RecipeListItem: React.SFC<IRecipeListItemProps> = ({ recipe }) => (
  <div className="recipe-list-item">
    {recipe.title}
  </div>
);

export default RecipeListItem;
