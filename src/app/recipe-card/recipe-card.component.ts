import { Component, Input, OnInit } from '@angular/core';
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

  constructor() { }

  ngOnInit(): void {
  }

}
