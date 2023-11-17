import {Component, ElementRef, OnInit, ViewChild} from '@angular/core';
import {Observable} from 'rxjs';
import {Files, Service, CategoriesService} from '../../services/categories.service';
import {ServiceGroup, ServiceGroupService} from '../../services/service-group.service';
import {FormBuilder, FormControl, FormGroup, Validators} from '@angular/forms';
import {AlertController, LoadingController, PopoverController, ToastController} from '@ionic/angular';
import {LanguagePopoverPage} from '../language-popover/language-popover.page';
import {FileService} from '../../services/file.service';
import {OrderService} from '../../services/order.service';
import {PackageService} from '../../services/package.service';

@Component({
  selector: 'app-services',
  templateUrl: './categories.page.html',
  styleUrls: ['./categories.page.scss'],
})
export class CategoriesPage implements OnInit {
  services: Observable<Service[]>;

  form: FormGroup;
  id: string;

  validationMessages = {
    name: [
      {type: 'required', message: 'Brand Name is required'},
      {type: 'minLength', message: 'Brand Name must be greater than 3 chars'},
      {type: 'maxLength', message: 'Brand Name must be less than 100 chars'}
    ],
  };

  constructor(private serviceService: CategoriesService,
              private builder: FormBuilder,
              private loadingCtrl: LoadingController,
              private toastCtrl: ToastController,
              private alertCtrl: AlertController,
              private popCtrl: PopoverController,
              private fileService: FileService,
              private orderService: PackageService,
              private serviceGroupService: ServiceGroupService) { }
  ngOnInit() {
    this.services = this.serviceService.getServices();
    this.id = '';
    this.initForm('');
  }

  // compareWith(o1, o2) {
  //   return o1 && o2 ? o1.id === o2.id : o1 === o2;
  // }

  initForm(name: string) {
    this.form = this.builder.group({
      name: new FormControl(name, Validators.compose([
          Validators.required,
          Validators.minLength(3),
          Validators.maxLength(25)
      ]))
    });
  }

  edit(service: Service) {
    this.id = service.id;
    this.initForm(service.name);
  }

  async delete(service: Service) {
    const alert1 = await this.alertCtrl.create({
      header: 'Delete Brand',
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
            this.serviceService.deleteService(service)
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

 async submit(value: any) {
    console.log(value);
    const loading = await this.loadingCtrl.create({
      spinner: 'bubbles'
    });
    await loading.present();
    const service1: Service = {
      id: this.id,
      name: value.name
    };

    if (this.id === '') {
      this.serviceService.addService(service1)
          .then(data => {
            service1.id = data.id;
            this.serviceService.updateService(service1)
                .then(d => {
                  this.id = '';
                  const group: ServiceGroup = {
                    id: '',
                    name: ''
                  };
                  this.initForm('');
                  loading.dismiss();
                  this.showToast('Brand Saved');
                });
          });
    } else {
      this.serviceService.updateService(service1)
          .then(d => {
            this.id = '';
            const group: ServiceGroup = {
              id: '',
              name: ''
            };
            this.initForm('');
            this.orderService.getPackages()
                .subscribe(data => {
                   data.forEach(item => {
                     let index1 = 0;
                     item.packageServices.forEach(pack => {
                       let index = 0;
                       pack.services.forEach(ser => {
                         if (ser.id === service1.id) {
                             ser = service1;
                             pack.services[index] = ser;
                             item.packageServices[index1] = pack;
                             this.orderService.updatePackage(item);
                         }
                         index += 1;
                       });
                       index1 += 1;
                     });
                   });
                });
            loading.dismiss();
            this.showToast('Service Updated');
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
