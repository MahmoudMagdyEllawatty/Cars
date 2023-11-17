import { Component, OnInit } from '@angular/core';
import {Order, OrderService} from '../../../services/order.service';
import {ActivatedRoute} from '@angular/router';
import {User} from '../../../services/user.service';

@Component({
  selector: 'app-details',
  templateUrl: './details.page.html',
  styleUrls: ['./details.page.scss'],
})
export class DetailsPage implements OnInit {
  order: Order;
  constructor(private activatedRoute: ActivatedRoute,
              private orderService: OrderService) { }

  ngOnInit() {
    const user1: User = {
      name: '',
      state: 0,
      id: '',
      uId: ''
    };
    this.order = {
      state: 0,
      user: user1,
      id: '',
      carUser: null,
      car: null
    };
    const id = this.activatedRoute.snapshot.paramMap.get('id');
    console.log(id);
    this.orderService.getOrderById(id)
        .subscribe(data => {
          this.order = data;
        });
  }

}
