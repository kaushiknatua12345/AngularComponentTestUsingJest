import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable,map } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

 private readonly apiUrl ='http://localhost:3000/employees';
  constructor(private readonly http: HttpClient) { }

  //login user using username and password
  
 login(credentials:{email: string, password: string}): Observable<any> {
    return this.http.get(`${this.apiUrl}?username=${credentials.email}&password=${credentials.password}`);
  } 

}