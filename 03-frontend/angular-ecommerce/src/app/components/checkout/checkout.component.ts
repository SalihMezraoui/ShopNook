import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { ShopNookFormService } from 'src/app/services/shop-nook-form.service';
import { Country } from 'src/app/utilities/country';
import { State } from 'src/app/utilities/state';

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

  countries: Country[] = [];

  deliveryAddressStates: State[] = [];
  paymentAddressStates: State[] = [];

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

    // populate the months (C)

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

    // populate countries

    this.shopNookFormService.getCountriesList().subscribe(
      data => {
        console.log("fetched countries: " + JSON.stringify(data));
        this.countries = data;
      }
    );
  }

  manageYearsAndMonths()
  {
    const cardDetailsFormGroup = this.formGroupCheckout.get('cardDetails');

    const currentYear: number = new Date().getFullYear();
    const selectedYear: number = Number(cardDetailsFormGroup!.value.expiryYear);

    // starting with the current month, if the current year is the same as the selected year. 

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
      
            this.paymentAddressStates = this.deliveryAddressStates;
    } 
    else
    {
      this.formGroupCheckout.controls['paymentAddress'].reset();

      this.paymentAddressStates = [];
    }
  }

  submitPurchase()
  {
    console.log("we are handling purchase submissison");
    console.log(this.formGroupCheckout!.get('customer')!.value);
    console.log("The email address is " + this.formGroupCheckout!.get('customer')!.value.email);
  
    console.log("The country of the delivery address is " + this.formGroupCheckout!.get('deliveryAddress')!.value.country.name);
    console.log("The state of the delivery address is " + this.formGroupCheckout!.get('deliveryAddress')!.value.state.name);

  }

  getStatesList(formSectionName: string) {
    const formGroup = this.formGroupCheckout.get(formSectionName)!; // non-null assertion
  
    const countryCode = formGroup.value.country.code;
    const countryName = formGroup.value.country.name;
  
    console.log(`${formSectionName} country code: ${countryCode}`);
    console.log(`${formSectionName} country name: ${countryName}`);
  
    this.shopNookFormService.getStatesList(countryCode).subscribe(
      data => {
        if (formSectionName === 'deliveryAddress') {
          this.deliveryAddressStates = data; 
        } else {
          this.paymentAddressStates = data;
        }
  
        // select first item by default, optional chaining to safely set the value
        formGroup.get('state')?.setValue(data[0]);
      }
    );
  }
}
