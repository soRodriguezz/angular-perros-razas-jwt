import { Injectable } from '@angular/core';
import {
  ActivatedRouteSnapshot,
  CanActivate,
  Router,
  RouterStateSnapshot,
  UrlTree,
} from '@angular/router';
import { Observable, tap } from 'rxjs';
import { environment } from 'src/environments/environment';
import { AuthService } from '../services/auth.service';

@Injectable({
  providedIn: 'root',
})
export class AuthRoleGuard implements CanActivate {
  a: boolean = true;

  constructor(private router: Router, private authService: AuthService) {}

  getToken() {
    return sessionStorage.getItem(environment.TOKEN);
  }

  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ):
    | Observable<boolean | UrlTree>
    | Promise<boolean | UrlTree>
    | boolean
    | UrlTree {
    
    return this.authService.verifyTokenModerator()
      .pipe(
        tap((estaAutenticado: any) => {
          if(!estaAutenticado) {
            this.router.navigate(['/login']);
          }
        }),
      );
  }
}
