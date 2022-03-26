import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { DatosComponent } from './components/datos/datos.component';
import { AuthRoleAdminGuard } from './guards/auth-role-admin.guard';
import { AuthRoleModeratorGuard } from './guards/auth-role-moderator.guard';
import { LoginComponent } from './shared/login/login.component';
import { RegisterComponent } from './shared/register/register.component';

const routes: Routes = [
  {
    path: 'datos',
    component: DatosComponent,
    canActivate: [AuthRoleModeratorGuard, AuthRoleAdminGuard]
  },
  {
    path: 'login',
    component: LoginComponent,
  },
  {
    path: 'register',
    component: RegisterComponent,
  },
  {
    path: '**',
    redirectTo: 'login',
    pathMatch: 'full'
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
