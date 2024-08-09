import { Component, OnInit } from '@angular/core';
import { ProductService } from 'src/app/services/product.service';
import { ProductCategory } from 'src/app/utilities/product-category';

@Component({
  selector: 'app-product-category-menu',
  templateUrl: './product-category-menu.component.html',
  styleUrls: ['./product-category-menu.component.css']
})
export class ProductCategoryMenuComponent implements OnInit {

  predefinedCategories = [
    {
      name: 'Electronics',
      subCategories: [
        { id: 6, name: 'Smartphones' },
        { id: 7, name: 'Accessories' },
        { id: 8, name: 'Camera and photo' },
        { id: 9, name: 'Music Production' },
        { id: 1, name: 'Iphone Cases' },
      ]
    },
    {
      name: 'Sports & Outdoors',
      subCategories: [
        { id: 12, name: 'Outdoor' },
        { id: 13, name: 'Fitness' },
        { id: 2 , name: 'Gym Bottles'}
      ]
    },
    {
      name: 'Home & Decor',
      subCategories: [
        { id: 15, name: 'Fourniture' },
        { id: 16, name: 'Decor' },
        { id: 3, name: 'Vases' }
      ]
    },
    {
      name: 'Women',
      subCategories: [
        { id: 24, name: 'Pants' },
        { id: 25, name: 'Shirts' },
        { id: 4, name: 'Purses' },
        { id: 26, name: 'Shoes' },
      ]
    },
    {
      name: 'Men',
      subCategories: [
        { id: 27, name: 'Pants' },
        { id: 28, name: 'Shirts' },
        { id: 29, name: 'Shoes' }
      ]
    },
    {
      name: 'Kids',
      subCategories: [
        { id: 30, name: 'Pants' },
        { id: 31, name: 'Shirts' },
        { id: 32, name: 'Shoes' }
      ]
    }
  ];

  productCategories: ProductCategory[] = [];

  constructor(private productService: ProductService) { }

  ngOnInit() {
    this.listProductCategories();
  }

  listProductCategories() {
    this.productService.getProductCategories().subscribe(
      data => {
        console.log('product-categories=' + JSON.stringify(data));
        this.productCategories = data;
      }
    );
  }

}
