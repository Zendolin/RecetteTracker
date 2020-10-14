import { Component, Input, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Ingredient, Recipe } from '../models/recipe.model';

@Component({
  selector: 'app-recipe-card',
  templateUrl: './recipe-card.component.html',
  styleUrls: ['./recipe-card.component.scss']
})
export class RecipeCardComponent implements OnInit {

  @Input() name: string
  @Input() ingredients: Ingredient[]
  @Input() instructions: string[]
  @Input() id: number

  constructor(private router: Router) { }

  ngOnInit(): void {
  }

  onViewRecipe(id: number){
    this.router.navigate(["/recipes", "view", id])
  }


}
