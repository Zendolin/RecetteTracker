import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { Step } from '../models/step.interface';

@Component({
  selector: 'app-step-final',
  templateUrl: './step-final.component.html',
  styleUrls: ['./step-final.component.scss']
})
export class StepFinalComponent implements OnInit, Step {
  @Input() data: any
  @Output() canNext: EventEmitter<boolean> = new EventEmitter<boolean>()



  constructor() { }

  ngOnInit(): void {
  }

}
