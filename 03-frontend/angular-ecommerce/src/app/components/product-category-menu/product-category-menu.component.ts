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
        { id: 10, name: 'CDs & DVDs' },
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
      name: 'Home & Kitchen',
      subCategories: [
        { id: 15, name: 'Fourniture' },
        { id: 16, name: 'Decor' },
        { id: 3, name: 'Vases' }
      ]
    },
    {
      name: 'Fashion',
      subCategories: [
        {
          id: 19, name: 'Women', subCategories: [
            { id: 4, name: 'Purses' }
          ]
        },
        { id: 21, name: 'Men' },
        { id: 22, name: 'Kids' }
      ]
    },
    { name: 'Books', subCategories: [] }
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
