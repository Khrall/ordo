import { Container, Service } from 'typedi';
import { InjectRepository } from 'typeorm-typedi-extensions';

import { RecipeRepository } from '../repository/RecipeRepository';
import { Recipe } from '../entity/Recipe';

@Service()
export class RecipeService {

  @InjectRepository(RecipeRepository)
  private repository: RecipeRepository;

  public getAll() {
    return this.repository.find();
  }

  public async create(recipe: Recipe): Promise<Recipe> {
    const newRecipe = await this.repository.save(recipe);
    return newRecipe;
  }
}
