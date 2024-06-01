import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Product } from '../utilities/product';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { ProductCategory } from '../utilities/product-category';

@Injectable({
  providedIn: 'root'
})
export class ProductService 
{
  
  private apiUrl = 'http://localhost:8080/api/products';

  private categoryUrl = 'http://localhost:8080/api/product-category';

  constructor(private httpClient: HttpClient) { }

  getProductList(theCategoryId: number): Observable<Product[]> 
  {
    // building the url based on the category id
    const searchUrl = `${this.apiUrl}/search/findByCategoryId?id=${theCategoryId}`;
    return this.httpClient.get<GetProductsResponse>(searchUrl).pipe(
      map(response => response._embedded.products)
    );
  }

  getProductCategories(): Observable<ProductCategory[]> {

    return this.httpClient.get<GetProductCategoryResponse>(this.categoryUrl).pipe(
      map(response => response._embedded.productCategory)
    );
  }
}

interface GetProductsResponse {
  _embedded: {
    products: Product[];
  }
}

  interface GetProductCategoryResponse {
    _embedded: {
      productCategory: ProductCategory[];
    }
}
