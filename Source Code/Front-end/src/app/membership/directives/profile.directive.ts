import { Directive, ViewContainerRef} from '@angular/core';

@Directive({
    selector: 'profile-host'
})

export class ProfileDirective {

  constructor(public viewContainerRef: ViewContainerRef) { }
    
}
