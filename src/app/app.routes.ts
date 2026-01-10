import { Routes } from '@angular/router';
import { LoginComponent } from './component/login/login.component';
import { RegisterComponent } from './component/register/register.component';
import { Dashboard } from './pages/dashboard/dashboard';
import { ProfileComponent } from './pages/profile/profile.component'; // Import Baru
import { authGuard } from './guards/auth.guard';

export const routes: Routes = [
  { path: '', redirectTo: 'login', pathMatch: 'full' },
  { path: 'login', component: LoginComponent },
  { path: 'register', component: RegisterComponent },
  {
    path: 'dashboard',
    component: Dashboard,
    canActivate: [authGuard],
  },
  {
    path: 'profile', // Route Baru
    component: ProfileComponent,
    canActivate: [authGuard],
  },
  { path: '**', redirectTo: 'login' },
];
