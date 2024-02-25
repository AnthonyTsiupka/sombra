import { Component, OnInit } from '@angular/core';
import { Product } from 'src/app/core/services/models/product.model';
import { CartService } from 'src/app/core/services/cart.service';
import { NotificationsService } from 'src/app/core/services/notifications.service';
import { Subject, takeUntil } from 'rxjs';

@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.sass'],
})
export class CartComponent implements OnInit {
  cartItems: Product[] = [];

  private ngUnsubscribe$: Subject<void> = new Subject();

  constructor(
    private cartService: CartService,
    private notification: NotificationsService
  ) {}

  ngOnInit(): void {
    this.fetchCartItems();
  }

  ngOnDestroy(): void {
    this.ngUnsubscribe$.next();
    this.ngUnsubscribe$.complete();
  }

  fetchCartItems(): void {
    this.cartService
      .getCartItems()
      .pipe(takeUntil(this.ngUnsubscribe$))
      .subscribe({
        next: (items: Product[]) => {
          this.cartItems = items;
        },
        error: (error) => {
          this.notification.openNotification(
            3000,
            'Error fetching cart items',
            'top',
            'right'
          );
        },
      });
  }

  removeFromCart(itemName: string, index: number): void {
    this.cartService.removeFromCart(index);
    this.notification.openNotification(
      3000,
      `${itemName} was successfully removed`,
      'top',
      'right'
    );
  }

  clearCart(): void {
    this.cartService.clearCart();
    this.notification.openNotification(
      3000,
      `Cart was successfully cleared`,
      'top',
      'right'
    );
  }
}
