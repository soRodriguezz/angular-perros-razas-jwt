import { Component } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';

import Swal from 'sweetalert2';

import { AuthService } from 'src/app/services/auth.service';
import { Properties } from 'src/app/properties/properties';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
})
export class LoginComponent {
  public loginForm = this.fb.group({
    email: ['', [Validators.pattern(Properties.VALIDATION_EMAIL)]],
    password: [''],
  });

  constructor(
    private authService: AuthService, 
    private fb: FormBuilder,
    private router: Router  
  ) {}

  public login(): void {
    if( this.loginForm.valid) {
      this.authService.signin(this.loginForm.value).subscribe({
        next: (data: any) => {
          localStorage.setItem('token', data.token);
          this.router.navigate(['/datos']);
        },
        error: (error: any) => {
          Swal.fire({
            icon: 'error',
            title: 'Error',
            text: error.error.message,
          });
        },
      });
    } else {
      Swal.fire({
        icon: 'error',
        title: 'Error',
        text: 'Contraseña o correo incorrecto',
      });
    }
  }
}
