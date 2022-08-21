import { Component, OnInit } from '@angular/core';
import { CartService } from '../shared/cart-service/cart.service';

@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.scss']
})
export class CartComponent implements OnInit {
  public cart$ = this.cartService.cart$;

  constructor(
    private cartService: CartService
  ) { }

  ngOnInit(): void {
  }

  public removeProduct(id: number) {
    this.cartService.removeProductFromCart(id);
  }

  public updateQty(id: number, qty: number) {
    if (qty === 0) {
      this.cartService.removeProductFromCart(id);
    }

    this.cartService.updateProductQty(id, qty);
  }
}
