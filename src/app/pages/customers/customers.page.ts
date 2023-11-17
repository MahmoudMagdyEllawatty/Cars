import { Component, OnInit } from '@angular/core';
import {Observable} from 'rxjs';
import {User, UserService} from '../../services/user.service';

@Component({
  selector: 'app-customers',
  templateUrl: './customers.page.html',
  styleUrls: ['./customers.page.scss'],
})
export class CustomersPage implements OnInit {
  users: Observable<User[]>;
  exist = false;
  constructor(private userService: UserService) { }

  ngOnInit() {
    this.users = this.userService.getUsers();
    this.users.subscribe((data) => {
      this.exist = true;
    });
  }

}
