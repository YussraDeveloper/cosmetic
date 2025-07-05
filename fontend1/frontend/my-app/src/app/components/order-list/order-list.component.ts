import { Component, OnInit } from '@angular/core';
import { ApiService } from '../../services/api.service';

@Component({
  selector: 'app-order-list',
  templateUrl: './order-list.component.html'
})
export class OrderListComponent implements OnInit {
  orders: any[] = [];
  message = '';
  error = false;

  constructor(private apiService: ApiService) {}

  ngOnInit() {
    this.apiService.getOrders().subscribe({
      next: (res) => this.orders = res,
      error: (err) => {
        this.message = err.error.error || 'Failed to fetch orders';
        this.error = true;
      }
    });
  }
}