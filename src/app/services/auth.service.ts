import Swal  from 'sweetalert2';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { catchError, map, of, tap } from 'rxjs';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  constructor(
    private http: HttpClient
  ) {}

  signin(datos: any) {
    return this.http.post('http://localhost:8002/api/signin', datos, {});
  }

  signup(datos: any) {
    return this.http.post('http://localhost:8002/api/signup', datos, {});
  }

  verifyTokenModerator() {
    const token = sessionStorage.getItem(environment.TOKEN);
    return this.http.post('http://localhost:8002/api/verify', token, {
      headers: {
        authorization: `${token}`,
      }
    })
    .pipe(
      tap( (resp: any) => {
        sessionStorage.setItem(environment.TOKEN, resp.token);
      }),
      map((resp: any) => {
        if(resp.roles.includes('moderator')) return true;
        sessionStorage.removeItem(environment.TOKEN);
        Swal.fire({
          title: 'Acceso denegado',
          text: 'No tienes permisos para acceder a esta sección',
          icon: 'error',
          confirmButtonText: 'Aceptar',
        });
        return false;
      }),
      catchError(() => of(false))
    );
  } 

  verifyTokenAdmin() {
    const token = sessionStorage.getItem(environment.TOKEN);
    return this.http.post('http://localhost:8002/api/verify', token, {
      headers: {
        authorization: `${token}`,
      }
    })
    .pipe(
      tap( (resp: any) => {
        sessionStorage.setItem(environment.TOKEN, resp.token);
      }),
      map((resp: any) => {
        if(resp.roles.includes('admin')) return true;
        sessionStorage.removeItem(environment.TOKEN);
        Swal.fire({
          title: 'Acceso denegado',
          text: 'No tienes permisos para acceder a esta sección',
          icon: 'error',
          confirmButtonText: 'Aceptar',
        });
        return false;
      }),
      catchError(() => of(false))
    );
  } 

}
