import { NgbModule } from '@ng-bootstrap/ng-bootstrap'; // For Angular Material
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
import 'hammerjs'; // For Angular Material

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule, // For Angular Material. Just need to add elementModule to children Module
    AppRoutingModule,
    AdminModule,
    CoreModule,
    MembershipModule,
    SearchingModule,
    SharedModule,
    UploadingModule,
    NgbModule.forRoot()  // For Angular Material
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
