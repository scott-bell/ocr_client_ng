import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { FileUploadComponent } from './file-upload/file-upload.component';
import { ParamInputComponent } from './param-input/param-input.component';
import {FormsModule} from "@angular/forms";
import {HttpClient, HttpClientModule, HttpHandler} from "@angular/common/http";
import {RouterModule, Routes} from "@angular/router";
import {LoadingSpinnerComponent} from "./shared/loading-spinner/loading-spinner.component";
import {BrowserAnimationsModule} from "@angular/platform-browser/animations";
import { DocumentComponent } from './document/document.component';
import { HeaderComponent } from './header/header.component';
import {AlertComponent} from "./shared/alert/alert.component";
import {SuccessAlertComponent} from "./shared/success/success.component";
import {LoadingSpinnerSmallComponent} from "./shared/loading-spinner-small/loading-spinner-small.component";

@NgModule({
  declarations: [
    AppComponent,
    FileUploadComponent,
    ParamInputComponent,
    LoadingSpinnerComponent,
    LoadingSpinnerSmallComponent,
    DocumentComponent,
    HeaderComponent,
    AlertComponent,
    SuccessAlertComponent
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    AppRoutingModule,
    FormsModule,
    HttpClientModule
  ],
  providers: [
    HttpClient
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
