import { Component, OnInit } from '@angular/core';
import {UserService} from '../../services/user.service';
import {AuthService} from '../../services/auth.service';
import {LoadingController, PopoverController, ToastController} from '@ionic/angular';
import {Router} from '@angular/router';
import {TranslateConfigService} from '../../services/translate-config.service';
import {LanguagePopoverPage} from '../language-popover/language-popover.page';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit {

  email: string;
  password: string;
  constructor(private userService: UserService,
              private router: Router,
              private toastCtrl: ToastController,
              private loadingController: LoadingController,
              private popCtrl: PopoverController,
              private translateConfigService: TranslateConfigService,
              private auth: AuthService) {

  }

    async openLanguagePopover(evt) {
        const popover = await this.popCtrl.create({
            component: LanguagePopoverPage,
            event: evt
        });
        await popover.present();
    }
  ngOnInit() {
      console.log(this.translateConfigService.selected);
      console.log('dd');
      this.email = '';
      this.password = '';
  }

  async login() {
    const loading = await this.loadingController.create({
      spinner: 'bubbles'
    });
    await loading.present();
    if (this.email === 'admin@cars.com' && this.password === '1234567') {
      await loading.dismiss();
      this.router.navigate(['/admin-dashboard']);
    } else {
      this.auth.login(this.email, this.password)
          .then(data => {
              console.log(data);
              data.user.getIdToken()
                .then(data1 => {
                    this.userService.getUsers()
                      .subscribe(users => {
                          let exist = false;
                          console.log(users);
                          if (users.length > 0) {
                             users.forEach(user => {
                                 if (user.uId === data.user.uid) {
                                     exist = true;
                                     this.userService.user = user;
                                     loading.dismiss();
                                     this.router.navigate(['user-dashboard']);
                                     return;
                                 }
                             });
                             if (!exist) {
                                 loading.dismiss();
                                 this.showToast('invalid email or password');
                             }
                          } else {
                              loading.dismiss();
                              this.showToast('invalid email or password');
                        }
                      });
                }).catch(e => {
                    console.log(e);
                    loading.dismiss();
                    this.showToast('invalid email or password');
            });

          }).catch(e => {
          this.showToast(e);
          loading.dismiss();
      });
    }
  }

    async showToast(msg: string) {
        const toast = await this.toastCtrl.create({
            message: msg,
            duration: 2000
        });
        toast.present();
    }
}
