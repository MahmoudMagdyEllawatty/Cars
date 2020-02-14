import { Component, OnInit } from '@angular/core';
import {FormBuilder, FormControl, FormGroup, Validators} from '@angular/forms';
import {Message, MessageUsers, SettingsService} from '../../services/settings.service';
import {User, UserService} from '../../services/user.service';
import {Observable} from 'rxjs';
import {AlertController, ToastController} from '@ionic/angular';

@Component({
  selector: 'app-admin-settings',
  templateUrl: './admin-settings.page.html',
  styleUrls: ['./admin-settings.page.scss'],
})
export class AdminSettingsPage implements OnInit {
  form: FormGroup;
  users: User[];
  messages: Observable<Message[]>;
  constructor(private formBuilder: FormBuilder,
              private userService: UserService,
              private toastCtrl: ToastController,
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

    this.form = this.formBuilder.group({
      text: new FormControl('', Validators.compose([
        Validators.required
      ]))
    });
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
      id: '',
      message: value.text,
      messageUsers: messageUsers1
    };

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
  }

  async showToast(msg: string) {
    const toast = await this.toastCtrl.create({
      message: msg,
      duration: 2000
    });
    toast.present();
  }
}
