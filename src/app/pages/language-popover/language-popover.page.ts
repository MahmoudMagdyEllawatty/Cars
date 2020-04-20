import { Component, OnInit } from '@angular/core';
import {PopoverController} from '@ionic/angular';
import {TranslateConfigService} from '../../services/translate-config.service';

@Component({
  selector: 'app-language-popover',
  templateUrl: './language-popover.page.html',
  styleUrls: ['./language-popover.page.scss'],
})
export class LanguagePopoverPage implements OnInit {

  languages = [];
  seelcted = '';
  constructor(private popCtrl: PopoverController,
              private langService: TranslateConfigService) { }

  ngOnInit() {
    this.languages = this.langService.getLanguages();
    this.seelcted = this.langService.selected;
  }

  select(lng) {
    this.langService.setLanguage(lng);
    this.popCtrl.dismiss();
  }

}
