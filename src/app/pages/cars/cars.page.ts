import { Component, OnInit } from '@angular/core';
import {Observable} from 'rxjs';
import {Car, CarsService} from '../../services/cars.service';
import {Service} from '../../services/categories.service';
import {AlertController, ToastController} from '@ionic/angular';

@Component({
  selector: 'app-cars',
  templateUrl: './cars.page.html',
  styleUrls: ['./cars.page.scss'],
})
export class CarsPage implements OnInit {
  cars: Observable<Car[]>;
  exist = false;
  constructor(private carService: CarsService,
              private toastCtrl: ToastController,
              private alertCtrl: AlertController) { }

  ngOnInit() {
    this.cars = this.carService.getCars();
    this.cars.subscribe((data) => {
      this.exist = true;
    });
  }

  async delete(service: Car) {
    const alert1 = await this.alertCtrl.create({
      header: 'Delete Car',
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
            this.carService.deleteOrder(service)
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

  async showToast(msg: string) {
    const toast = await this.toastCtrl.create({
      message: msg,
      duration: 2000
    });
    toast.present();
  }

}
