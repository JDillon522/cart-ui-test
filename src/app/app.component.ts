import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { CartService } from './shared/cart-service/cart.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  public cartCount$: Observable<number> = this.cartService.cartCount$;

  constructor(
    private cartService: CartService
  ) { }

  ngOnInit(): void {
    this.cartService.getCart();
  }

}
