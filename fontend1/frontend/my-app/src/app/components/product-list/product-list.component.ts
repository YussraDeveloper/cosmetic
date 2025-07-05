import { Component, OnInit } from '@angular/core';
import { ApiService } from '../../services/api.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-product-list',
  templateUrl: './product-list.component.html',
  styleUrls: ['./product-list.component.css']
})
export class ProductListComponent implements OnInit {
  products: any[] = [];
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
        this.router.navigate(['/login']);
      }
    }
    this.apiService.getProducts().subscribe({
      next: (res) => this.products = res,
      error: (err) => {
        this.message = err.error.error || 'Failed to fetch products';
        this.error = true;
      }
    });
  }

  editProduct(id: number) {
    this.router.navigate(['/add-product', { id }]);
  }

  deleteProduct(id: number) {
    this.apiService.deleteProduct(id).subscribe({
      next: () => this.products = this.products.filter(p => p.id !== id),
      error: (err) => {
        this.message = err.error.error || 'Failed to delete product';
        this.error = true;
      }
    });
  }

  addToCart(product: any) {
    this.router.navigate(['/place-order'], { state: { product } });
  }
}