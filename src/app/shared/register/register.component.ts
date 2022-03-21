import Swal from 'sweetalert2';
import { Component, OnInit } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {

  public signupForm = this.fb.group({
    username: [''],
    email: [''],
    password: [''],
  });

  constructor( 
    private fb: FormBuilder,
    private authService: AuthService,
    private router: Router
    ) { }

  ngOnInit(): void {
  }

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
