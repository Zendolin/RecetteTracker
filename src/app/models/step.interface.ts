import { EventEmitter } from '@angular/core';

export interface Step{
    data: any
    canNext: EventEmitter<boolean>
} 