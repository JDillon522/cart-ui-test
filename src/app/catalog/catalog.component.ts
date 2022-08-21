import { Component, OnInit } from '@angular/core';
import { CartService } from '../shared/cart-service/cart.service';
import { CatalogService } from './catalog.service';

@Component({
  selector: 'app-catalog',
  templateUrl: './catalog.component.html',
  styleUrls: ['./catalog.component.scss']
})
export class CatalogComponent implements OnInit {
  public products$ = this.catalogService.products$;
  public loading$ = this.cartService.cartLoading$;

  constructor(
    private catalogService: CatalogService,
    private cartService: CartService
  ) { }

  ngOnInit(): void {
    this.catalogService.getProducts();
  }

  public addProductToCart(productId: number) {
    this.cartService.addProductToCart(productId);
  }
}
