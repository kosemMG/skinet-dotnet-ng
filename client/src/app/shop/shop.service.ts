import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { map, Observable } from 'rxjs';
import { Pagination } from '../shared/models/pagination';
import { ProductBrand } from '../shared/models/product-brand';
import { ProductType } from '../shared/models/product-type';
import { ShopParams } from '../shared/models/shop-params';

@Injectable({
  providedIn: 'root'
})
export class ShopService {
  private baseUrl = 'http://localhost:5000/api/';

  constructor(private http: HttpClient) {
  }

  private static checkAndAddParam(params: HttpParams, paramObj: object): HttpParams {
    const name = Object.keys(paramObj)[0];
    const value = paramObj[name];

    if (value && value !== 0) {
      params = params.append(name, value);
    }

    return params;
  }

  public getProducts(shopParams: ShopParams): Observable<Pagination> {
    let params = new HttpParams();

    Object.keys(shopParams).forEach((key: string) => {
      params = ShopService.checkAndAddParam(params, { [key]: shopParams[key] });
    });

    return this.http.get<Pagination>(this.baseUrl + 'products', { observe: 'response', params })
      .pipe(map(({ body }) => body));
  }

  public getBrands(): Observable<ProductBrand[]> {
    return this.http.get<ProductBrand[]>(this.baseUrl + 'products/brands');
  }

  public getTypes(): Observable<ProductType[]> {
    return this.http.get<ProductType[]>(this.baseUrl + 'products/types');
  }
}
