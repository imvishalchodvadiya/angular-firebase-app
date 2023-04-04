import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { LoginComponent } from './auth/login/login.component';
import { HomeComponent } from './home/home/home.component';
import { ManageContentDashboardComponent } from './manage-content/manage-content-dashboard/manage-content-dashboard.component';
import { AddOpportunitiesComponent } from './manage-content/add-opportunities/add-opportunities.component';
import { AuthGuard } from './auth/auth.guard';
import { ShowallopportunitiesComponent } from './manage-content/showallopportunities/showallopportunities.component';
import { ShowalleventsComponent } from './manage-content/showallevents/showallevents.component';
import { ManageDashboardComponent } from './manage-user/manage-dashboard/manage-dashboard.component';
import { ChangepasswordComponent } from './auth/changepassword/changepassword.component';
import { AlluserComponent } from './manage-user/alluser/alluser.component';

const routes: Routes = [
   { path: '', component: HomeComponent,canActivate: [AuthGuard] },
   { path: 'home', component: HomeComponent,canActivate: [AuthGuard] },
   { path: 'managecontent', component: ManageContentDashboardComponent, canActivate: [AuthGuard] },
   { path: 'addopportunities', component: AddOpportunitiesComponent, canActivate: [AuthGuard] },
   { path: 'allopportunities', component: ShowallopportunitiesComponent, canActivate: [AuthGuard] },
   { path: "edit/:oppId", component: AddOpportunitiesComponent, canActivate: [AuthGuard] },
   { path: 'allevents', component: ShowalleventsComponent, canActivate: [AuthGuard] },
   { path: 'manageuser', component: ManageDashboardComponent, canActivate: [AuthGuard] },
   { path: 'alluser', component: AlluserComponent, canActivate: [AuthGuard] },
   { path: 'userprofile/:proId', component: ManageDashboardComponent, canActivate: [AuthGuard] },
   { path: 'forgotpassword', component: ChangepasswordComponent },
   { path: 'login', component: LoginComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
  providers: [AuthGuard]
})
export class AppRoutingModule { }
