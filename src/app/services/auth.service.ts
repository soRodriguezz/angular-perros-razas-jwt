import Swal  from 'sweetalert2';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { catchError, map, of } from 'rxjs';
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

  authTokenVerify() {
    return this.http.post('http://localhost:8002/api/verify', {})
      .pipe(
        map((data: any) => {
          if(data.permitido) return true;
          Swal.fire({
            title: 'Acceso denegado',
            text: 'No tienes permisos para acceder a esta sección',
            icon: 'error',
            confirmButtonText: 'Aceptar',
          });
          sessionStorage.removeItem(environment.TOKEN);
          return false;
        }),
        catchError(() => of(false))
      );
  }

}
