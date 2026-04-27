import {inject, Injectable, signal} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { endpoints } from 'src/app/shared/enums/api/api-endpoints';
import {Observable} from 'rxjs';

@Injectable({ providedIn: 'root' })
export class AuthService {

  private readonly http = inject(HttpClient);

  private readonly tokenKey = 'access_token';
  private readonly authenticated = signal<boolean>(this.hasValidToken());

  get isAuthenticated() {
    return this.authenticated();
  }

  setToken(token: string): void {
    localStorage.setItem(this.tokenKey, token);
    this.authenticated.set(true);
  }

  getToken(): string | null {
    return localStorage.getItem(this.tokenKey);
  }

  logout(): void {
    localStorage.removeItem(this.tokenKey);
    this.authenticated.set(false);
  }

  hasValidToken(): boolean {
    const token = this.getToken();
    if (!token) return false;

    try {
      const payload = JSON.parse(atob(token.split('.')[1]));
      const exp = payload.exp * 1000;
      return Date.now() < exp;
    } catch {
      return false;
    }
  }

  login(credentials: { username: string; password: string }): Observable<{token:string, user_id: string}> {
    return this.http.post<{ token: string, user_id: string }>(
      `${environment.apiUrl}${endpoints.LOGIN}`, credentials
    );
  }

}
