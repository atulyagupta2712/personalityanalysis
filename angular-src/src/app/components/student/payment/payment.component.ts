import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../../services/auth.service';
import { Router } from '@angular/router';
import { FlashMessagesService } from 'angular2-flash-messages';
import { ValidateService } from '../../../services/validate.service';
declare var Stripe: any;

@Component({
  selector: 'app-payment',
  templateUrl: './payment.component.html',
  styleUrls: ['./payment.component.css']
})
export class PaymentComponent implements OnInit {
  token: any;
  errorMessage: any;
  card: any;
  stripe: any;
  name: String;
  email: String;
  phone: String;
  constructor(
    private authService: AuthService,
    private router: Router,
    private flashMessage: FlashMessagesService,
    private validateService: ValidateService
  ) {
    this.stripe = Stripe('pk_test_I32VCJrtM0eb7ODqvmc3CxD800a2ApWknx');
    this.registerElements = this.registerElements.bind(this);
  }

  ngOnInit() {
    var elements = this.stripe.elements();
    this.card = elements.create("card", {
      iconStyle: "solid",
      style: {
        base: {
          iconColor: "#fff",
          color: "#fff",
          fontWeight: 400,
          fontFamily: "Helvetica Neue, Helvetica, Arial, sans-serif",
          fontSize: "16px",
          fontSmoothing: "antialiased",

          "::placeholder": {
            color: "#BFAEF6"
          },
          ":-webkit-autofill": {
            color: "#fce883"
          }
        },
        invalid: {
          iconColor: "#FFC7EE",
          color: "#FFC7EE"
        }
      }
    });
    this.card.mount('#example5-card');
    var paymentRequest = this.stripe.paymentRequest({
      country: "US",
      currency: "usd",
      total: {
        amount: 2500,
        label: "Total"
      },
      requestShipping: true,
      shippingOptions: [
        {
          id: "free-shipping",
          label: "Free shipping",
          detail: "Arrives in 5 to 7 days",
          amount: 0
        }
      ]
    });
    paymentRequest.on("token", function (result) {
      var example = document.querySelector(".example5");
      this.token = result.token.id;
      console.log("token--", this.token);
      example.classList.add("submitted");
      result.complete("success");
    });

    var paymentRequestElement = elements.create("paymentRequestButton", {
      paymentRequest: paymentRequest,
      style: {
        paymentRequestButton: {
          theme: "light"
        }
      }
    });

    paymentRequest.canMakePayment().then(function (result) {
      if (result) {
        paymentRequestElement.mount("#example5-paymentRequest");
      }
    });

    this.registerElements([this.card], "example5");

  }

  registerElements(elements, exampleName) {
    var formClass = '.' + exampleName;
    var example = document.querySelector(formClass);

    var form = example.querySelector('form');
    // Listen for errors from each Element, and show error messages in the UI.
    let savedErrors = {};
    let err;
    elements.forEach((element, idx) => {
      element.on('change', (event) => {
        if (event) {
          if (event.error) {
            savedErrors[idx] = event.error.message;
            err = event.error.message;
          } else {
            savedErrors[idx] = null;
            // Loop over the saved errors and find the first one, if any.
            var nextError = Object.keys(savedErrors)
              .sort()
              .reduce(function (maybeFoundError, key) {
                return maybeFoundError || savedErrors[key];
              }, null);
            if (nextError) {
              // Now that they've fixed the current error, show another one.
              err = nextError;
            } else {
              // The user fixed the last error; no more errors.
              err = "";
            }
          }
        }
        this.errorMessage = err;
      });
    });


  }

  onPaySubmit() {
    const user = {
      name: this.name,
      email: this.email,
      phone: this.phone,
    };
    this.stripe.createToken(this.card).then(result => {
      if (result.error) {
        console.log('Error creating payment method.');
      } else {
        // At this point, you should send the token ID
        // to your server so it can attach
        // the payment source to a customer
        console.log('Token acquired!');
        console.log(result.token);
        console.log(result.token.id);
        if(result.token){
          if (!this.validateService.validatePay(user)) {
            this.flashMessage.show("Please fill in all the fields", { cssClass: 'alert-danger', timeout: 4000 });
          } else if (!this.validateService.validateEmail(user.email)) {
            this.flashMessage.show("Please type a valid email", { cssClass: 'alert-danger', timeout: 4000 })
          }
          else {
            this.flashMessage.show("Payment successful", { cssClass: 'alert-success', timeout: 4000 });
            this.router.navigate(['chatroom'])
          }
        }
      }
    });

  }

}
