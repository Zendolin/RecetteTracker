import { Component, OnInit } from '@angular/core';
import { FormArray, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Recipe } from '../models/recipe.model';
import { RecipeService } from '../services/recipe.service';

@Component({
  selector: 'app-review-detail',
  templateUrl: './review-detail.component.html',
  styleUrls: ['./review-detail.component.scss']
})
export class ReviewDetailComponent implements OnInit {
  recipe: Recipe
  reviewForm: FormGroup
  isValidated: boolean
  isDeleted: boolean
  id: number

  constructor(private recipeService: RecipeService,
              private formBuilder: FormBuilder,
              private route: ActivatedRoute,
              private router: Router) { }

  ngOnInit(): void {
    this.recipe = new Recipe("", [], [])
    this.id = this.route.snapshot.params["id"]
    this.recipeService.getRecipe(+this.id).then(
      (recipe: Recipe) => {
        this.recipe = recipe
        this.initForm()
      }
    )
  }

  initForm(){
    let ingredientArray: FormArray = new FormArray([])
    if(this.recipe.ingredients){
      for(let ingredient of this.recipe.ingredients){
        ingredientArray.push(this.formBuilder.group({
          name: [ingredient.name, Validators.required],
          quantity: [ingredient.quantity, Validators.required],
          measure: [ingredient.measure]
        }))
      }
    }

    let instructionArray : FormArray = new FormArray([])
    if(this.recipe.instructions){
      for(let instruction of this.recipe.instructions){
        instructionArray.push(this.formBuilder.control(instruction, Validators.required))
      }
    }
    

    this.reviewForm = this.formBuilder.group({
      name: [this.recipe.name, Validators.required],
      ingredients: ingredientArray,
      instructions: instructionArray
    })

    
  }

  getIngredientsControls(): FormArray{
    return this.reviewForm.get("ingredients") as FormArray
  }

  getInstructionsControls(): FormArray{
    return this.reviewForm.get("instructions") as FormArray
  }

  onValidateRecipe(){
    const formValue = this.reviewForm.value
    const newRecipe = new Recipe(
      formValue["name"],
      formValue["ingredients"] ? formValue["ingredients"] : [],
      formValue["instructions"] ? formValue["instructions"] : []
    )
    newRecipe.isValidated = true
    newRecipe.date = Date.now()
    this.recipeService.updateRecipe(this.id, newRecipe)
    
    setTimeout(
      () => {
          this.isValidated = true
          this.router.navigate(['/'])
      }, 2000
    )

  }

  onDeleteRecipe(){
    this.recipeService.deleteRecipe(this.id)

    setTimeout(
      () => {
          this.isDeleted = true
          this.router.navigate(['/'])
      }, 2000
    )
  }

  onSelectMeasure(){
    return this.recipeService.getMeasure()
  }

  onAddIngredient(){
    const newIngredientControl = this.formBuilder.group({
      name: ["", Validators.required],
      quantity: ["", [Validators.required, Validators.pattern("^[0-9]+$"), Validators.min(1)]],
      measure: [""]
    })
    this.getIngredientsControls().push(newIngredientControl)
  }

  onRemoveIngredient(index: number){
    this.getIngredientsControls().removeAt(index)
  }

  onAddInstruction(){
    const newInstructionControl = this.formBuilder.control(null, Validators.required)
    this.getInstructionsControls().push(newInstructionControl)
  }

  onRemoveInstruction(index: number){
    this.getInstructionsControls().removeAt(index)
  }
}
