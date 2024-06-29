import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { ShopNookFormService } from 'src/app/services/shop-nook-form.service';

@Component({
  selector: 'app-checkout',
  templateUrl: './checkout.component.html',
  styleUrls: ['./checkout.component.css']
})
export class CheckoutComponent implements OnInit {

  formGroupCheckout!: FormGroup;

  sumPrice: number = 0;
  sumQuantity: number = 0;

  creditCardYears: number[] = [];
  creditCardMonths: number[] = [];

  constructor(private formBuilder: FormBuilder, private shopNookFormService: ShopNookFormService) {}

  ngOnInit(): void 
  {
    this.formGroupCheckout = this.formBuilder.group({
      customer: this.formBuilder.group({
        firstName: [''],
        lastName: [''],
        phoneNumber: [''],
        email: ['']
      }),
      deliveryAddress: this.formBuilder.group({
        street: [''],
        city: [''],
        state: [''],
        country: [''],
        zipCode: ['']
      }),
      paymentAddress: this.formBuilder.group({
        street: [''],
        city: [''],
        state: [''],
        country: [''],
        zipCode: ['']
      }),
      cardDetails: this.formBuilder.group({
        cardType: [''],
        cardHolderName: [''],
        cardNumber: [''],
        CVV: [''],
        expiryMonth: [''],
        expiryYear: ['']
      })
    });

    // populate the months

    const firstMonth: number = new Date().getMonth() + 1;
    console.log("firstMonth: " + firstMonth);

    this.shopNookFormService.fetchCreditCardMonths(firstMonth).subscribe(
      data => {
        console.log("fetching the months: " + JSON.stringify(data));
        this.creditCardMonths = data;
      }
    );

    // populate the years

    this.shopNookFormService.fetchCreditCardYears().subscribe(
      data => {
        console.log("fetching the years: " + JSON.stringify(data));
        this.creditCardYears = data;
      }
    );
  }

  manageYearsAndMonths()
  {
    const cardDetailsFormGroup = this.formGroupCheckout.get('cardDetails');

    const currentYear: number = new Date().getFullYear();
    const selectedYear: number = Number(cardDetailsFormGroup!.value.expiryYear);

    // if the current year equals the selected year, then start with the current month

    let firstMonth: number;

    if (currentYear === selectedYear) {
      firstMonth = new Date().getMonth() + 1;
    }
    else {
      firstMonth = 1;
    }

    this.shopNookFormService.fetchCreditCardMonths(firstMonth).subscribe(
      data => {
        console.log("the fetched  months: " + JSON.stringify(data));
        this.creditCardMonths = data;
      }
    );
  }

  copyDeliveryAddressToPaymentAddress(event: any): void {
    if (event.target.checked) {
      this.formGroupCheckout.controls['paymentAddress']
            .setValue(this.formGroupCheckout.controls['deliveryAddress'].value);
    } else {
      this.formGroupCheckout.controls['paymentAddress'].reset();
    }
  }

  submitPurchase()
  {
    console.log("we are handling purchase submissison");
    console.log(this.formGroupCheckout!.get('customer')!.value);
    console.log("The email address is " + this.formGroupCheckout!.get('customer')!.value.email);
  }

  

}
