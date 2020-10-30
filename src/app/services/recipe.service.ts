import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';
import { FrenchMeasure, Recipe } from '../models/recipe.model';
import { firebase } from "@firebase/app";
import "@firebase/database"
import "@firebase/storage"

@Injectable()
export class RecipeService {

  recipes: Recipe[] = []
  recipesSubject = new Subject<Recipe[]>()

  constructor() { 
    this.getRecipes()
  }

  /* Valid recipes */
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

  updateRecipe(id: number, newRecipe: Recipe){
    this.recipes.splice(id, 1, newRecipe)
    this.saveRecipes()
    this.emitRecipes()
  }

  deleteRecipe(id: number, recipe: Recipe){
    if(recipe.photo){
      const storageRef = firebase.storage().refFromURL(recipe.photo)
      storageRef.delete().then(
        () => {
          console.log("Photo removed!")
        },
        (error) => {
          console.log("Could not remove photo! : " + error)
        }
      )

    }
    
    this.recipes.splice(id, 1)
    this.saveRecipes()
    this.emitRecipes()
  }

  saveRecipes(){
    firebase.database().ref("/recipes").set(this.recipes)
  }

  uploadFile(file: File){
    return new Promise(
      (resolve, reject) => {
        const fileName = Date.now().toString()
        const upload = firebase.storage().ref()
          .child("images/" + fileName + file.name).put(file)
        upload.on(firebase.storage.TaskEvent.STATE_CHANGED,
          () => {
            console.log("Loading...")
          },
          (error) => {
            console.log("Loading error !")
          },  
          () => {
            resolve(upload.snapshot.ref.getDownloadURL())
          })
      }
    )
  }


  /* Other functions */
  getMeasure(){
    return Object.values(FrenchMeasure)
  }

  
}
