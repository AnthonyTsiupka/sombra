import { Component, OnInit, ViewChild } from '@angular/core';
import { ProductService } from '../../core/services/product.service';
import { CartService } from '../../core/services/cart.service';
import { Product } from 'src/app/core/services/models/product.model';
import { MatPaginator } from '@angular/material/paginator';
import { MatDialog } from '@angular/material/dialog';
import { ProductModalComponent } from 'src/app/shared/modals/product-modal/product-modal.component';
import { Subject, takeUntil } from 'rxjs';

@Component({
  selector: 'app-product-list',
  templateUrl: './product-list.component.html',
  styleUrls: ['./product-list.component.sass'],
})
export class ProductListComponent implements OnInit {
  searchQuery: string = '';
  selectedType: string = 'All';
  priceFiltersStartState = { low: false, medium: false, high: false };
  priceFilters = { ...this.priceFiltersStartState };
  isOpenTypeDrop: boolean = false;
  isOpenPriceDrop: boolean = false;
  products: Product[] = [];
  filteredProducts: Product[] = [];
  filteredProductsBackup: Product[] = [];

  private ngUnsubscribe$: Subject<void> = new Subject();

  @ViewChild(MatPaginator) paginator: MatPaginator | undefined;

  constructor(private productService: ProductService) {}

  ngOnInit(): void {
    this.loadProducts();
  }

  ngOnDestroy(): void {
    this.ngUnsubscribe$.next();
    this.ngUnsubscribe$.complete();
  }

  loadProducts(): void {
    this.productService
      .getProducts()
      .pipe(takeUntil(this.ngUnsubscribe$))
      .subscribe((products) => {
        this.products = [...products];
        this.applyFilters();
      });
  }

    applyFilters(): void {
    if (
      !this.searchQuery.length &&
      this.selectedType === 'All' &&
      !this.hasActivePriceFilter()
    ) {
      this.filteredProducts = [...this.products].slice(0, 9);
      this.filteredProductsBackup = [...this.products];

      return;
    }

    const filteredData = [...this.products].filter(
      (product) =>
        this.matchesSearchQuery(product) &&
        this.matchesSelectedType(product) &&
        (this.hasActivePriceFilter() ? this.matchesPriceFilter(product) : true)
    );

    this.filteredProducts = [...filteredData].slice(0, 9);
    this.filteredProductsBackup = [...filteredData];

    this.paginator?.firstPage();
  }

  onSelectType(selectedType: string): void {
    this.isOpenTypeDrop = false;

    if (selectedType === this.selectedType) return;

    this.selectedType = selectedType;
    this.applyFilters();
  }

  onPageChange(event: { pageIndex: number; pageSize: number }): void {
    const startIndex = event.pageIndex * event.pageSize;
    const endIndex = startIndex + event.pageSize;

    this.filteredProducts = [...this.filteredProductsBackup].slice(
      startIndex,
      endIndex
    );
  }

  onFiltersChanged(): void {
    this.applyFilters();
  }

  private hasActivePriceFilter(): boolean {
    return (
      this.priceFilters.low ||
      this.priceFilters.medium ||
      this.priceFilters.high
    );
  }

  private matchesSearchQuery(product: Product): boolean {
    return product.name.toLowerCase().includes(this.searchQuery.toLowerCase());
  }

  private matchesSelectedType(product: Product): boolean {
    return this.selectedType === 'All' || product.type === this.selectedType;
  }

  private matchesPriceFilter(product: Product): boolean {
    return (
      (this.priceFilters.low && this.isPriceInRange(product.price, 10, 100)) ||
      (this.priceFilters.medium &&
        this.isPriceInRange(product.price, 101, 500)) ||
      (this.priceFilters.high && this.isPriceInRange(product.price, 501, 1000))
    );
  }

  private isPriceInRange(price: number, min: number, max: number): boolean {
    return price >= min && price <= max;
  }
}
