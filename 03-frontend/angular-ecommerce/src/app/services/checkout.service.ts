import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Purchase } from '../utilities/purchase';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CheckoutService {

  private purchaseApiUrl = 'http://localhost:8080/api/checkout/purchase';

  constructor(private httpClient: HttpClient) { }

  submitOrder(purchase: Purchase): Observable<any> 
  {
    return this.httpClient.post<Purchase>(this.purchaseApiUrl, purchase);    
  }
}
