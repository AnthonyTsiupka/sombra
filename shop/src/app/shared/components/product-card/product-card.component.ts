import { Component, Input, EventEmitter, Output } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Product } from 'src/app/core/services/models/product.model';
import { ProductModalComponent } from '../../modals/product-modal/product-modal.component';
import { getStars } from '../../utils/utility-functions';

@Component({
  selector: 'app-product-card',
  templateUrl: './product-card.component.html',
  styleUrls: ['./product-card.component.sass'],
})
export class ProductCardComponent {
  @Input() product!: Product;

  constructor(private dialog: MatDialog) {}

  getStars(rating: number): number[] {
    return getStars(rating)
  }

  openProductDetails(): void {
    this.dialog.open(ProductModalComponent, {
      width: '400px',
      data: { product: this.product },
    });
  }
}
