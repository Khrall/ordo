import { IRecipe } from '../ordo';

const recipeUrl = 'http://localhost:4000/recipes';

const getRecipes = ():Promise<IRecipe[]> =>
  fetch(recipeUrl)
  .then(data => data.json());

const createRecipe = () =>
  fetch(recipeUrl, {
    body: JSON.stringify({}),
    headers: {
      'Accept': 'application/json',
      'Content-Type': 'application/json'
    },
    method: 'POST'
  });

const updateRecipe = (id, recipe) =>
  fetch(`${recipeUrl}/${id}`, {
    body: JSON.stringify(recipe),
    headers: {
      'Accept': 'application/json',
      'Content-Type': 'application/json'
    },
    method: 'PUT'
  });

export {
  getRecipes,
  createRecipe,
  updateRecipe
}
