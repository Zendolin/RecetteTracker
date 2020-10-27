import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { Recipe } from '../models/recipe.model';
import { RecipeService } from '../services/recipe.service';

@Component({
  selector: 'app-review-list',
  templateUrl: './review-list.component.html',
  styleUrls: ['./review-list.component.scss']
})
export class ReviewListComponent implements OnInit {

  recipes: Recipe[]
  recipesSubscription: Subscription

  constructor(private recipesService: RecipeService,
              private router: Router) { }

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

  onViewReview(id: number){
    this.router.navigate(["/review", id])
  }

}
