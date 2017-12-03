import { ActivatedRoute, NavigationEnd, Params, PRIMARY_OUTLET, Router , RouterModule} from '@angular/router';
import { IBsBreadcrumb } from './../../models/allModel';
import { Component, OnInit } from '@angular/core';
import 'rxjs/add/operator/filter';

@Component({
    // tslint:disable-next-line:component-selector
    selector: 'bs-breadcrumb',
    templateUrl: './bs-breadcrumb.component.html',
    styleUrls: ['./bs-breadcrumb.component.css']
})
export class BsBreadcrumbComponent implements OnInit {
    
    public breadcrumbs: IBsBreadcrumb[];

    constructor(
        private activatedRoute: ActivatedRoute,
        private router: Router
    ) {
        this.breadcrumbs = [];
    }

    ngOnInit() {
        const ROUTE_DATA_BREADCRUMB = 'breadcrumb';

        // subscribe to the NavigationEnd event
        this.router.events.filter(event => event instanceof NavigationEnd).subscribe(event => {
            // set breadcrumbs
            let root: ActivatedRoute = this.activatedRoute;
            this.breadcrumbs = this.getBreadcrumbs(root);
          });
    }

    private getBreadcrumbs(route: ActivatedRoute, url: string='', breadcrumbs: IBsBreadcrumb[]= []): IBsBreadcrumb[] {
        const ROUTE_DATA_BREADCRUMB = "breadcrumb";
        // get the child routes
        let children: ActivatedRoute[] = route.children;

        if (children.length === 0) {
            return breadcrumbs;
        }

        for (let child of children) {

            // Don't need to care another child but primary
            if (child.outlet !== PRIMARY_OUTLET) {
                continue;
            }

            // Just care child has 'breadcrumb' string property
            if (!child.snapshot.data.hasOwnProperty(ROUTE_DATA_BREADCRUMB)) {
                return this.getBreadcrumbs(child, url, breadcrumbs);
            }

            // get current URL
            let routeURL: string = child.snapshot.url.map( segment  => segment.path).join('/');

            // prefix routerURL with '/'
            url += `/${routeURL}`;

            // create Breadcrumb object and assign to it
            let breadcrumb: IBsBreadcrumb = {
                label: child.snapshot.data[ROUTE_DATA_BREADCRUMB],
                params: child.snapshot.params,
                url: url
            };

            // push object to array
            breadcrumbs.push(breadcrumb);

            // do this to other children
            return this.getBreadcrumbs(child, url, breadcrumbs);



        }
        // return breadcrumbs;
    }

}
