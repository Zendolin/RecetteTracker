import { Directive, ViewContainerRef } from '@angular/core';

@Directive({
  selector: '[appMakeit]'
})
export class MakeitDirective {

  constructor(public viewContainerRef: ViewContainerRef) { }

}
