import { Component, OnInit } from '@angular/core';
import {FormBuilder, FormControl, FormGroup, Validators} from '@angular/forms';
import {Router} from '@angular/router';
import {Order, OrderService} from '../../../../../services/order.service';

@Component({
  selector: 'app-payment',
  templateUrl: './payment.page.html',
  styleUrls: ['./payment.page.scss'],
})
export class PaymentPage implements OnInit {
  validationsForm: FormGroup;
  constructor(public formBuilder: FormBuilder,
              private orderService: OrderService,
              private router: Router) { }

  validationMessages = {
    cardHolder: [
      { type: 'required', message: 'Card Name is required.' },
      { type: 'minlength', message: 'Card Name must be at least 3 characters long.' },
      { type: 'maxlength', message: 'Card Name cannot be more than 25 characters long.' }
    ],
    cardNo: [
      { type: 'required', message: 'CardNo is required.' },
      { type: 'minlength', message: 'CardNo must be at least 19 characters long.' },
      { type: 'maxlength', message: 'CardNo cannot be more than 19 characters long.' }
    ],
    expiry: [
      { type: 'required', message: 'Expiry is required.' },
      { type: 'minlength', message: 'Expiry must be at least 5 characters long.' },
      { type: 'maxlength', message: 'Expiry cannot be more than 5 characters long.' }
    ],
    cvc: [
      { type: 'required', message: 'CVC password is required.' },
      { type: 'minlength', message: 'CVC must be at least 3 characters long.' },
      { type: 'maxlength', message: 'CVC cannot be more than 3 characters long.' }
    ]
  };

  ngOnInit() {
    this.initElements('', '', '', '');
  }
  initElements(no: string, ex: string, name: string, cvc: string) {
    this.validationsForm = this.formBuilder.group({
      cardHolder: new FormControl(name, Validators.compose([
        Validators.maxLength(25),
        Validators.minLength(3),
        // Validators.pattern('^(?=.*[a-zA-Z])(?=.*[0-9])[a-zA-Z0-9]+$'),
        Validators.required
      ])),
      cardNo: new FormControl(no, Validators.compose([
        Validators.required,
        Validators.minLength(19),
        Validators.maxLength(19)
      ])),
      expiry: new FormControl(ex, Validators.compose([
        Validators.required,
        Validators.minLength(5),
        Validators.maxLength(5)
      ])),
      cvc: new FormControl(cvc, Validators.compose([
        Validators.required,
        Validators.minLength(3),
        Validators.maxLength(3)
      ]))
    });
  }

  onSubmit(values) {
    console.log(values);
    const order: Order = this.orderService.order;
    console.log(order);
    this.orderService.addOrder(order)
        .then(data => {
          order.id = data.id;
          this.orderService.updateOrder(order)
              .then(d => {
                console.log(order);
                this.router.navigate(['user-dashboard']);
              });
        });
  }
  cardNoChange($event) {
    if ($event.detail.value.length === 4 || $event.detail.value.length === 9 || $event.detail.value.length === 14) {
      this.initElements($event.detail.value + ' ', '', this.validationsForm.value.cardHolder, this.validationsForm.value.cvc);
    }
  }
  addDash() {
    const bb: string = this.validationsForm.value.expiry.replace('/', '');
    // first remove previous spaces
    // this.textNumber = this.textNumber.replace('/', '');

    // then add space (or any char) after second (or any "n-th") position
    const value = this.chunk(bb, 2).join('/');
    this.initElements(this.validationsForm.value.cardNo, value, this.validationsForm.value.cardHolder, this.validationsForm.value.cvc);
  }
  addSpace() {
    const bb: string = this.validationsForm.value.cardNo.replace(/\s/g, '');
    // first remove previous spaces
    // this.textNumber = this.textNumber.replace(/\s/g, '');

    // then add space (or any char) after second (or any "n-th") position
    const value = this.chunk(bb, 4).join(' ');
    this.initElements(value, this.validationsForm.value.expiry, this.validationsForm.value.cardHolder, this.validationsForm.value.cvc);
  }

  // validate and only allow numbers
  validate(event) {
    return event.charCode >= 48 && event.charCode <= 57;
  }

  chunk(str: any, position: number) {
    const ret = [];
    let i;
    let len;

    for (i = 0, len = str.length; i < len; i += position) {
      ret.push(str.substr(i, position));
    }

    return ret;
  }
}
