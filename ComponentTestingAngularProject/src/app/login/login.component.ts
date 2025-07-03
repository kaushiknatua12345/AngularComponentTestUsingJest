import { Component} from '@angular/core';
import { RouterModule,Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { FormsModule,FormBuilder,FormGroup,Validators,ReactiveFormsModule } from '@angular/forms';
import {AuthService} from './../auth.service';

 
@Component({
  selector: 'app-login',
  imports: [CommonModule, FormsModule,RouterModule,ReactiveFormsModule],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css',
  standalone: true  
})
export class LoginComponent {

  loginForm: FormGroup;
  loginSuccess = false;
  errorMessage = '';
  
  

  constructor(private fb: FormBuilder, private loginService: AuthService, private router: Router) {
    this.loginForm = this.fb.group({
      email: ['', Validators.required],
      password: ['', Validators.required],
    });
  }

  onSubmit() {
    if (this.loginForm.invalid) {
    this.loginForm.markAllAsTouched();
    return;
    }

    //change the login method to use the AuthService 
    // and pass the form values to it
    // The AuthService should handle the HTTP request and return an Observable

    this.loginSuccess = false;
    this.errorMessage = '';
    // Call the login method from AuthService
    this.loginService.login(this.loginForm.value)
      .subscribe({
        next: (response) => {
          if (response.length > 0) {
            this.loginSuccess = true;
            this.errorMessage = '';
            // Navigate to the dashboard page or any other page on successful login
            this.router.navigate(['/dashboard']);
          } else {
            this.errorMessage = 'Invalid email or password';            
            
          }
        },
        error: (error) => {
          console.error('Login error:', error);
          this.errorMessage = 'An error occurred during login';
        }
      });

    
    
  }
}