import { HashLocationStrategy } from '@angular/common/src/location/hash_location_strategy';
import { LocationStrategy } from '@angular/common/src/location/location_strategy';
import { ProfileDirective } from './membership/directives/profile.directive';
import { MdDatepickerModule, MdNativeDateModule } from '@angular/material';
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

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule, // For Angular Material. Just need to add elementModule to children Module
    AdminModule,
    CoreModule,
    MembershipModule,
    SearchingModule,
    SharedModule,
    UploadingModule,
    // NgbModule.forRoot(),  // For Angular Material
    MdDatepickerModule,
    MdNativeDateModule,
    AppRoutingModule,
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
