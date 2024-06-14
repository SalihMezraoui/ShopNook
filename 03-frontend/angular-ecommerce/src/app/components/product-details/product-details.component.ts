import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ProductService } from 'src/app/services/product.service';
import { Product } from 'src/app/utilities/product';

@Component({
  selector: 'app-product-details',
  templateUrl: './product-details.component.html',
  styleUrls: ['./product-details.component.css']
})
export class ProductDetailsComponent implements OnInit {

  product!: Product;

  constructor(private productService: ProductService, 
    private route: ActivatedRoute) { }

    ngOnInit(): void {
      this.route.paramMap.subscribe(() => {
        this.manageProductDetails();
      })
    }
    
  manageProductDetails() 
  {
    // retrieve the id string and convert i into a number.
    const myProductId: number= +this.route.snapshot.paramMap.get('id')!;

    this.productService.getProduct(myProductId).subscribe(
      data => 
      { 
        this.product = data;
      }
    )
  }

}
