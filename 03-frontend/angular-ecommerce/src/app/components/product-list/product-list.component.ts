import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ProductService } from 'src/app/services/product.service';
import { Product } from 'src/app/utilities/product';

@Component({
  selector: 'app-product-list',
  templateUrl: './product-list-grid.component.html',
  styleUrls: ['./product-list.component.css']
})
export class ProductListComponent implements OnInit {

  products: Product[] = [];
  currentCategoryId: number = 1;

  constructor(private productService: ProductService,
    private route: ActivatedRoute
  ) { }

  ngOnInit(): void {
    this.route.paramMap.subscribe(() => {this.listProducts();
    })  
  }

  listProducts() {
    // check if id is avialable
    const hasCategoryId: Boolean = this.route.snapshot.paramMap.has('id')

    if(hasCategoryId)
    {
      // get the "id" param string. convert string to  number using the "+" symbol
      this.currentCategoryId = +this.route.snapshot.paramMap.get('id')!;
    }
    else{
      // no category id available => default to tcategory 1
      this.currentCategoryId=1;
    }

    // now get the products for the given category
    this.productService.getProductList(this.currentCategoryId).subscribe(
      data => {
        this.products = data;
      }
    )
  }

}
