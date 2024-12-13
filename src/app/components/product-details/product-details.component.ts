import { isPlatformBrowser } from '@angular/common';
import { HttpClient } from '@angular/common/http';
import { Component, inject, OnInit, PLATFORM_ID } from '@angular/core';
import { Meta, Title } from '@angular/platform-browser';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-product-details',
  standalone: true,
  imports: [],
  templateUrl: './product-details.component.html',
  styleUrl: './product-details.component.scss',
})
export class ProductDetailsComponent implements OnInit {
  private readonly _HttpClient = inject(HttpClient);
  private readonly _ActivatedRoute = inject(ActivatedRoute);
  private readonly _Meta = inject(Meta);
  private readonly _Title = inject(Title);
  private readonly _PLATFORM_ID = inject(PLATFORM_ID);
  products!: any;
  id: any;
  ngOnInit(): void {
    this._ActivatedRoute.paramMap.subscribe({
      next: (param) => {
        this.id = param.get('id');
        this._HttpClient
          .get(`https://fakestoreapi.com/products/${this.id}`)
          .subscribe({
            next: (response: any) => {
              console.log(response);
              this.products = response;
              this._Title.setTitle(this.products.title);
              this._Title.setTitle(this.products.title);
              this._Meta.addTags([
                { property: 'og:title', content: this.products.title },
                {
                  property: 'og:description',
                  content: this.products.description,
                },
                { property: 'og:image', content: this.products.image },
                ...(isPlatformBrowser(this._PLATFORM_ID)
                  ? [{ property: 'og:url', content: window.location.href }]
                  : []),
                // { property: 'og:url', content: window.location.href },
                { property: 'og:type', content: 'website' },
              ]);
            },
          });
      },
    });
  }
}
