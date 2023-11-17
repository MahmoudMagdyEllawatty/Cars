import { Component, OnInit } from '@angular/core';
import {Observable} from 'rxjs';
import {Order, OrderService} from '../../services/order.service';
import {Router} from '@angular/router';

@Component({
  selector: 'app-admin-orders',
  templateUrl: './admin-orders.page.html',
  styleUrls: ['./admin-orders.page.scss'],
})
export class AdminOrdersPage implements OnInit {
  orders: Observable<Order[]>;
  constructor(private orderService: OrderService,
              private router: Router) { }

  ngOnInit() {
    this.orders = this.orderService.getOrders();
  }

  openDetails(order: Order) {
    const url = 'admin-dashboard/tab4/details/' + order.id ;
    if (order.state === 1) {
      this.router.navigate([url]);
    } else {
      order.state = 1;
      this.orderService.updateOrder(order)
          .then(data => {
            this.router.navigate([url]);
          });
    }
  }
}
