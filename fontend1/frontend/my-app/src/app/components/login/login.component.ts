import { Component } from '@angular/core';
import { ApiService } from '../../services/api.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html'
})
export class LoginComponent {
  credentials = { email: '', password: '' }; // Ensure email and password are strings
  message = '';
  error = false;

  constructor(private apiService: ApiService, private router: Router) {}

  onLogin() {
    this.apiService.login(this.credentials).subscribe({
      next: (res) => {
        this.apiService.setToken(res.token);
        this.message = `Logged in as ${res.user.email} (${res.user.role})`;
        this.error = false;
        this.router.navigate([res.user.role === 'admin' ? '/orders' : '/products']);
      },
      error: (err) => {
        this.message = err.error.error || 'Login failed';
        this.error = true;
      }
    });
  }
}