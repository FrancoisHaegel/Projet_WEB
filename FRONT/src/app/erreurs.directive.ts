import { Directive, ElementRef } from '@angular/core';

@Directive({
  selector: '[fieldError]'
})
export class ErreursDirective {

  constructor(private el: ElementRef) {
    this.el.nativeElement.style.color = 'red';
   }

}
