import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { Product } from './models/product.model';

@Injectable({
  providedIn: 'root',
})
export class ProductService {
  private apiUrl = 'http://localhost:3000/products';

  constructor(private http: HttpClient) {}

  getProducts(): Observable<Product[]> {
    return this.http.get<Product[]>(this.apiUrl);
  }

  searchProducts(query: string): Observable<Product[]> {
    return this.http
      .get<Product[]>(this.apiUrl)
      .pipe(
        map((products) =>
          products.filter((product) =>
            product.name.toLowerCase().includes(query.toLowerCase())
          )
        )
      );
  }

  getProductsByType(type: string): Observable<Product[]> {
    if (type === 'All') {
      return this.getProducts();
    }

    return this.http
      .get<Product[]>(this.apiUrl)
      .pipe(
        map((products) => products.filter((product) => product.type === type))
      );
  }

  getProductsByPriceRange(
    minPrice: number,
    maxPrice: number
  ): Observable<Product[]> {
    return this.http
      .get<Product[]>(this.apiUrl)
      .pipe(
        map((products) =>
          products.filter(
            (product) => product.price >= minPrice && product.price <= maxPrice
          )
        )
      );
  }
}
