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
  previousCategoryId: number = 1;

  searchMethod: boolean = false;

  // Pagination properties
  pageNumber: number = 1;
  pageSize: number = 5;
  totalItems: number = 0;

  formerKeyword: string = "";



  constructor(private productService: ProductService,
    private route: ActivatedRoute
  ) { }

  ngOnInit(): void {
    this.route.paramMap.subscribe(() => {
      this.listProducts();
    })
  }

  listProducts() {

    this.searchMethod = this.route.snapshot.paramMap.has('keyword');

    if (this.searchMethod) {
      this.manageSearchProducts();
    }
    else {
      this.manageProductList();
    }
  }

  manageSearchProducts() {
    const myKeyword: string = this.route.snapshot.paramMap.get('keyword')!;

    // Setting thePageNumber to 1, if the keyword is different from the previous one

    if (this.formerKeyword != myKeyword) {
      this.pageNumber = 1;
    }

    this.formerKeyword = myKeyword;

    console.log(`keyword=${myKeyword}, pageNumber=${this.pageNumber}`);

    // searching for the products using the given keyword
    this.productService.searchProductsPaginated(this.pageNumber - 1, this.pageSize, myKeyword)
                           .subscribe(this.processProductData());
  }


  manageProductList() {
    // check if id is avialable
    const hasCategoryId: Boolean = this.route.snapshot.paramMap.has('id')

    if (hasCategoryId) {
      // get the "id" param string. convert string to  number using the "+" symbol
      this.currentCategoryId = +this.route.snapshot.paramMap.get('id')!;
    }
    else {
      // no category id available => default to tcategory 1
      this.currentCategoryId = 1;
    }


    // checking if the current category different from the previous one 
    // => re-setiing pageNumber to 1

    if (this.previousCategoryId != this.currentCategoryId) {
      this.pageNumber = 1;
    }

    this.previousCategoryId = this.currentCategoryId;

    console.log(`currentCategoryId=${this.currentCategoryId}, thePageNumber=${this.pageNumber}`);


    // now get the products for the given category_id
    this.productService.getProductListPaginated(this.pageNumber -1, 
                                                this.pageSize, 
                                                this.currentCategoryId)
                                                .subscribe(this.processProductData());
  }

  processProductData() {
    return (data: any) => {
      this.products = data._embedded.products;
      this.pageNumber = data.page.number + 1;
      this.pageSize = data.page.size;
      this.totalItems = data.page.totalElements;
    };
  }
  updatePageSize(pageSize: string)
  {
    this.pageSize = +pageSize;
    this.pageNumber = 1;
    this.listProducts();
  }
}
