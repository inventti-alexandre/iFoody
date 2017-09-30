import { HomeComponent } from './core/components/home/home.component';
import { NotFoundComponent } from './shared/components/not-found/not-found.component';
import { ProductItemComponent } from './shared/components/product-item/product-item.component';
import { BsPaginationComponent } from './shared/components/bs-pagination/bs-pagination.component';
import { BsBreadcrumbComponent } from './shared/components/bs-breadcrumb/bs-breadcrumb.component';
import { Routes, RouterModule } from '@angular/router';
import { NgModule } from '@angular/core';

//  routing configuration const
const routes: Routes = [
    {
        path: 'bs-breadcrumb',
        component: BsBreadcrumbComponent,
        data: {
            breadcrumb: "breadcrumb"
        }
    },
    {
        path: 'pagination',
        component: BsPaginationComponent,
        data: {
            breadcrumb: "pagination"
        }
    },
    {
        path: 'product-item',
        component: ProductItemComponent,
        data: {
            breadcrumb: "product-item"
        }
    },
    { // This path is just for testing breadcrumb
        path: 'product-item1',
        component: ProductItemComponent,
        data: {
            breadcrumb: "product-item"
        },
        children: [
            {
                path: 'a', 
                component: ProductItemComponent,
                data: {
                    breadcrumb: "home"
                },
                children: [
                    {
                        path: 'a1', 
                        component: ProductItemComponent,
                        data: {
                            breadcrumb: "library"
                        }
                    }
                ]
            },
            { 
                path: 'b', 
                component: BsPaginationComponent,
                data: {
                    breadcrumb: "b"
                },
            },
            { path: 'c', component: BsPaginationComponent }
          ]
    },
    {
        path: '**',
        component: NotFoundComponent
    },
];
@NgModule({
    imports: [
        // This will return a Router Module contains routes configuration
        RouterModule.forRoot(routes)
    ],
    exports: [
        // This will expose Router Module to other Modules use it
        RouterModule
    ],
    declarations: []
})

// This is Name of Module to export
export class AppRoutingModule { }

// export const routingComponents = [BsBreadcrumbComponent, BsPaginationComponent, ProductItemComponent];
