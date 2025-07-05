import { Component, OnInit } from '@angular/core';
import { ApiService } from '../../services/api.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-place-order',
  templateUrl: './place-order.component.html'
})
export class PlaceOrderComponent implements OnInit {
  products: any[] = [];
  selectedProduct: any = null;
  order = { quantity: 1 };
  cart: any[] = [];
  total = 0;
  message = '';
  error = false;

  constructor(private apiService: ApiService, private router: Router) {}

  ngOnInit() {
    const token = localStorage.getItem('token');
    if (!token) {
      this.message = 'Please login to place an order';
      this.error = true;
      this.router.navigate(['/login']);
      return;
    }
    const payload = JSON.parse(atob(token.split('.')[1]));
    if (payload.role === 'admin') {
      this.message = 'Admins cannot place orders';
      this.error = true;
      this.router.navigate(['/products']);
      return;
    }
    this.apiService.getProducts().subscribe({
      next: (res) => this.products = res,
      error: (err) => {
        this.message = err.error.error || 'Failed to fetch products';
        this.error = true;
      }
    });
  }

  addToCart() {
    if (this.selectedProduct && this.order.quantity > 0) {
      const item = {
        product_id: this.selectedProduct.id,
        quantity: this.order.quantity,
        price: this.selectedProduct.price * this.order.quantity,
        product: this.selectedProduct
      };
      this.cart.push(item);
      this.total += item.price;
      this.order.quantity = 1;
      this.selectedProduct = null;
    } else {
      this.message = 'Please select a product and valid quantity';
      this.error = true;
    }
  }

  removeFromCart(index: number) {
    const item = this.cart[index];
    this.total -= item.price;
    this.cart.splice(index, 1);
  }

  placeOrder() {
    const token = localStorage.getItem('token');
    if (!token) {
      this.message = 'Please login to place an order';
      this.error = true;
      this.router.navigate(['/login']);
      return;
    }
    const payload = JSON.parse(atob(token.split('.')[1]));
    const order = {
      user_id: payload.id,
      items: this.cart.map(item => ({
        product_id: item.product_id,
        quantity: item.quantity,
        price: item.price / item.quantity
      })),
      total: this.total
    };
    this.apiService.placeOrder(order).subscribe({
      next: (res) => {
        this.message = `Order placed successfully: #${res.orderId}`;
        this.error = false;
        this.cart = [];
        this.total = 0;
        this.router.navigate(['/products']);
      },
      error: (err) => {
        this.message = err.error.error || 'Failed to place order';
        this.error = true;
      }
    });
  }
}