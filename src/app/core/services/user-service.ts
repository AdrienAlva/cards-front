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

  getUser(userId: string): Observable<User> {
    return this.http.get<User>(
      `${environment.apiUrl}${endpoints.LOGIN}` + '/' + userId
    );
  }

}
