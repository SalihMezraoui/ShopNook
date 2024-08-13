import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { OrderLog } from '../utilities/order-log';

@Injectable({
  providedIn: 'root'
})
export class OrderLogService {

  private orderLogUrl = 'http://localhost:8080/api/orders';

  constructor(private httpClient: HttpClient)
  {}

  getOrderLog(userEmail: string): Observable<GetOrderLogResponse> {

    // building the URL based on the customer email
    const orderLogUrl = `${this.orderLogUrl}/search/findByCustomerEmailOrderByDateCreatedDesc?email=${userEmail}`;

    return this.httpClient.get<GetOrderLogResponse>(orderLogUrl);
  }
}

interface GetOrderLogResponse
{
  _embedded: {
    orders: OrderLog[];
  }
}
