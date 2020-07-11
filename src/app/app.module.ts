import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { AuthComponent } from './auth/auth.component';
import { DocumentComponent } from './document/document.component';
import {AuthService} from "./auth/auth.service";
import { DashboardComponent } from './dashboard/dashboard.component';
import {ReactiveFormsModule} from "@angular/forms";
import { LogoutComponent } from './logout/logout.component';
import {AuthGuardService} from "./auth-guard.service";
import {DocumentService} from "./document/document.service";

@NgModule({
  declarations: [
    AppComponent,
    AuthComponent,
    DocumentComponent,
    DashboardComponent,
    LogoutComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    ReactiveFormsModule,
    CommonModule
  ],
  providers: [
    AuthService,
    AuthGuardService,
    DocumentService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
