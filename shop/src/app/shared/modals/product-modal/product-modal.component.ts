import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { CartService } from 'src/app/core/services/cart.service';
import { Product } from 'src/app/core/services/models/product.model';
import { NotificationsService } from 'src/app/core/services/notifications.service';
import { getStars } from '../../utils/utility-functions';

@Component({
  selector: 'app-product-modal',
  templateUrl: './product-modal.component.html',
  styleUrls: ['./product-modal.component.sass'],
})
export class ProductModalComponent {
  constructor(
    public dialogRef: MatDialogRef<ProductModalComponent>,
    private cartService: CartService,
    private notification: NotificationsService,
    @Inject(MAT_DIALOG_DATA) public data: { product: Product }
  ) {}

  onAddToCart(): void {
    this.cartService.addToCart(this.data.product);
    this.notification.openNotification(
      3000,
      'Product added to cart',
      'top',
      'right'
    );
    this.dialogRef.close();
  }

  getStars(rating: number): number[] {
    return getStars(rating)
  }
}
