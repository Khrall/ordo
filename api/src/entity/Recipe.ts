/* tslint:disable:member-access */
import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from 'typeorm';
import { RecipeIngredient } from './RecipeIngredient';

@Entity()
export class Recipe {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ nullable: true })
  thumbnail: string;

  @Column({ nullable: true })
  title: string;

  @Column('text', { nullable: true })
  body: string;

  @Column({ nullable: true })
  servings: number;

  @OneToMany(type => RecipeIngredient, recipeIngredient => recipeIngredient.recipe)
  ingredients: RecipeIngredient[];
}
