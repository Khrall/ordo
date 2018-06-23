/* tslint:disable:member-access */
import { MinLength, IsNotEmpty } from 'class-validator';
import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from 'typeorm';
import { RecipeIngredient } from './RecipeIngredient';

@Entity()
export class Recipe {
  @PrimaryGeneratedColumn()
  id: number;

  @IsNotEmpty()
  @Column()
  thumbnail: string;

  @IsNotEmpty()
  @MinLength(6)
  @Column()
  title: string;

  @IsNotEmpty()
  @Column('text')
  body: string;

  @Column({
    default: 4
  })
  servings: number;

  @OneToMany(type => RecipeIngredient, recipeIngredient => recipeIngredient.recipe)
  ingredients: RecipeIngredient[];
}
