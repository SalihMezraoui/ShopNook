import { HttpEvent, HttpHandler, HttpInterceptor, HttpRequest } from '@angular/common/http';
import { Inject, Injectable } from '@angular/core';
import { OKTA_AUTH } from '@okta/okta-angular';
import { OktaAuth } from '@okta/okta-auth-js';
import { from, lastValueFrom, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class TokenInterceptorService implements HttpInterceptor {

  constructor(@Inject(OKTA_AUTH) private oktaAuth: OktaAuth) { }

  intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> 
  {
    return from(this.manageAccess(request, next));
  }

  private async manageAccess(request: HttpRequest<any>, next: HttpHandler): Promise<HttpEvent<any>> 
  {
     // Apply access token only to specific secured API endpoints
     const protectedEndpoints = ['http://localhost:8080/api/orders'];

     if (protectedEndpoints.some(url => request.urlWithParams.includes(url))) 
      {
       // retrieving the access token
       const currentAccessToken = this.oktaAuth.getAccessToken();
 
       // Cloning the request and add the Authorization header with the access token
       request = request.clone({
         setHeaders: {
           Authorization: 'Bearer ' + currentAccessToken
         }
       });
     }
 
     return await lastValueFrom(next.handle(request));

  }
}
