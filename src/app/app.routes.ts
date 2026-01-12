import { Routes } from '@angular/router';
import { ProductsComponent } from './pages/products/products';
import { LoginComponent } from './component/login/login.component';
import { RegisterComponent } from './component/register/register.component';
import { Dashboard } from './pages/dashboard/dashboard';
import { ProfileComponent } from './pages/profile/profile.component';
import { authGuard } from './guards/auth.guard';
import { Produk } from './pages/produk/produk';
import { AboutComponent } from './pages/about/about';

export const routes: Routes = [
  // Jika alamat kosong, ke login
  { path: '', redirectTo: 'login', pathMatch: 'full' },

  // Halaman Public
  { path: 'login', component: LoginComponent },
  { path: 'register', component: RegisterComponent },

  // Halaman Private
  {
    path: 'dashboard',
    component: Dashboard,
    canActivate: [authGuard],
  },
  { path: 'products', 
    component: ProductsComponent,
    canActivate: [authGuard],},

  {
    path: 'profile', 
    component: ProfileComponent, 
    canActivate: [authGuard], 
  },
  {
    path: 'about', 
    component: AboutComponent, 
    canActivate: [authGuard], 
  },

  // Wildcard: Paling bawah, untuk menangkap alamat ngawur
  { path: '**', redirectTo: 'login' },
];