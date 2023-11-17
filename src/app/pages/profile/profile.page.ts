import { Component, OnInit } from '@angular/core';
import {FormBuilder, FormControl, FormGroup, Validators} from '@angular/forms';
import {User, UserService} from '../../services/user.service';
import {Router} from '@angular/router';
import {LoadingController} from '@ionic/angular';
import {AuthService} from '../../services/auth.service';
import {PasswordValidator} from '../../validators/password.validator';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.page.html',
  styleUrls: ['./profile.page.scss'],
})
export class ProfilePage implements OnInit {
  validationsForm: FormGroup;
  matchingPasswordsGroup: FormGroup;

  name: string;
  email: string;
  password: string;
  user: User;
  constructor(private userService: UserService,
              private router: Router,
              public formBuilder: FormBuilder,
              public loadingController: LoadingController,
              private auth: AuthService) { }
  validationMessages = {
    username: [
      { type: 'required', message: 'Username is required.' },
      { type: 'minlength', message: 'Username must be at least 5 characters long.' },
      { type: 'maxlength', message: 'Username cannot be more than 25 characters long.' }
    ],
    email: [
      { type: 'required', message: 'Email is required.' },
      { type: 'pattern', message: 'Please enter a valid email.' }
    ],
  };
  ngOnInit() {
    this.user = this.userService.user;

    this.validationsForm = this.formBuilder.group({
      username: new FormControl(this.user.name, Validators.compose([
        Validators.maxLength(25),
        Validators.minLength(3),
        // Validators.pattern('^(?=.*[a-zA-Z])(?=.*[0-9])[a-zA-Z0-9]+$'),
        Validators.required
      ])),
      email: new FormControl(this.auth.getUserEmail(), Validators.compose([
        Validators.required,
        Validators.pattern('^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+.[a-zA-Z0-9-.]+$')
      ])),
    });
  }

  async register(values) {
    const loading = await this.loadingController.create({
      spinner: 'bubbles'
    });
    await loading.present();

    this.email = values.email;
    this.name = values.username;

    this.auth.updateEmail(this.email)
        .then(() => {
            const user1: User = {
              id: this.user.id,
              name: this.name,
              uId: this.user.uId,
              state: this.user.state
            };
            this.userService.updateUser(user1)
                .then(dd => {
                  this.userService.user = user1;
                  loading.dismiss();
                  this.router.navigate(['user-dashboard']);
                });


        });
  }

}
