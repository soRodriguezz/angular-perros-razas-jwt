import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlTree } from '@angular/router';
import { Observable, tap } from 'rxjs';
import { AuthService } from '../services/auth.service';

@Injectable({
  providedIn: 'root'
})
export class AuthRoleModeratorGuard implements CanActivate {
 
  constructor(
    private router: Router, 
    private authService: AuthService
  ) {}

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
