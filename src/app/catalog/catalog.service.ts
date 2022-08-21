import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, firstValueFrom, map, Observable, of, withLatestFrom } from 'rxjs';
import { environment as env } from '../../environments/environment';
import { IGetProductsResponse, IProduct } from './catalog';
import { startCase } from 'lodash';

@Injectable({
  providedIn: 'root'
})
export class CatalogService {
  private initialLoad: boolean = false;
  private _products$: BehaviorSubject<IProduct[]> = new BehaviorSubject<IProduct[]>([]);
  public products$: Observable<IProduct[]> = this._products$.asObservable();

  constructor(
    private http: HttpClient
  ) { }

  public async getProducts(): Promise<void> {
    if (!this.initialLoad) {
      const products = await firstValueFrom(this.http.get<IGetProductsResponse>(`${env.api}/catalog`).pipe(
        map(response => response.products.map(product => {
          product.name = startCase(product.name);
          return product;
        }))
      ));

      this._products$.next(products);
      this.initialLoad = true;
    }

  }

}
