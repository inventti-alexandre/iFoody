import { StoreDetailInfoComponent } from './searching/components/store-detail/store-detail-info/store-detail-info.component';
import { StoreDetailComponent } from './searching/components/store-detail/store-detail.component';
import { AuthGuardService as AuthGuard } from './shared/services/auth-guard.service';
import { UserProfileComponent } from './membership/components/user/user-profile/user-profile.component';
import { AdminComponent } from './admin/admin/admin.component';
import { AdminLayoutComponent } from './admin/admin-layout/admin-layout.component';
import { ProductDetailComponent } from './searching/components/product-detail/product-detail.component';
import { ProfileComponent } from './membership/components/shared/profile-layout/profile.component';
import { SearchResultComponent } from './searching/components/search-result/search-result.component';
import { OpenStoreComponent } from './membership/components/shared/open-store/open-store.component';
import { SignupComponent } from './membership/components/shared/signup/signup.component';
import { LoginComponent } from './membership/components/shared/login/login.component';
import { HomeComponent } from './core/components/home/home.component';
import { NotFoundComponent } from './shared/components/not-found/not-found.component';
import { ProductItemComponent } from './shared/components/product-item/product-item.component';
import { BsPaginationComponent } from './shared/components/bs-pagination/bs-pagination.component';
import { BsBreadcrumbComponent } from './shared/components/bs-breadcrumb/bs-breadcrumb.component';
import { Routes, RouterModule } from '@angular/router';
import { NgModule } from '@angular/core';
import {ProductUploadComponent} from './uploading/product-upload/product-upload.component';

//  routing configuration const
const routes: Routes = [
    {
        path: 'home',
        component: HomeComponent
    },
    {
        path: 'login',
        component: LoginComponent
    },
    {
        path: 'signup',
        component: SignupComponent
    },
    {
        path: 'open-store',
        component: OpenStoreComponent
    },
    {
        path: 'search',
        component: SearchResultComponent
    },
    {
        path: 'profile/:id/:option',
        component: ProfileComponent,

    },
    {
        path: 'product/:id',
        component: ProductDetailComponent
    },
    {
        path: 'admin',
        component: AdminComponent
    },
    {
        path: 'auth-guard',
        component: ProfileComponent,
        canActivate: [AuthGuard]
    },
    {
        path:'user/:name/upload',
        component: ProductUploadComponent,
    },
    {
        path:'store/:id',
        component: StoreDetailComponent,
    },
    {
        path: '',
        redirectTo: '/home',
        pathMatch: 'full'
        // 'full' property to match exactly the same with URL (another is 'prefix'  - not recommend)
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
