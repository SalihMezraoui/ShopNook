import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';

@Component({
  selector: 'app-checkout',
  templateUrl: './checkout.component.html',
  styleUrls: ['./checkout.component.css']
})
export class CheckoutComponent implements OnInit {

  formGroupCheckout!: FormGroup;

  sumPrice: number = 0;
  sumQuantity: number = 0;

  constructor(private formBuilder: FormBuilder) {}

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
