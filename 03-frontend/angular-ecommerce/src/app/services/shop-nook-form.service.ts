import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ShopNookFormService {

  constructor() { }

  fetchCreditCardMonths(firstMonth: number): Observable<number[]> {

    let data: number[] = [];
    
    // creating an array for "Months" by starting at the current month and arriving until the previous one

    for (let cardMonths = firstMonth; cardMonths <= 12; cardMonths++) {
      data.push(cardMonths);
    }

    return of(data);
  }

  fetchCreditCardYears(): Observable<number[]> {

    let data: number[] = [];

    // creating an array for "years" by starting at the current year and arriving until next 15 ones

    
    const firstYear: number = new Date().getFullYear();
    const lastYear: number = firstYear + 15;

    for (let cardYear = firstYear; cardYear <= lastYear; cardYear++) {
      data.push(cardYear);
    }

    return of(data);
  }
}
