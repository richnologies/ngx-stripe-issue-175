import { Component, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

import { StripeCardElementOptions, StripeElementsOptions } from '@stripe/stripe-js';
import { StripeCardComponent, StripeService } from 'ngx-stripe';

@Component({
  selector: 'app-root',
  template: `
    <form
      id="card-form"
      novalidate
      (ngSubmit)="stripePayment($event)"
      [formGroup]="stripeForm"
    >
      <input
        type="text"
        class="form-control"
        formControlName="name"
        placeholder="Name on card"
      />
      <ngx-stripe-card
        [options]="cardOptions"
        [elementsOptions]="elementsOptions"
        (error)="onError($event)"
      ></ngx-stripe-card>
      <button type="submit" id="payment-btn" class="btn btn-success">
        Make Payment
      </button>
    </form>
  `,
})
export class AppComponent {
  @ViewChild(StripeCardComponent, { static: false }) card!: StripeCardComponent;

  stripeForm!: FormGroup;

  elementsOptions: StripeElementsOptions = {
    locale: 'he',
  };

  cardOptions: StripeCardElementOptions = {
    style: {
      base: {
        iconColor: '#888',
        color: '#000',
        fontWeight: '300',
        fontFamily: '"Rubik", Helvetica, sans-serif',
        fontSize: '16px',
        '::placeholder': {
          color: '#888',
        },
      },
    },
  };

  constructor(
    private formBuilder: FormBuilder,
    private stripeService: StripeService
  ) {}

  ngOnInit() {
    this.stripeForm = this.formBuilder.group({
      name: ['', [Validators.required]],
    });
  }

  stripePayment(ev: Event) {
    const { name } = this.stripeForm.value;

    this.stripeService
      .createToken(this.card.getCard(), { name })
      .subscribe((result) => {
        if (result.token) {
          // do something
          alert('Token ' + JSON.stringify(result.token));
        }
      });
  }

  onError(err: any) {
    alert(err);
  }
}
