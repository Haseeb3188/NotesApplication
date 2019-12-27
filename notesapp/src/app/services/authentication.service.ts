import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import 'rxjs/add/operator/map';

@Injectable()
export class AuthenticationService {

  constructor(private httpClient: HttpClient) {}

  authenticateUser(data) {
   return this.httpClient.post('http://localhost:3000/api/v1/users/login', data);
  }

  registerUser(data) {
   return this.httpClient.post('http://localhost:3000/api/v1/users/register', data);
  }


  setBearerToken(token) {
   return localStorage.setItem('bearerToken', token);
  }

  removeLoginInfo() {
   localStorage.clear();
  }

  setUserId(userId) {
   return localStorage.setItem('userId', userId);
  }

  getUserId() {
   return localStorage.getItem('userId');
  }

  getBearerToken() {
   return localStorage.getItem('bearerToken');
  }

  isUserAuthenticated(token): Promise<boolean> {
   return this.httpClient.post('http://localhost:3000/api/v1/isAuthenticated', null, {
   'headers' : new HttpHeaders().set('Authorization', `Bearer ${token}`)}
   ).map((res) => res['isAuthenticated']).toPromise();
  }
}
