import { Component } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
})
export class LoginComponent {
  public loginForm = this.fb.group({
    email: [''],
    password: [''],
  });

  constructor(
    private authService: AuthService, 
    private fb: FormBuilder,
    private router: Router  
  ) {}

  login() {
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
  }
}
