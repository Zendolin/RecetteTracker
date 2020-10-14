import { Component, OnInit } from '@angular/core';
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

  recipes: Recipe[]
  recipesSubscription: Subscription

  constructor(private recipesService: RecipeService) { 
    
  }

  ngOnInit(): void {
    this.recipesSubscription = this.recipesService.recipesSubject.subscribe(
      (recipes: Recipe[]) => {
        this.recipes = recipes
      }
    )
    this.recipesService.emitRecipes()
  }

  ngOnDestroy(){
    this.recipesSubscription.unsubscribe()
  }



}
