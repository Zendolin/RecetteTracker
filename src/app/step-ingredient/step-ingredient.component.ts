import { Component, Input, OnInit, Output, EventEmitter, OnDestroy } from '@angular/core';
import { Step } from '../models/step.interface';

@Component({
  selector: 'app-step-ingredient',
  templateUrl: './step-ingredient.component.html',
  styleUrls: ['./step-ingredient.component.scss']
})
export class StepIngredientComponent implements OnInit, OnDestroy, Step {
  @Input() data: any 
  @Output() canNext: EventEmitter<boolean> = new EventEmitter<boolean>()

  count: number = 0

  constructor() { }

  ngOnInit(): void {
    this.canNext.emit(false)
  }

  ngOnDestroy(): void{
    this.canNext.emit(false)
  }

  onCheck(event){
    if(event.target.checked){
      this.count++
    }
    else{
      this.count--
    }

    this.canNext.emit(this.count === this.data.ingredients.length)
  }
  

}
