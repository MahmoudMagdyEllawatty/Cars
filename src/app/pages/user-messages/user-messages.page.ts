import { Component, OnInit } from '@angular/core';
import {Message, SettingsService} from '../../services/settings.service';
import {UserService} from '../../services/user.service';

export class MessageState {
  message: Message;
  state: number;
}
@Component({
  selector: 'app-user-messages',
  templateUrl: './user-messages.page.html',
  styleUrls: ['./user-messages.page.scss'],
})
export class UserMessagesPage implements OnInit {
  messages: MessageState[];
  constructor(private messageService: SettingsService,
              private userService: UserService) { }

  ngOnInit() {
    this.messageService.getMessages()
        .subscribe(data => {
          this.messages = [];
          data.forEach(item => {
            item.messageUsers.forEach(user => {
              if (user.userId === this.userService.user.id) {
                const messageState: MessageState = {
                  message: item,
                  state: user.state
                };
                this.messages.push(messageState);
              }
            });
          });
        });
  }

  read(msg: MessageState) {
    const message = msg.message;
    message.messageUsers.forEach(data => {
      if (data.userId === this.userService.user.id) {
        data.state = 1;
      }
    });

    console.log(message);
    this.messageService.updateOrder(message)
        .then(data => {

        });
  }
}
