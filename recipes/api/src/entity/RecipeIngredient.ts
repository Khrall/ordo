/* tslint:disable:member-access */
import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';
import { Recipe } from './Recipe';

@Entity()
export class RecipeIngredient {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;

  @Column()
  amount: string;

  @Column()
  unit: string;

  @Column()
  detail: string;

  @ManyToOne(type => Recipe, recipe => recipe.ingredients)
  recipe: Recipe;
}
