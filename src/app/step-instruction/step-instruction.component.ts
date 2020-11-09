import { Component, EventEmitter, Input, OnDestroy, OnInit, Output } from '@angular/core';
import { Step } from '../models/step.interface';

@Component({
  selector: 'app-step-instruction',
  templateUrl: './step-instruction.component.html',
  styleUrls: ['./step-instruction.component.scss']
})
export class StepInstructionComponent implements OnInit, OnDestroy, Step {
  @Input() data: any
  @Output() canNext: EventEmitter<boolean> = new EventEmitter<boolean>()
  count: number = 0
  
  constructor() { }
 

  ngOnInit(): void {
    this.canNext.emit(false)
  }

  ngOnDestroy(): void {
    this.canNext.emit(false)
  }

  onCheck(event){
    if(event.target.checked){
      this.count++
    }
    else{
      this.count--
    }

    this.canNext.emit(this.count === this.data.instructions.length)
  }

}
