import { ActivatedRoute, Router } from '@angular/router';
import { MdCheckboxModule } from '@angular/material';
import { Component } from '@angular/core';
import {MatCheckboxModule} from '@angular/material';

@Component({
    selector: 'app-root',
    templateUrl: './app.component.html',
    styleUrls: ['./app.component.css',]
})
export class AppComponent {
    constructor (private route:ActivatedRoute, private router: Router) {
        route.queryParams.subscribe();
    }
}
