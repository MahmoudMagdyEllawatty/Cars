import { Component, OnInit } from '@angular/core';
import {Observable} from 'rxjs';
import {Package, PackageService} from '../../services/package.service';
import {Router} from '@angular/router';
import {AlertController, ToastController} from '@ionic/angular';
import {TranslateConfigService} from '../../services/translate-config.service';

@Component({
  selector: 'app-packages',
  templateUrl: './packages.page.html',
  styleUrls: ['./packages.page.scss'],
})
export class PackagesPage implements OnInit {
  packages: Observable<Package[]>;
  lang = '';
  constructor(private packageService: PackageService,
              private alertCtrl: AlertController,
              private toastCtrl: ToastController,
              private translateService: TranslateConfigService,
              private router: Router) { }

  ngOnInit() {
    this.packages = this.packageService.getPackages();
    this.lang = this.translateService.selected;
    console.log(this.lang);
  }

  async delete(aPackage: Package) {
    const alert1 = await this.alertCtrl.create({
      header: 'Delete Package',
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
            this.packageService.deletePackage(aPackage)
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

  view(aPackage: Package) {
    this.router.navigate(['/view-package', aPackage.id]);
  }

  async showToast(msg: string) {
    const toast = await this.toastCtrl.create({
      message: msg,
      duration: 2000
    });
    toast.present();
  }
}
