import { Component, OnInit } from '@angular/core';
import {UserService} from '../../services/user.service';
import {Router} from '@angular/router';

@Component({
  selector: 'app-terms',
  templateUrl: './terms.page.html',
  styleUrls: ['./terms.page.scss'],
})
export class TermsPage implements OnInit {

  constructor(private userService: UserService,
              private router: Router) { }

  ngOnInit() {
  }

  accept() {
    this.userService.user.state = 1;
    this.userService.updateUser(this.userService.user)
        .then(data => {
          this.router.navigate(['/user-dashboard']);
        });
  }

}
