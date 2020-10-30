import { Component, OnInit } from '@angular/core';
import { FormArray, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Recipe } from '../models/recipe.model';
import { RecipeService } from '../services/recipe.service';

@Component({
  selector: 'app-recipe-form',
  templateUrl: './recipe-form.component.html',
  styleUrls: ['./recipe-form.component.scss']
})
export class RecipeFormComponent implements OnInit {

  recipeForm: FormGroup
  success: boolean = false
  fileToUpload: File
  fileUrl: string

  constructor(private formBuilder: FormBuilder,
              private recipeService: RecipeService,
              private router: Router) { }

  ngOnInit(): void {
    this.initForm()
  }


  initForm(){
    this.recipeForm = this.formBuilder.group({
      name: ["", Validators.required],
      ingredients: this.formBuilder.array([]),
      instructions: this.formBuilder.array([])
    })
  }

  onSubmitForm(){
    const formValue = this.recipeForm.value
    const newRecipe = new Recipe(
      formValue["name"],
      formValue["ingredients"] ? formValue["ingredients"] : [],
      formValue["instructions"] ? formValue["instructions"] : []
    )
    newRecipe.isValidated = false
    
    if(this.fileToUpload){
      this.recipeService.uploadFile(this.fileToUpload).then(
        (url: string) => {
          newRecipe.photo = url
        }
      ).then(
        () => {
          this.recipeService.addRecipe(newRecipe)
        }
      )
    }
    else{
      this.recipeService.addRecipe(newRecipe)
    }

    this.success = true

    setTimeout(
      () => {
          this.success = false
          this.router.navigate(['/'])
      }, 2000
    )
  }


  getIngredientsControls(): FormArray{
    return this.recipeForm.get("ingredients") as FormArray
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

  getInstructionsControls(): FormArray{
    return this.recipeForm.get("instructions") as FormArray
  }

  onAddInstruction(){
    const newInstructionControl = this.formBuilder.control(null, Validators.required)
    this.getInstructionsControls().push(newInstructionControl)
  }

  onRemoveInstruction(index: number){
    this.getInstructionsControls().removeAt(index)
  }

  onSelectMeasure(){
    return this.recipeService.getMeasure()
  }

  detectFiles(event){
    this.fileToUpload = event.target.files[0]
  }
}
