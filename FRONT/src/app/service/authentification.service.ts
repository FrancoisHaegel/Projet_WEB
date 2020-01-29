import { Injectable } from '@angular/core';
import { User } from '../models/user';
import { HttpClient, HttpResponse, HttpHeaders } from '@angular/common/http';
import { shareReplay, map } from 'rxjs/operators';
import { environment } from 'src/environments/environment';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})


export class AuthentificationService {

  constructor(private http: HttpClient) {
  }

  login(email:string, password:string ) {
    const body = {
      email,
      password
    };
    return this.http.post<any>(environment.url + '/users/login', body);
  }

  register(email: string, firstName: string, lastName: string, password: string, passwordVerification: string, country: string, city: string, postalCode: string, address: string, phoneNumber: string) {
    const body = {
      email,
      firstName,
      lastName,
      password,
      passwordVerification,
      country,
      city,
      postalCode,
      address,
      phoneNumber
    };
    return this.http.post<User>(environment.url + '/users/register', body);

  }

  getUser(id : number) : Observable<User>{
    const res = this.http.get<User>(environment.url + '/api/users/' + id);
    return this.http.get<User>(environment.url + '/api/users/' + id);
  }

  getToken(){
    return localStorage.getItem('jwt_token');
  }

  get isLoggedIn(): boolean {
    let authToken = localStorage.getItem('jwt_token');
    return (authToken !== null);
  }
}
