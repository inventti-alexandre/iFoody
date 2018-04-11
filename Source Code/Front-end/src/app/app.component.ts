import { ActivatedRoute, Router } from '@angular/router';
import { MatCheckboxModule } from '@angular/material';
import { Component, AfterViewChecked } from '@angular/core';
declare var currentPositionGlobal: any;

@Component({
    selector: 'app-root',
    templateUrl: './app.component.html',
    styleUrls: ['./app.component.css',]
})
export class AppComponent  {
    constructor (private route:ActivatedRoute, private router: Router) {
        route.queryParams.subscribe();
    }
}
