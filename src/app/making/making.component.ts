import { Component, ComponentFactoryResolver, OnInit, Type, ViewChild } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { MakeitDirective } from '../directives/makeit.directive';
import { Recipe } from '../models/recipe.model';
import { StepItem } from '../models/step-item.model';
import { Step } from '../models/step.interface';
import { RecipeService } from '../services/recipe.service';
import { StepFinalComponent } from '../step-final/step-final.component';
import { StepIngredientComponent } from '../step-ingredient/step-ingredient.component';
import { StepInstructionComponent } from '../step-instruction/step-instruction.component';

@Component({
  selector: 'app-making',
  templateUrl: './making.component.html',
  styleUrls: ['./making.component.scss']
})
export class MakingComponent implements OnInit {
  recipe: Recipe
  currentStep: number = 0
  steps: StepItem[] = []


  isEnabled: boolean

  @ViewChild(MakeitDirective, {static: true}) appMakeIt: MakeitDirective

  constructor(private componentFactoryResolver: ComponentFactoryResolver,
              private route: ActivatedRoute,
              private recipeService: RecipeService) { }

  ngOnInit(): void {
    this.recipe = new Recipe("", [], [])
    const id = this.route.snapshot.params["id"]
    this.recipeService.getRecipe(+id).then(
      (recipe: Recipe) => {
        this.recipe = recipe
        this.initStep()
        this.loadStep()
      }
    )

  }

  initStep(){
    this.steps = [
      new StepItem(StepIngredientComponent, {ingredients: this.recipe.ingredients}),
      new StepItem(StepInstructionComponent, {instructions: this.recipe.instructions}),
      new StepItem(StepFinalComponent, {photo: this.recipe.photo})
    ]
     
  }

  loadStep(){
    const stepItem = this.steps[this.currentStep]
    const componentFactory = this.componentFactoryResolver.resolveComponentFactory(stepItem.component)

    const viewContainerRef = this.appMakeIt.viewContainerRef
    viewContainerRef.clear()

    const componentRef = viewContainerRef.createComponent<Step>(componentFactory)
    componentRef.instance.data = stepItem.data
    componentRef.instance.canNext.subscribe(
      (state: boolean) => {
        this.isEnabled = state
      }
    )
  }


  onMove(state: string){
    const oldStep = this.currentStep

    if(state == "next" && this.currentStep < (this.steps.length - 1)){
      this.currentStep++
    }

    if(state == "previous" && this.currentStep > 0){
      this.currentStep--
    }

    if(oldStep != this.currentStep){
      this.loadStep()
    }
    
  }







}

