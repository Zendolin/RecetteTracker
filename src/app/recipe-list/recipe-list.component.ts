import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { Recipe } from '../models/recipe.model';
import { RecipeService } from '../services/recipe.service';

@Component({
  selector: 'app-recipe-list',
  templateUrl: './recipe-list.component.html',
  styleUrls: ['./recipe-list.component.scss']
})
export class RecipeListComponent implements OnInit {

  allRecipes: Recipe[]
  recipes: Recipe[]
  recipesSubscription: Subscription

  searchForm: FormGroup

  constructor(private recipesService: RecipeService,
              private formBuilder: FormBuilder) { 
    
  }

  ngOnInit(): void {
    this.recipesSubscription = this.recipesService.recipesSubject.subscribe(
      (recipes: Recipe[]) => {
        this.allRecipes = recipes.filter(recipe => recipe)
        this.recipes = this.allRecipes
      }
    )
    this.recipesService.emitRecipes()
    this.initForm()
  }

  ngOnDestroy(){
    this.recipesSubscription.unsubscribe()
  }

  initForm(){
    this.searchForm = this.formBuilder.group({
      search: ["", Validators.required]
    })
  }

  onSearch(){
    const formValue = this.searchForm.value
    const search = formValue["search"]

    this.searchForm.setValue({"search" :this.clean(search)})

    this.recipes = this.allRecipes.filter((recipe) => {
      const uglifySearch = this.uglify(search)
      const titleRecipe = this.uglify(recipe.name)


      return(uglifySearch === titleRecipe || this.includesAll(titleRecipe, uglifySearch))
    })
  }

  includesAll(s1: string, s2: string): boolean{
    let isAllInclude = true
    let s2Array = s2.split(" ")

    for(let s2Item of s2Array){
      if(!s1.includes(s2Item)){
        return false
      }
    }

    return isAllInclude
  }

  clean(search: string): string{
    let cleanSearch = search

    cleanSearch = cleanSearch.replace(/\s{2,}/g, " ")

    /* Espace à la fin/début */
    .replace(/^\s/, "").replace(/\s$/, "")


    return cleanSearch
  }

  uglify(search: string): string{
    let uglifyString = search

    /* Espace en trop */
    uglifyString = uglifyString.replace(/\s{2,}/g, " ")

    /* Espace à la fin/début */
    .replace(/^\s/, "").replace(/\s$/, "")

    /* Accent */
    .normalize("NFD").replace(/[\u0300-\u036f]/g, "")

    /* Majuscule */
    .toLowerCase()


    return uglifyString
  }



}
