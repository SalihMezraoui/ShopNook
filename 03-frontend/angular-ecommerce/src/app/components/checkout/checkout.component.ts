import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { ShopNookFormService } from 'src/app/services/shop-nook-form.service';
import { Country } from 'src/app/utilities/country';
import { State } from 'src/app/utilities/state';
import { ShopNookValidators } from 'src/app/validators/shop-nook-validators';

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

  constructor(private formBuilder: FormBuilder, private shopNookFormService: ShopNookFormService) { }

  ngOnInit(): void {
    this.formGroupCheckout = this.formBuilder.group({
      customer: this.formBuilder.group({
        firstName: new FormControl('',
          [Validators.required,
          Validators.minLength(2),
          ShopNookValidators.notOnlyWhitespace]),

        lastName: new FormControl('',
          [Validators.required,
          Validators.minLength(2),
          ShopNookValidators.notOnlyWhitespace]),

        phoneNumber: new FormControl('',
          [Validators.required,
          Validators.pattern('^\\+[0-9]{1,15}$')]), // Ensure a plus sign followed by 1-15 digits

        email: new FormControl('',
          [Validators.required,
          Validators.pattern('^[a-z0-9._%+-]+@[a-z0-9.-]+\\.[a-z]{2,4}$')])
      }),
      deliveryAddress: this.formBuilder.group({
        street: new FormControl('',
          [Validators.required,
          Validators.minLength(2),
          ShopNookValidators.notOnlyWhitespace]),
        city: new FormControl('',
          [Validators.required,
          Validators.minLength(2),
          ShopNookValidators.notOnlyWhitespace]),
        state: new FormControl('', [Validators.required]),
        country: new FormControl('', [Validators.required]),
        zipCode: new FormControl('',
          [Validators.required,
          Validators.minLength(2),
          ShopNookValidators.notOnlyWhitespace])
      }),
      paymentAddress: this.formBuilder.group({
        street: new FormControl('',
          [Validators.required,
          Validators.minLength(2),
          ShopNookValidators.notOnlyWhitespace]),
        city: new FormControl('',
          [Validators.required,
          Validators.minLength(2),
          ShopNookValidators.notOnlyWhitespace]),
        state: new FormControl('', [Validators.required]),
        country: new FormControl('', [Validators.required]),
        zipCode: new FormControl('',
          [Validators.required,
          Validators.minLength(2),
          ShopNookValidators.notOnlyWhitespace])
      }),
      cardDetails: this.formBuilder.group({
        cardType: new FormControl('', [Validators.required]),
        cardHolderName: new FormControl('',
          [Validators.required,
          Validators.minLength(2),
          ShopNookValidators.notOnlyWhitespace]),
        cardNumber: new FormControl('', [Validators.required, Validators.pattern('[0-9]{16}')]),
        CVV: new FormControl('', [Validators.required, Validators.pattern('[0-9]{3}')]),
        expiryMonth: new FormControl('', [Validators.required]),
        expiryYear: new FormControl('', [Validators.required])
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

  // Getters for the customer section
  get firstName() {
    return this.formGroupCheckout.get('customer.firstName');
  }
  get lastName() {
    return this.formGroupCheckout.get('customer.lastName');
  }
  get phoneNumber() {
    return this.formGroupCheckout.get('customer.phoneNumber');
  }
  get email() {
    return this.formGroupCheckout.get('customer.email');
  }


  // Getters for the delivery Address section 
  get deliveryAddressAvenue() {
    return this.formGroupCheckout.get('deliveryAddress.street');
  }
  get deliveryAddressCity() {
    return this.formGroupCheckout.get('deliveryAddress.city');
  }
  get deliveryAddressState() {
    return this.formGroupCheckout.get('deliveryAddress.state');
  }
  get deliveryAddressCountry() {
    return this.formGroupCheckout.get('deliveryAddress.country');
  }
  get deliveryAddressZipCode() {
    return this.formGroupCheckout.get('deliveryAddress.zipCode');
  }

  // Getters for the payment Address section 
  get paymentAddressAvenue() {
    return this.formGroupCheckout.get('paymentAddress.street');
  }
  get paymentAddressCity() {
    return this.formGroupCheckout.get('paymentAddress.city');
  }
  get paymentAddressState() {
    return this.formGroupCheckout.get('paymentAddress.state');
  }
  get paymentAddressCountry() {
    return this.formGroupCheckout.get('paymentAddress.country');
  }
  get paymentAddressZipCode() {
    return this.formGroupCheckout.get('paymentAddress.zipCode');
  }

  // Getters for the credit card section 
  get creditCardType() {
    return this.formGroupCheckout.get('cardDetails.cardType');
  }
  get creditCardHolderName() {
    return this.formGroupCheckout.get('cardDetails.cardHolderName');
  }
  get creditCardNumber() {
    return this.formGroupCheckout.get('cardDetails.cardNumber');
  }
  get creditCardVerificationCode() {
    return this.formGroupCheckout.get('cardDetails.CVV');
  }
  get creditCardExpiryMonth(){
    return this.formGroupCheckout.get('cardDetails.expiryMonth');
  }
  get creditCardExpiryYear(){
    return this.formGroupCheckout.get('cardDetails.expiryYear');
  }

  manageYearsAndMonths() {
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
    else {
      this.formGroupCheckout.controls['paymentAddress'].reset();

      this.paymentAddressStates = [];
    }
  }

  submitPurchase() {
    console.log("we are handling purchase submissison");

    if (this.formGroupCheckout.invalid) {
      this.formGroupCheckout.markAllAsTouched();
    }

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
