import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';
import { FrenchMeasure, Recipe } from '../models/recipe.model';
import { firebase } from "@firebase/app";
import "@firebase/database"

@Injectable()
export class RecipeService {

  recipes: Recipe[] = []
  recipesSubject = new Subject<Recipe[]>()

  constructor() { 
    this.getRecipes()
  }


  getRecipes(){
    firebase.database().ref("/recipes")
      .on("value", (data) => {
        this.recipes = data.val() ? data.val() : []
        this.emitRecipes()
      })
    
  }

  getRecipe(id: number){
    return new Promise(
      (resolve, reject) => {
        firebase.database().ref("/recipes/" + id).once("value").then(
          (data) => {
            resolve(data.val())
          },
          (error) => {
            reject(error)
          }
        )
      }
    )
  }

  emitRecipes(){
    this.recipesSubject.next(this.recipes)
  }

  addRecipe(recipe: Recipe){
    this.recipes.push(recipe)
    this.saveRecipes()
    this.emitRecipes()
  }

  saveRecipes(){
    firebase.database().ref("/recipes").set(this.recipes)
  }

  getMeasure(){
    return Object.values(FrenchMeasure)
  }

  
}
