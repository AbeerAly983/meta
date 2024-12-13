import { HttpClient } from '@angular/common/http';
import { Component, inject, OnInit } from '@angular/core';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-products',
  standalone: true,
  imports: [RouterLink],
  templateUrl: './products.component.html',
  styleUrl: './products.component.scss',
})
export class ProductsComponent implements OnInit {
  private readonly _HttpClient = inject(HttpClient);
  products: any[] = [];
  ngOnInit(): void {
    this.getAllProducts();
    this._HttpClient.get('https://fakestoreapi.com/products').subscribe({
      next: (response: any) => {
        console.log(response);
        this.products = response;
      },
    });
  }
  getAllProducts() {}
}
