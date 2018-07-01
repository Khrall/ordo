/* tslint:disable:member-access */
import { MinLength, IsNotEmpty } from 'class-validator';
import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from 'typeorm';
import { RecipeIngredient } from './RecipeIngredient';

@Entity()
export class Recipe {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  thumbnail: string;

  @Column()
  title: string;

  @Column('text')
  body: string;

  @Column()
  servings: number;

  @OneToMany(type => RecipeIngredient, recipeIngredient => recipeIngredient.recipe)
  ingredients: RecipeIngredient[];
}
