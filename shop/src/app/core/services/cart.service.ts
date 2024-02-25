import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, map } from 'rxjs';
import { Product } from './models/product.model';

@Injectable({
  providedIn: 'root',
})
export class CartService {
  private cartItemsSubject: BehaviorSubject<any[]> = new BehaviorSubject<any[]>(
    []
  );
  public cartItems$: Observable<any[]> = this.cartItemsSubject.asObservable();

  constructor() {}

  getCartItems(): Observable<Product[]> {
    return this.cartItems$;
  }

  addToCart(product: Product): void {
    const currentCartItems = this.cartItemsSubject.getValue();
    const updatedCartItems = [...currentCartItems, product];
    this.cartItemsSubject.next(updatedCartItems);
  }

  removeFromCart(productIndex: number): void {
    const currentCartItems = this.cartItemsSubject.getValue();
    const updatedCartItems = currentCartItems.filter(
      (item, index) => index !== productIndex
    );
    this.cartItemsSubject.next(updatedCartItems);
  }

  clearCart(): void {
    this.cartItemsSubject.next([]);
  }
}
