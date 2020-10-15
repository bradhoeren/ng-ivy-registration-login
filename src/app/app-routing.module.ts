import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { CinfoComponent } from './cinfo/cinfo.component';
import { CustomerDetailComponent } from './customer-detail/customer-detail.component';

import { HomeComponent } from './home/home.component';
import { LoginComponent } from './login/login.component';
import { RegisterComponent } from './register/register.component';
import { AuthGuard } from './_helpers/auth.guard';

const routes: Routes = [
  { path: '', component: HomeComponent, canActivate: [AuthGuard] },
  { path: 'login', component: LoginComponent },
  { path: 'cinfo', component: CinfoComponent },
  { path: 'register', component: RegisterComponent },
  { path: 'customer-detail', component: CustomerDetailComponent },

  // otherwise redirect to home
  { path: '**', redirectTo: '' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { };