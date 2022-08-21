import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { startCase } from 'lodash';
import { BehaviorSubject, firstValueFrom, map, Observable } from 'rxjs';
import { environment as env } from '../../../environments/environment';
import { IAddProductToCartRequest, ICart } from '../../cart/cart';

@Injectable({
  providedIn: 'root'
})
export class CartService {
  private _cartCount$: BehaviorSubject<number> = new BehaviorSubject<number>(0);
  public cartCount$: Observable<number> = this._cartCount$.asObservable();

  private _cart$: BehaviorSubject<ICart> = new BehaviorSubject<ICart>({
    products: [],
    success: true,
    totalCost: 0
  });
  public cart$: Observable<ICart> = this._cart$.asObservable();

  private _cartLoading$: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(false);
  public cartLoading$: Observable<boolean> = this._cartLoading$.asObservable();

  private cartId: string = localStorage.getItem('cartId') || '';

  constructor(
    private http: HttpClient
  ) { }

  public async getCart() {
    this._cartLoading$.next(true);

    const cart = await firstValueFrom(
      this.http.get<ICart>(`${env.api}/cart/`, { observe: 'response' }).pipe(
        map(res => {
          // We should only have to work about setting this once because its called onInit in app.component
          if (!this.cartId) {
            this.cartId = res.headers.get('Cartid') as string;
            localStorage.setItem('cartId', this.cartId);
          }

          return res.body as ICart;
        }),
        map(cart => {
          cart.products.forEach(product => product.name = startCase(product.name));
          return cart;
        })
      )
    );

    const count = cart.products.length;
    this._cartCount$.next(count);
    this._cart$.next(cart);
    this._cartLoading$.next(false);
  }

  public async addProductToCart(productId: number) {
    const request: IAddProductToCartRequest = {
      products: [{
        product_id: productId,
        quantity: 1 // a single click adds a single product
      }]
    }

    this._cartLoading$.next(true);

    await firstValueFrom(
      this.http.post(`${env.api}/cart/items`, request)
    );

    await this.getCart();
  }

  public async removeProductFromCart(productId: number) {
    this._cartLoading$.next(true);

    await firstValueFrom(
      this.http.delete(`${env.api}/cart/items/${productId}`)
    );

    await this.getCart();
  }

  public async updateProductQty(productId: number, qty: number) {
    this._cartLoading$.next(true);

    await firstValueFrom(
      this.http.put(`${env.api}/cart/items/${productId}/${qty}`, {})
    );

    await this.getCart();
  }

  public checkout(): Observable<void> {
    return this.http.post<void>(`${env.api}/cart/checkout`, {})
  }
}
