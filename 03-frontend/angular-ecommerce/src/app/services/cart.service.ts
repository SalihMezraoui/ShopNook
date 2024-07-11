import { Injectable } from '@angular/core';
import { CartBasket } from '../utilities/cart-basket';
import { BehaviorSubject, Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CartService {

  cartItems: CartBasket[] = [];

  sumPrice: Subject<number> = new BehaviorSubject<number>(0);
  sumQuantity: Subject<number> = new BehaviorSubject<number>(0);

  constructor() { }

  addToCart(cartItem: CartBasket) {
    // check if we already have the product in the cart
    let alreadyInTheBasket = false;
    let existingProduct: CartBasket | undefined;

    if (this.cartItems.length > 0) {

      // find an item in the cart based on its id
      existingProduct = this.cartItems.find( currentCartItem => currentCartItem.id === cartItem.id);

        // check if we found the product
        alreadyInTheBasket = (existingProduct != undefined);
      }

      if (alreadyInTheBasket && existingProduct) {
        // increment the quantity
        existingProduct.quantity++;
      }
      else {
        // just add the product to the array
        this.cartItems.push(cartItem);
      }
  
      // compute cart total price and total quantity
      this.calculateCartTotals();
}


  calculateCartTotals() {

    let totalPrice: number = 0;
    let totalQuantity: number = 0;

    for (let currentCartItem of this.cartItems) {
      totalPrice += currentCartItem.quantity * currentCartItem.itemPrice;
      totalQuantity += currentCartItem.quantity;
    }

    // Notify subscribers with updated data.
    this.sumPrice.next(totalPrice);
    this.sumQuantity.next(totalQuantity);

    // debugging purposes
    this.logCartBasketData(totalPrice, totalQuantity);
  }

  logCartBasketData(totalPrice: number, totalQuantity: number) {

    console.log('Contents of the basket');
    for (let tempCartItem of this.cartItems) {
      const sumTotalPrice = tempCartItem.quantity * tempCartItem.itemPrice;
      console.log(`name: ${tempCartItem.name}, quantity=${tempCartItem.quantity}, 
                                               unitPrice=${tempCartItem.itemPrice}, 
                                               subTotalPrice=${sumTotalPrice}`);
    }

    console.log(`totalPrice: ${totalPrice.toFixed(2)}, totalQuantity: ${totalQuantity}`);
    console.log('----');
  }

  decreaseQuantity(cartItem: CartBasket) {

    cartItem.quantity--;

    if(cartItem.quantity == 0)
      {
        this.remove(cartItem);
      }
      else
      {
        this.calculateCartTotals();
      }
    }

  remove(cartItem: CartBasket) 
  {
    // get the index of the product in the array

    const index = this.cartItems.findIndex( cartItem => cartItem.id === cartItem.id);

    // once found removing it from the array
    if(index > -1)
      
        this.cartItems.splice(index, 1)
      
        this.calculateCartTotals();
  }

}
