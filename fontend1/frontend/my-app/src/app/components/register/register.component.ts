import { Component, OnInit } from '@angular/core';
import { ApiService } from '../../services/api.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html'
})
export class RegisterComponent implements OnInit {
  user = { username: '', email: '', password: '', role: 'customer' };
  message = '';
  error = false;
  isAdmin = false;

  constructor(private apiService: ApiService, private router: Router) {}

  ngOnInit() {
    const token = localStorage.getItem('token');
    if (token) {
      try {
        const payload = JSON.parse(atob(token.split('.')[1]));
        this.isAdmin = payload.role === 'admin';
      } catch (err) {
        console.error('Invalid token', err);
      }
    }
  }

  onRegister() {
    this.apiService.register(this.user).subscribe({
      next: (res) => {
        this.message = `Registered as ${res.username}`;
        this.error = false;
        this.router.navigate(['/login']);
      },
      error: (err) => {
        this.message = err.error.error || 'Registration failed';
        this.error = true;
      }
    });
  }
}