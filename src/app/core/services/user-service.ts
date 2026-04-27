import {inject, Injectable} from '@angular/core';
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

  getUser(userId: string): Observable<User> {
    const url = `${environment.apiUrl}${endpoints.USERS}/${userId}`;
    return this.http.get<User>(url);
  }

}
