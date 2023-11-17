import { Component, OnInit } from '@angular/core';
import {SettingsService} from '../../services/settings.service';
import {UserService} from '../../services/user.service';
import {Router} from '@angular/router';

@Component({
  selector: 'app-user-dashboard',
  templateUrl: './user-dashboard.page.html',
  styleUrls: ['./user-dashboard.page.scss'],
})
export class UserDashboardPage implements OnInit {

  unreadCount: number;
  constructor(private messageService: SettingsService,
              private router: Router,
              private userService: UserService) { }

  ngOnInit() {
          this.unreadCount = 0;
          this.messageService.getMessages()
              .subscribe(data => {
                  this.unreadCount = 0;
                  data.forEach(item => {
                      item.messageUsers.forEach(user => {
                          if (user.userId === this.userService.user.id && user.state === 0) {
                              this.unreadCount += 1;
                          }
                      });
                  });
                  console.log(this.unreadCount);
              });
  }

}
