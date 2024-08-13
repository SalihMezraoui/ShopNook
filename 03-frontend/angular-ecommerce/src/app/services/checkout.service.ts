import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Purchase } from '../utilities/purchase';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class CheckoutService {

  private purchaseApiUrl = environment.shopnookApiUrl + '/checkout/purchase';

  constructor(private httpClient: HttpClient) { }

  submitOrder(purchase: Purchase): Observable<any> 
  {
    return this.httpClient.post<Purchase>(this.purchaseApiUrl, purchase);    
  }
}
