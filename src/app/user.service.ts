import { HttpClient } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';
import { Observable, map } from 'rxjs';
import { User, UserResponseData } from './models/user';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  constructor() { }

  private readonly http = inject(HttpClient);

  public getUsers (): Observable<User[]> {
    return this.http.get<UserResponseData[]>('https://jsonplaceholder.typicode.com/users')
    .pipe(
      map(users => {
        return users.map(user => {
          return {
            ...user,
            address: user.address.city,
          };
        });
      })
    );
  }
}
