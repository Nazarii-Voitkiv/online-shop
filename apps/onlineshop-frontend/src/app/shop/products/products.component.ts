import { Component, effect, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ProductsFilterComponent } from './products-filter/products-filter.component';
import { injectQueryParams } from 'ngxtension/inject-query-params';
import {Product, ProductFilter} from '../../admin/model/product.model';
import { UserProductService } from '../../shared/service/user-product.service';
import { Router } from '@angular/router';
import { ToastService } from '../../shared/toast/toast.service';
import { Pagination } from '../../shared/model/request.model';
import { injectQuery } from '@tanstack/angular-query-experimental';
import { filter, lastValueFrom } from 'rxjs';
import { ProductCardComponent } from '../product-card/product-card.component';

@Component({
  selector: 'app-products',
  standalone: true,
  imports: [CommonModule, ProductsFilterComponent, ProductCardComponent],
  templateUrl: './products.component.html',
  styleUrl: './products.component.scss',
})
export class ProductsComponent {
  category = injectQueryParams('category');
  size = injectQueryParams('size');
  sort = injectQueryParams('sort');
  name = injectQueryParams('name');
  productService = inject(UserProductService);
  router = inject(Router);
  toastService = inject(ToastService);

  pageRequest: Pagination = {
    page: 0,
    size: 20,
    sort: ['createdDate,desc'],
  };

  categoryQuery = injectQuery(() => ({
    queryKey: ['categories'],
    queryFn: () => lastValueFrom(this.productService.findAllCategories()),
  }));

  filterProducts: ProductFilter = {
    category: this.category() ? this.category()! : '',
    size: this.size() ? this.size()! : '',
    sort: [this.sort() ? this.sort()! : ''],
    name: this.name() ? this.name()! : '' // новий параметр
  };

  lastCategory = '';

  constructor() {
    effect(() => this.handleFilteredProductsQueryError());
    effect(() => this.handleParametersChange());
  }

  filteredProductsQuery = injectQuery(() => ({
    queryKey: ['products', this.filterProducts.category, this.filterProducts.size, this.filterProducts.sort, this.filterProducts.name],
    queryFn: () =>
        lastValueFrom(this.productService.filter(this.pageRequest, this.filterProducts)),
  }));

  trackByPublicId(index: number, product: Product) {
    return product.publicId;
  }

  onFilterChange(filterProducts: ProductFilter) {
    const currentCategory = filterProducts.category?.trim() || '';
    const currentSize = filterProducts.size?.trim() || '';

    // Зберігаємо поточне значення name із this.filterProducts, якщо воно було
    const currentName = this.filterProducts.name?.trim() || '';

    this.filterProducts = {
      category: currentCategory,
      size: currentSize,
      sort: (filterProducts.sort && filterProducts.sort.length)
          ? filterProducts.sort
          : ['createdDate,desc'],
      name: currentName // додаємо name назад до фільтрів
    };

    this.pageRequest.sort = this.filterProducts.sort;

    const queryParams: any = { ...this.filterProducts };

    // Якщо деяких параметрів немає – видаляємо їх з queryParams
    if (!currentCategory) {
      delete queryParams.category;
    }
    if (!currentSize) {
      delete queryParams.size;
    }
    if (!currentName) {
      delete queryParams.name;
    }

    this.router.navigate(['/products'], { queryParams });
    this.filteredProductsQuery.refetch();
  }

  private handleFilteredProductsQueryError() {
    if (this.filteredProductsQuery.isError()) {
      this.toastService.show(
        'Error! Failed to load products, please try again',
        'ERROR'
      );
    }
  }

  private handleParametersChange() {
    const currentName = this.name() || '';
    if (this.filterProducts.name !== currentName) {
      this.filterProducts.name = currentName;
      this.filteredProductsQuery.refetch();
    }
    if (this.category()) {
      if (this.lastCategory != this.category() && this.lastCategory !== '') {
        this.filterProducts = {
          category: this.category(),
          size: this.size() ? this.size()! : '',
          sort: [this.sort() ? this.sort()! : ''],
          name: this.filterProducts.name // зберігаємо поточне значення name
        };
        this.filteredProductsQuery.refetch();
      }
    }
    this.lastCategory = this.category()!;
  }

  protected readonly filter = filter;
}
