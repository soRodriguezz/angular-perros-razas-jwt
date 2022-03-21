import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  constructor(private http: HttpClient) {}

  signin(datos: any) {
    return this.http.post('http://localhost:8002/api/signin', datos, {});
  }

  signup(datos: any) {
    return this.http.post('http://localhost:8002/api/signup', datos, {});
  }
}
