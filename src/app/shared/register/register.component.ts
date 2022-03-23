import Swal from 'sweetalert2';
import { Component } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth.service';

import { Properties } from '../../properties/properties';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent {

  public signupForm = this.fb.group({
    username: ['', [Validators.required, Validators.minLength(3)]],
    email: ['', [Validators.required, Validators.pattern(Properties.VALIDATION_EMAIL)]],
    password: ['', [Validators.required, Validators.minLength(5)]],
  });

  constructor( 
    private fb: FormBuilder,
    private authService: AuthService,
    private router: Router
  ) { }

  signup() {
    this.authService.signup(this.signupForm.value).subscribe(
      {
        next: (data) => {
          this.router.navigate(['/login']);
        },
        error: (err) => {
          Swal.fire({
            icon: 'error',
            title: 'Error',
            text: err.error.message,
          });
        },
        complete: () => {
          Swal.fire({
            icon: 'success',
            title: '¡Registro exitoso!'
          });
        }
      }
    );
  }

}
