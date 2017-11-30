import { AuthGuardService as AuthGuard } from './shared/services/auth-guard.service';
import { AuthService } from './shared/services/auth.service';
import { ProductService } from './shared/services/product.service';
import { HashLocationStrategy } from '@angular/common/src/location/hash_location_strategy';
import { LocationStrategy } from '@angular/common/src/location/location_strategy';
import { ProfileDirective } from './membership/directives/profile.directive';
import { MatDatepickerModule, MatNativeDateModule } from '@angular/material';
// import { NgbModule } from '@ng-bootstrap/ng-bootstrap'; // For Angular Material
import { AppRoutingModule } from './app.routing';
import { RouterModule } from '@angular/router';
import { UploadingModule } from './uploading/uploading.module';
import { SharedModule } from './shared/shared.module';
import { SearchingModule } from './searching/searching.module';
import { MembershipModule } from './membership/membership.module';
import { CoreModule } from './core/core.module';
import { AdminModule } from './admin/admin.module';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations'; // For Angular Material
import { NoopAnimationsModule } from '@angular/platform-browser/animations'; // For Angular Material
import { NgModule } from '@angular/core';
import { AppComponent } from './app.component';
import 'hammerjs';
import { ROUTER_PROVIDERS } from '@angular/router/src/router_module';
import { TestComponent } from './test/test.component';
import { UserService } from './shared/services/user.service';
import { BsDropdownModule } from 'ngx-bootstrap/dropdown';

@NgModule({
  declarations: [
    AppComponent,
    TestComponent
  ],
  imports: [
    BrowserModule,
    // BrowserAnimationsModule, // For Angular Material. Just need to add elementModule to children Module
    // The above Module cause New Component still append to old Component, not refresh.
    AdminModule,
    CoreModule,
    MembershipModule,
    SearchingModule,
    SharedModule,
    UploadingModule,
    // NgbModule.forRoot(),  // For Angular Material
    MatDatepickerModule,
    MatNativeDateModule,
    AppRoutingModule,
    BsDropdownModule.forRoot()
  ],
  providers: [
    UserService,
    ProductService,
    AuthService,
    AuthGuard
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
