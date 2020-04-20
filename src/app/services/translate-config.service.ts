import { Injectable } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import {Platform} from '@ionic/angular';
import { Storage} from '@ionic/storage';

const LNG_KEY = 'SELECTED_LANGUAGE';
@Injectable({
  providedIn: 'root'
})
export class TranslateConfigService {
  selected = '';
  constructor(
      private translate: TranslateService,
      private storage: Storage,
      private plt: Platform
  ) { }

  setInitialAppLanguage() {
    const language = this.translate.getBrowserLang();
    this.translate.setDefaultLang(language);
    this.storage.get(LNG_KEY).then(val => {
      if (val) {
        this.setLanguage(val);
        this.selected = val;
      }
    });
  }

  getLanguages() {
    return [
      { text : 'English', value: 'en'},
      { text : 'العربية', value: 'ar'},
    ];
  }

  setLanguage(setLang) {
    this.translate.use(setLang);
    this.selected = setLang;
    this.storage.set(LNG_KEY, setLang);
  }
}
