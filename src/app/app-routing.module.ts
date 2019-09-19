import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { LoginComponent } from './components/login/login.component';
import { RegisterComponent } from './components/register/register.component';
import { HomeComponent } from './components/home/home.component';
import { DashboardComponent } from './components/dashboard/dashboard.component';
import { HistoryComponent } from './components/history/history.component';
import { AuthGuard } from './services/guards/auth.guard';
import { RoleGuard } from './services/guards/role.guard';
import { ProfileComponent } from './components/profile/profile.component';
  


const routes: Routes = [
  {path:'login', component: LoginComponent, canActivate:[AuthGuard]},
  {path:'register', component: RegisterComponent},
  { path: '', redirectTo: '/login', pathMatch: 'full'},
  
];

const dashboardRoutes  = [
  {
    path: 'dashboard',
    component: DashboardComponent,
    canActivate: [RoleGuard],
    data: {role: 1},
    children: [
      {
        path: 'home', component: HomeComponent
      },
      {
        path: 'history', component: HistoryComponent
      },
      {
        path: 'profile', component: ProfileComponent
      },
      {
        path: '', redirectTo: 'home', pathMatch: 'full'
      },
      { path: '**', redirectTo: 'home'}
    ], 
  },
  { path: '**', redirectTo: 'login'}
]

@NgModule({
  imports: [RouterModule.forRoot(routes),
  RouterModule.forChild(dashboardRoutes)],
  providers:[AuthGuard,RoleGuard],
  exports: [RouterModule]
})
export class AppRoutingModule { }
