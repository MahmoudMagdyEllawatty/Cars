import { Component, OnInit } from '@angular/core';
import {Package, PackageService} from '../../services/package.service';
import {LanguagePopoverPage} from '../language-popover/language-popover.page';
import {PopoverController, ToastController} from '@ionic/angular';
import {TranslateConfigService} from '../../services/translate-config.service';
import {UserService} from '../../services/user.service';
import {Car, CarsService} from '../../services/cars.service';

@Component({
  selector: 'app-search-packages',
  templateUrl: './search-packages.page.html',
  styleUrls: ['./search-packages.page.scss'],
})
export class SearchPackagesPage implements OnInit {
  cars: Car[];
  allCars: Car[];
  lang = '';
  userName = '';
  constructor(private carService: CarsService,
              private popCtrl: PopoverController,
              private userService: UserService,
              private translateService: TranslateConfigService) { }

  ngOnInit() {
    this.lang = this.translateService.selected;
    this.userName = this.userService.user.name;
    this.carService.getCars()
        .subscribe(data => {
            this.cars = [];
            this.allCars = [];
            data.forEach(item => {
              if (item.state === 1) {
                this.cars.push(item);
                this.allCars.push(item);
              }
            });
        });
  }

  search(ev: any) {
    this.cars = this.allCars;
    const searchTerm = ev.target.value;

    if (!searchTerm) {
      return;
    }

    this.cars = this.cars.filter(item => {
      if (item.name && searchTerm) {
        return item.name.toLowerCase().indexOf(searchTerm.toLowerCase()) > -1;
      }
    });

  }

  async openLanguagePopover(evt) {
    const popover = await this.popCtrl.create({
      component: LanguagePopoverPage,
      event: evt
    });
    await popover.present();
  }
}
