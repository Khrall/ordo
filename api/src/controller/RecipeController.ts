/* tslint:disable:member-access */
import { Get, Post, Body, JsonController } from 'routing-controllers';
import { Inject } from 'typedi';
import { validate } from 'class-validator';

import { RecipeService } from '../service/RecipeService';
import { Recipe } from '../entity/Recipe';

@JsonController('/recipes')
export class RecipeController {

  @Inject()
  private recipeService: RecipeService;

  @Get()
  getAll() {
    return this.recipeService.getAll();
  }

  @Post()
  create(@Body() recipe: Recipe): Promise<Recipe> {
    return this.recipeService.create(recipe);
  }
}
