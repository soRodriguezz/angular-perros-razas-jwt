import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map, Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { RolesService } from './roles.service';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  constructor(
    private http: HttpClient,
    private rolesService: RolesService,
  ) {}

  signin(datos: any) {
    return this.http.post('http://localhost:8002/api/signin', datos, {});
  }

  signup(datos: any) {
    return this.http.post('http://localhost:8002/api/signup', datos, {});
  }

  verifyToken() {
    const roles = this.rolesService.getRoles().subscribe();
    console.log(roles);
  }
    // const token = sessionStorage.getItem(environment.TOKEN);
    // return this.http.post('http://localhost:8002/api/verify', token, {
    //   headers: {
    //     authorization: `${token}`,
    //   }
    // })
    // .pipe(
    //   tap( (resp: any) => {
    //     sessionStorage.setItem(environment.TOKEN, resp.token);
    //   }),
    //   map((resp: any) => {
    //     return resp.roles;
    //   })
    // );
 

}
