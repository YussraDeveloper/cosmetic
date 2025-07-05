import { Component, OnInit } from '@angular/core';
import { ApiService } from '../../services/api.service';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-add-product',
  templateUrl: './add-product.component.html'
})
export class AddProductComponent implements OnInit {
  product: any = { id: 0, name: '', description: '', price: 0, image_url: '', category: '' };
  message = '';
  error = false;

  constructor(private apiService: ApiService, private route: ActivatedRoute, private router: Router) {}

  ngOnInit() {
    const id = this.route.snapshot.paramMap.get('id');
    if (id) {
      this.apiService.getProducts().subscribe({
        next: (res) => {
          const product = res.find((p: any) => p.id === +id);
          if (product) {
            this.product = { ...product, price: parseFloat(product.price) };
          }
        },
        error: (err) => {
          this.message = err.error.error || 'Failed to fetch product';
          this.error = true;
        }
      });
    }
  }

  onSubmit() {
    const request = this.product.id
      ? this.apiService.updateProduct(this.product.id, this.product)
      : this.apiService.createProduct(this.product);
    request.subscribe({
      next: (res) => {
        this.message = this.product.id ? 'Product updated' : 'Product created';
        this.error = false;
        this.router.navigate(['/products']);
      },
      error: (err) => {
        this.message = err.error.error || 'Operation failed';
        this.error = true;
      }
    });
  }
}