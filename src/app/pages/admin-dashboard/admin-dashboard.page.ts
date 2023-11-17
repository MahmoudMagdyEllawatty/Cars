import { Component, OnInit } from '@angular/core';
import {OrderService} from '../../services/order.service';



@Component({
  selector: 'app-admin-dashboard',
  templateUrl: './admin-dashboard.page.html',
  styleUrls: ['./admin-dashboard.page.scss'],
})
export class AdminDashboardPage implements OnInit {
  unreadCount: number;
  constructor(private orderService: OrderService) { }

  ngOnInit() {
    this.unreadCount = 0;
    this.orderService.getOrders()
        .subscribe(data => {
          this.unreadCount = 0;
          data.forEach(item => {
            if (item.state === 0) {
              this.unreadCount += 1;
            }
          });
          console.log(this.unreadCount);
        });
  }

}
