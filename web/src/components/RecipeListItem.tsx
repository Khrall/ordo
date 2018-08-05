import { IRecipe } from '../ordo';

import * as React from 'react';
import { Link } from 'react-router-dom';

interface IRecipeListItemProps {
  recipe: IRecipe;
}

const RecipeListItem: React.SFC<IRecipeListItemProps> = ({ recipe }) => (
  <div className="recipe-list-item">
    <Link to={`/edit-recipe/${recipe.id}`}>
      {recipe.title || 'Untitled Recipe'}
    </Link>
  </div>
);

export default RecipeListItem;
