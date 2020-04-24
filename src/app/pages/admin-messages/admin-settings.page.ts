import { Component, OnInit } from '@angular/core';
import {FormBuilder, FormControl, FormGroup, Validators} from '@angular/forms';
import {Message, MessageUsers, SettingsService} from '../../services/settings.service';
import {User, UserService} from '../../services/user.service';
import {Observable} from 'rxjs';
import {AlertController, ToastController} from '@ionic/angular';
import {Service} from '../../services/service.service';

@Component({
  selector: 'app-admin-settings',
  templateUrl: './admin-settings.page.html',
  styleUrls: ['./admin-settings.page.scss'],
})
export class AdminSettingsPage implements OnInit {
  form: FormGroup;
  users: User[];
  id: string;
  messages: Observable<Message[]>;
  constructor(private formBuilder: FormBuilder,
              private userService: UserService,
              private toastCtrl: ToastController,
              private alertCtrl: AlertController,
              private settingsService: SettingsService) { }

  validationMessages = {
    text: [
      {type: 'required', message: 'Message is required'}
    ]
  };
  ngOnInit() {
    this.userService.getUsers()
        .subscribe(data => {
          this.users = data;
        });

    this.messages = this.settingsService.getMessages();
    this.id = '';
    this.initForm('');
  }


  initForm(text) {
    this.form = this.formBuilder.group({
      text: new FormControl(text, Validators.compose([
        Validators.required
      ]))
    });
  }
  edit(service: Message) {
    this.id = service.id;
    console.log(service);
    this.initForm(service.message);
  }

  async delete(service: Message) {
    const alert1 = await this.alertCtrl.create({
      header: 'Delete Message',
      message: 'Are you sure?',
      buttons: [
        {
          text: 'Cancel',
          role: 'cancel',
          cssClass: 'secondary'
        } , {
          text: 'Delete',
          cssClass: 'danger',
          handler: () => {
            this.settingsService.deleteService(service)
                .then(data => {
                  this.showToast('Deleted');
                }).catch(e => {
              this.showToast(e);
            });
          }
        }
      ]
    });

    await alert1.present();
  }
  submit(value: any) {
    const messageUsers1: MessageUsers[] = [];
    this.users.forEach(user => {
      const messageUser: MessageUsers = {
        userId: user.id,
        state: 0
      };
      messageUsers1.push(messageUser);
    });
    const message: Message = {
      id: this.id,
      message: value.text,
      messageUsers: messageUsers1
    };

    if (this.id === '') {
      this.settingsService.addOrder(message)
          .then(data => {
            message.id = data.id;
            this.settingsService.updateOrder(message)
                .then(ddd => {
                  this.showToast('sent');
                  this.form = this.formBuilder.group({
                    text: new FormControl('', Validators.compose([
                      Validators.required
                    ]))
                  });
                });
          });
    } else {
      this.settingsService.updateOrder(message)
          .then(data => {
                  this.showToast('sent');
                  this.initForm('');
                  this.id = '';
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
