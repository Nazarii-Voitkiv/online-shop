import { inject, Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import {
  createPaginationOption,
  Page,
  Pagination,
} from '../model/request.model';
import { Observable } from 'rxjs';
import {
  Product,
  ProductCategory,
  ProductFilter,
} from '../../admin/model/product.model';
import { environment } from '../../../environments/environment';

@Injectable({
  providedIn: 'root',
})
export class UserProductService {
  http = inject(HttpClient);

  findAllFeaturedProducts(pageRequest: Pagination): Observable<Page<Product>> {
    const params = createPaginationOption(pageRequest);
    return this.http.get<Page<Product>>(
      `${environment.apiUrl}/products-shop/featured`,
      { params }
    );
  }

  findOneByPublicId(publicId: string): Observable<Product> {
    return this.http.get<Product>(
      `${environment.apiUrl}/products-shop/find-one`,
      { params: { publicId } }
    );
  }

  findRelatedProduct(
    pageRequest: Pagination,
    productPublicId: string
  ): Observable<Page<Product>> {
    let params = createPaginationOption(pageRequest);
    params = params.append('publicId', productPublicId);
    return this.http.get<Page<Product>>(
      `${environment.apiUrl}/products-shop/related`,
      { params }
    );
  }

  findAllCategories(): Observable<Page<ProductCategory>> {
    return this.http.get<Page<ProductCategory>>(
      `${environment.apiUrl}/categories`
    );
  }

  filter(
    pageRequest: Pagination,
    productFilter: ProductFilter
  ): Observable<Page<Product>> {
    // Створення параметрів пагінації
    let params = createPaginationOption(pageRequest);

    // Додаємо ID категорії
    if (productFilter.category) {
      params = params.append('categoryId', productFilter.category);
    }

    // Додаємо розміри продукту
    if (productFilter.size) {
      params = params.append('productSizes', productFilter.size);
    }

    // Додаємо сортування
    if (pageRequest.sort && pageRequest.sort.length > 0) {
      pageRequest.sort.forEach((sort) => {
        params = params.append('sort', sort);
      });
    }

    // Запит на сервер
    return this.http.get<Page<Product>>(
      `${environment.apiUrl}/products-shop/filter`,
      { params }
    );
  }
}
