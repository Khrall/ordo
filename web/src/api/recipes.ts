import { IRecipe } from '../ordo';

const getRecipes = ():Promise<IRecipe[]> =>
  fetch('http://localhost:4000/recipes')
  .then(data => data.json());

export {
  getRecipes
}
