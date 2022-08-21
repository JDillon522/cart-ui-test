import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, firstValueFrom, map, Observable } from 'rxjs';
import { environment as env } from '../../../environments/environment';
import { ICart } from '../../cart/cart';

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

  private cartId: string = localStorage.getItem('cartId') || '';

  constructor(
    private http: HttpClient
  ) { }

  public async getCart() {
    const cart = await firstValueFrom(
      this.http.get<ICart>(`${env.api}/cart/`, { observe: 'response' }).pipe(
        map(res => {

          if (!this.cartId) {
            this.cartId = res.headers.get('Cartid') as string;
            localStorage.setItem('cartId', this.cartId);
          }

          return res.body as ICart;
        })
      )
    );

    this._cartCount$.next(cart?.products?.length || 0);
    this._cart$.next(cart)
  }
}
