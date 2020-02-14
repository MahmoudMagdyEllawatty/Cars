import { Component, OnInit } from '@angular/core';
import {User, UserService} from '../../services/user.service';
import {AuthService} from '../../services/auth.service';
import {FormBuilder, FormControl, FormGroup, Validators} from '@angular/forms';
import {PasswordValidator} from '../../validators/password.validator';
import {LoadingController} from '@ionic/angular';
import {Router} from '@angular/router';

@Component({
  selector: 'app-register',
  templateUrl: './register.page.html',
  styleUrls: ['./register.page.scss'],
})
export class RegisterPage implements OnInit {
    validationsForm: FormGroup;
    matchingPasswordsGroup: FormGroup;

  name: string;
  email: string;
  password: string;
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
        password: [
            { type: 'required', message: 'Password is required.' },
            { type: 'minlength', message: 'Password must be at least 5 characters long.' }
        ],
        confirm_password: [
            { type: 'required', message: 'Confirm password is required.' }
        ],
        matching_passwords: [
            { type: 'areEqual', message: 'Password mismatch.' }
        ],
    };
  ngOnInit() {
      this.matchingPasswordsGroup = new FormGroup({
          password: new FormControl('', Validators.compose([
              Validators.minLength(5),
              Validators.required
          ])),
          confirm_password: new FormControl('', Validators.required)
      }, (formGroup: FormGroup) => {
          return PasswordValidator.areEqual(formGroup);
      });

      this.validationsForm = this.formBuilder.group({
          username: new FormControl('', Validators.compose([
              Validators.maxLength(25),
              Validators.minLength(3),
              // Validators.pattern('^(?=.*[a-zA-Z])(?=.*[0-9])[a-zA-Z0-9]+$'),
              Validators.required
          ])),
          email: new FormControl('', Validators.compose([
              Validators.required,
              Validators.pattern('^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+.[a-zA-Z0-9-.]+$')
          ])),
          matching_passwords: this.matchingPasswordsGroup
      });
  }

  async register(values) {
      const loading = await this.loadingController.create({
          spinner: 'bubbles'
      });
      await loading.present();

      this.email = values.email;
      this.password = values.matching_passwords.password;
      this.name = values.username;
      this.auth.register(this.email, this.password)
        .then(data => {

            data.user.getIdToken().then(data2 => {
                const user: User = {
                    id: data2,
                    name: this.name,
                    uId: data.user.uid
                };

                this.userService.addUser(user)
                    .then(u => {
                        user.id = u.id;
                        this.userService.updateUser(user)
                            .then(dd => {
                                this.userService.setUser(user);
                                loading.dismiss();
                                this.router.navigate(['user-dashboard']);
                            });

                    }).catch(e => {
                    console.log(e);
                });

            });
        }).catch(e => {
        console.log(e);
        loading.dismiss();
    });
  }

}
