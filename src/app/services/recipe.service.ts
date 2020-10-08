import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';
import { Recipe } from '../models/recipe.model';

@Injectable()
export class RecipeService {

  recipes: Recipe[] = [
    new Recipe(
      "Tarte aux pommes",
      [
        {name: "Pomme", quantity:2}
      ],
      [
        "Couper les pommmes"
      ]
    ),
    new Recipe(
      "Gâteau nature",
      [
        {name: "Yaourt", quantity:200},
        {name: "Sucre", quantity:150}
        
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

  emitRecipes(){
    this.recipesSubject.next(this.recipes)
  }
}
