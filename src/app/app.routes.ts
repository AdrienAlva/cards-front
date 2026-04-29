import { Routes } from '@angular/router';
import {Login} from '@features/auth/login/login';
import {authGuard} from '@core/guards/auth-guard';

export const routes: Routes = [
  {
    path: '',
    redirectTo: 'login',
    pathMatch: 'full',
  },
  {
    path: 'login',
    component: Login,
  },
  {
    path: 'dashboard',
    canActivate: [authGuard],
    loadComponent: () => import('./features/dashboard/dashboard').then(m => m.Dashboard),
  },
  {
    path: 'user-profile/:id',
    loadComponent: () => import('./features/user-profile/user-profile').then((m) => m.UserProfile)
  }
];
