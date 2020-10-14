import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';
import { FrenchMeasure, Recipe } from '../models/recipe.model';

@Injectable()
export class RecipeService {

  recipes: Recipe[] = [
    new Recipe(
      "Tarte aux pommes",
      [
        {name: "Pomme", quantity:2, measure: FrenchMeasure.SANS}
      ],
      [
        "Couper les pommmes"
      ]
    ),
    new Recipe(
      "Gâteau nature",
      [
        {name: "Yaourt", quantity:200, measure: FrenchMeasure.GRAMME},
        {name: "Sucre", quantity:150, measure: FrenchMeasure.GRAMME}
        
      ],
      [
        "Préparer le four",
        "Mettre dans le four"
      ]
    )
  ]
  recipesSubject = new Subject<Recipe[]>()

  constructor() { 
    this.getRecipes()
  }


  getRecipes(){
    this.emitRecipes()
  }

  getRecipe(index: number): Recipe{
    return this.recipes[index]
  }

  emitRecipes(){
    this.recipesSubject.next(this.recipes)
  }

  addRecipe(recipe: Recipe){
    this.recipes.push(recipe)
    this.emitRecipes()
  }

  getMeasure(){
    return Object.values(FrenchMeasure)
  }

  
}
