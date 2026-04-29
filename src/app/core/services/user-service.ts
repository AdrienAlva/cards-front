import {inject, Injectable, signal, WritableSignal} from '@angular/core';
import {User} from '@shared/models/user';
import {environment} from '../../../environments/environment';
import {endpoints} from '@shared/enums/api/api-endpoints';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class UserService {
  private readonly http = inject(HttpClient);

  private readonly userIdKey = 'user_id';

  private readonly userSignal:WritableSignal<User|null> = signal<User | null>(null);


  getUser(userId: string): Observable<User> {
    const url = `${environment.apiUrl}${endpoints.USERS}/${userId}`;
    return this.http.get<User>(url);
  }

  get user(): User|null {
    return this.userSignal();
  }

  setUser(user: User): void {
    this.userSignal.set(user);
  }

  clearUser(): void {
    this.userSignal.set(null);
  }

}
