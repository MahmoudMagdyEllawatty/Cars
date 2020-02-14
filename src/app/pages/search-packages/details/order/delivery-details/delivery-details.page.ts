import { Component, OnInit } from '@angular/core';
import {FormBuilder, FormControl, FormGroup, Validators} from '@angular/forms';
import {OrderService} from '../../../../../services/order.service';
import {ActivatedRoute, Router} from '@angular/router';
import {PackageService} from '../../../../../services/package.service';

@Component({
  selector: 'app-delivery-details',
  templateUrl: './delivery-details.page.html',
  styleUrls: ['./delivery-details.page.scss'],
})
export class DeliveryDetailsPage implements OnInit {
  formGroup: FormGroup;
  id: string;
  validationMessages = {
    phone: [
      {type: 'required', message: 'Phone is required'}
    ],
    address: [
      {type: 'required', message: 'Address is required'},
      {type: 'minLength', message: 'Address must be greater than 5 chars'},
      {type: 'maxLength', message: 'Address must be less than 50 chars'}
    ],
    date: [
      {type: 'required', message: 'Date is required'}
    ],
    time: [
      {type: 'required', message: 'Date is required'}
    ]
  };

  constructor(private builder: FormBuilder,
              private orderService: OrderService,
              private router: Router,
              private activatedRoute: ActivatedRoute,
              private packageService: PackageService) { }

  ngOnInit() {
    this.id = this.activatedRoute.snapshot.paramMap.get('id');
    this.initForm();
  }

  initForm() {
    this.formGroup = this.builder.group({
      phone: new FormControl('', Validators.compose([
        Validators.required
      ])),
      address: new FormControl('', Validators.compose([
        Validators.required,
        Validators.minLength(5),
        Validators.maxLength(50)
      ])),
      date: new FormControl('', Validators.compose([
        Validators.required
      ])),
      time: new FormControl('', Validators.compose([
        Validators.required
      ]))
    });
  }

  sumbit(value: any) {
    const date = value.date.substr(0, value.date.indexOf('T'));
    const time = value.time.substr(value.time.indexOf('T') + 1, value.time.indexOf('.') - value.time.indexOf('T') - 4);
    const order = this.orderService.order;
    order.time = time;
    order.phone = value.phone;
    order.date = date;
    order.address = value.address;

    this.orderService.order = order;

    const url = 'user-dashboard/tab1/details/' + this.id + '/order/payment';
    this.router.navigate([url]);
  }
}
