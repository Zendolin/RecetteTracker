import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Recipe } from '../models/recipe.model';
import { RecipeService } from '../services/recipe.service';

@Component({
  selector: 'app-recipe-detail',
  templateUrl: './recipe-detail.component.html',
  styleUrls: ['./recipe-detail.component.scss']
})
export class RecipeDetailComponent implements OnInit {

  recipe: Recipe
  id: number

  constructor(private recipeService: RecipeService,
              private route: ActivatedRoute,
              private router: Router) { }

  ngOnInit(): void {
    this.recipe = new Recipe("", [], [])
    this.id = this.route.snapshot.params["id"]
    this.recipeService.getRecipe(+this.id).then(
      (recipe: Recipe) => {
        this.recipe = recipe
      }
    )
  }

  onMakeIt(){
    this.router.navigate(["/makeit", this.id])
  }

}
