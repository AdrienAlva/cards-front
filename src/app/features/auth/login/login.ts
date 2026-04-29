import { Component, inject } from '@angular/core';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { Card, CardModule } from 'primeng/card';
import { InputTextModule } from 'primeng/inputtext';
import { PasswordModule } from 'primeng/password';
import { ButtonModule } from 'primeng/button';
import { AuthService } from '@core/services/auth-service';
import {Router, ROUTES} from '@angular/router';
import { Toast } from 'primeng/toast';
import { MessageService } from 'primeng/api';
import { UserService } from '@core/services/user-service';
import { switchMap } from 'rxjs';
import {ROUTES_ENUM} from '@shared/enums/routes.enum';

@Component({
  selector: 'app-login',
  imports: [
    Card,
    ReactiveFormsModule,
    InputTextModule,
    PasswordModule,
    ButtonModule,
    CardModule,
    Toast
  ],
  templateUrl: './login.html',
  styleUrl: './login.css',
  standalone: true,
  providers: [MessageService]
})
export class Login {
  private readonly fb = inject(FormBuilder);
  private readonly authService = inject(AuthService);
  private readonly userService = inject(UserService);
  private readonly router = inject(Router);
  private readonly messageService = inject(MessageService);

  readonly loginForm = this.fb.group({
    username: ['', [Validators.required]],
    password: ['', [Validators.required]]
  });

  login() {
    if (this.loginForm.invalid) {
      this.loginForm.markAllAsTouched();
      return;
    }

    const { username, password } = this.loginForm.getRawValue();

    if (username != null && password != null) {
      this.authService.login({ username, password }).pipe(
        switchMap((response) => {
          console.log(response)
          this.authService.setToken(response.token);
          return this.userService.getUser(response.user_id);
        })
      ).subscribe({
        next: (user) => {
          console.log('Utilisateur chargé :', user);
          this.userService.setUser(user);
          this.router.navigate([ROUTES_ENUM.dashboard()]);
        },
        error: (error) => {
          console.error('Erreur pendant login/getUser :', error);
          console.error('HTTP status :', error?.status);
          console.error('HTTP message :', error?.message);
          console.error('HTTP error body :', error?.error);

          this.messageService.add({
            severity: 'error',
            summary: 'Échec de connexion',
            detail: 'Identifiant ou mot de passe incorrect.',
            life: 6000
          });
        }
      });
    }
  }
}
