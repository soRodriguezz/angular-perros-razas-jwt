import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class RolesService {

  constructor( private http: HttpClient) { }

  getRoles() {
    return this.http.get('http://localhost:8002/api/roles/')
      .pipe(
        map((resp: any) => {
          return resp.map((roles:any) => roles.name)
        })
      );
  }
}
