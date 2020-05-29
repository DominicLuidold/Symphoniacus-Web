import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { User } from '@app/_models/user';
import { environment } from '@environments/environment';
import { BehaviorSubject, Observable } from 'rxjs';
import { map } from 'rxjs/operators';

@Injectable({ providedIn: 'root' })
export class AuthenticationService {
  private userSubject: BehaviorSubject<User>;
  public user: Observable<User>;

  constructor(private router: Router, private http: HttpClient) {
    this.userSubject = new BehaviorSubject<User>(JSON.parse(localStorage.getItem('currentUser')));
    this.user = this.userSubject.asObservable();
  }

  public get userValue(): User {
    this.logoutIfExpired();
    return this.userSubject.value;
  }

  login(username: string, password: string) {
    return this.http.post<any>(`${ environment.apiUrl }/login`, { username, password })
      .pipe(map(data => {
        // Parse JSON object from base64 encoded JWT token
        const jwtTokenData = JSON.parse(atob(JSON.stringify(data).split('.')[1]));

        // Create User object
        const user: User = {
          username: jwtTokenData.username,
          userType: jwtTokenData.userType,
          fullName: jwtTokenData.fullName,
          jwtToken: data.payload.token
        };

        // Store user details and JWT token in local storage to keep user logged in between page refreshes
        localStorage.setItem('currentUser', JSON.stringify(user));

        this.userSubject.next(user);
        return user;
      }));
  }

  logout() {
    // remove user from local storage to log user out
    localStorage.removeItem('currentUser');
    this.userSubject.next(null);
    this.router.navigate(['/login']);
  }

  private logoutIfExpired() {
    if (this.userSubject.value) {
      const jwtTokenData = JSON.parse(atob(this.userSubject.value.jwtToken.split('.')[1]));
      const expires = new Date(jwtTokenData.exp * 1000);

      if (expires <= new Date()) {
        this.logout();
      }
    }
  }
}
