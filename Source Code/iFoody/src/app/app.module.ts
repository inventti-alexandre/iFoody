import { AppRoutingModule } from './app.routing';
import { RouterModule } from '@angular/router';
import { UploadingModule } from './uploading/uploading.module';
import { SharedModule } from './shared/shared.module';
import { SearchingModule } from './searching/searching.module';
import { MembershipModule } from './membership/membership.module';
import { CoreModule } from './core/core.module';
import { AdminModule } from './admin/admin.module';
import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { AppComponent } from './app.component';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    AdminModule,
    CoreModule,
    MembershipModule,
    SearchingModule,
    SharedModule,
    UploadingModule,
    NgbModule.forRoot()
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
