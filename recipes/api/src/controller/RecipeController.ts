/* tslint:disable:member-access */
import { Get, Post, Put, Body, Param, OnUndefined, JsonController } from 'routing-controllers';
import { Inject } from 'typedi';

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

  @Put('/:id')
  @OnUndefined(204)
  update(@Param('id') id: number, @Body() recipe: Recipe) {
    return this.recipeService.update(id, recipe);
  }
}
