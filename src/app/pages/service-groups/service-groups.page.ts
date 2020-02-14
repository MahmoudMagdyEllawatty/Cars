import { Component, OnInit } from '@angular/core';
import {Observable} from 'rxjs';
import {ServiceGroup, ServiceGroupService} from '../../services/service-group.service';
import {FormBuilder, FormControl, FormGroup, Validators} from '@angular/forms';
import {AlertController, LoadingController, ToastController} from '@ionic/angular';

@Component({
  selector: 'app-service-groups',
  templateUrl: './service-groups.page.html',
  styleUrls: ['./service-groups.page.scss'],
})
export class ServiceGroupsPage implements OnInit {

  constructor(private serviceGroupService: ServiceGroupService,
              private loadingCtrl: LoadingController,
              private alertCtrl: AlertController,
              private toastCtrl: ToastController,
              private builder: FormBuilder) { }
  serviceGroups: Observable<ServiceGroup[]>;
  form: FormGroup;
  id: string;

  validationMessages = {
    name : [
      {type: 'required', message: 'Service Group Name is Required'},
      {type: 'minLength', message: 'Service Group Name must be greater than 5 chars'},
      {type: 'maxLength', message: 'Service Group Name must be less than 25 chars'}
    ]
  };

  ngOnInit() {
    this.serviceGroups = this.serviceGroupService.getServiceGroups();
    this.initForm('');
    this.id = '';
  }

  initForm(value: string) {
    this.form = this.builder.group({
      name: new FormControl(value, Validators.compose([
          Validators.required,
          Validators.minLength(5),
          Validators.maxLength(25)
      ]))
    });
  }

  async delete(serviceGroup: ServiceGroup) {
    const alert1 = await this.alertCtrl.create({
      header: 'Delete Service Group',
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
              this.serviceGroupService.deleteServiceGroup(serviceGroup)
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

  edit(serviceGroup: ServiceGroup) {
    this.initForm(serviceGroup.name);
    this.id = serviceGroup.id;
  }


  async save(value) {
    const loading = await this.loadingCtrl.create({
      spinner: 'bubbles'
    });
    await loading.present();


    const serviceGroup: ServiceGroup = {
      id: this.id,
      name: value.name
    };

    if (this.id === '') {
      this.serviceGroupService.addServiceGroup(serviceGroup)
          .then(data => {
            serviceGroup.id = data.id;
            this.serviceGroupService.updateServiceGroup(serviceGroup)
                .then(d => {
                  loading.dismiss();
                  this.showToast('Saved');
                  this.initForm('');
                  this.id = '';
                });
          }).catch(e => {
        loading.dismiss();
        this.showToast(e);
      });
    } else {
      this.serviceGroupService.updateServiceGroup(serviceGroup)
          .then(d => {
            loading.dismiss();
            this.showToast('Updated');
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
