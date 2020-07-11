import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {AuthComponent} from "./auth/auth.component";
import {DocumentComponent} from "./document/document.component";
import {DashboardComponent} from "./dashboard/dashboard.component";
import {LogoutComponent} from "./logout/logout.component";
import {AuthGuardService} from "./auth-guard.service";

const routes: Routes = [
  {path: '', component: DashboardComponent},
  {path: 'auth', component: AuthComponent},
  {path: 'document', component: DocumentComponent, canActivate: [AuthGuardService]},
  {path: 'auth', component: AuthComponent},
  {path: 'logout', component: LogoutComponent, canActivate: [AuthGuardService]},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
