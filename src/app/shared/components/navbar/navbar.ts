import {Component, inject, OnInit} from '@angular/core';
import {NgOptimizedImage} from '@angular/common';
import {Router} from '@angular/router';
import {AuthService} from '@core/services/auth-service';
import {ROUTES_ENUM} from '@shared/enums/routes.enum';

@Component({
  selector: 'app-navbar',
  imports: [
    NgOptimizedImage
  ],
  templateUrl: './navbar.html',
  styleUrl: './navbar.css',
  standalone: true,
})
export class Navbar {
  logoSrc: string = '/assets/images/logos/logo-cat-head.png';

  private readonly authService = inject(AuthService);
  private readonly router = inject(Router);

  toProfile(): void {
    let userId: string | null = localStorage.getItem('user_id');
    if (userId) {
      this.router.navigate([ROUTES_ENUM.userProfile(userId)]);
    }
  }

  logout(): void {
    this.authService.logout();
    this.router.navigate(['/login']);
  }
}
