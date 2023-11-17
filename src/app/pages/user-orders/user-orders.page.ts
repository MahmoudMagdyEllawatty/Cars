import { Component, OnInit } from '@angular/core';
import {Observable} from 'rxjs';
import {Order, OrderService} from '../../services/order.service';
import {UserService} from '../../services/user.service';

@Component({
  selector: 'app-user-orders',
  templateUrl: './user-orders.page.html',
  styleUrls: ['./user-orders.page.scss'],
})
export class UserOrdersPage implements OnInit {
  orders: Order[];
    // tslint:disable-next-line:variable-name
    order_value = 'my_orders';
  constructor(private orderService: OrderService,
              private userService: UserService) { }

  ngOnInit() {
    this.loadOrders();
  }
  loadOrders() {
      this.orderService.getOrders()
          .subscribe(data => {
              this.orders = [];
              data.forEach(item => {
                  if (this.order_value === 'my_orders') {
                      if (item.carUser.id === this.userService.user.id) {
                          this.orders.push(item);
                      }
                  } else {
                      if (item.user.id === this.userService.user.id) {
                          this.orders.push(item);
                      }
                  }
              });
          });
  }

  changeOrders(event) {
      this.loadOrders();
  }

}
