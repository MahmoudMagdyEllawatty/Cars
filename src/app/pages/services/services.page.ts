import {Component, ElementRef, OnInit, ViewChild} from '@angular/core';
import {Observable} from 'rxjs';
import {Files, Service, ServiceService} from '../../services/service.service';
import {ServiceGroup, ServiceGroupService} from '../../services/service-group.service';
import {FormBuilder, FormControl, FormGroup, Validators} from '@angular/forms';
import {AlertController, LoadingController, PopoverController, ToastController} from '@ionic/angular';
import {LanguagePopoverPage} from '../language-popover/language-popover.page';
import {FileService} from '../../services/file.service';

@Component({
  selector: 'app-services',
  templateUrl: './services.page.html',
  styleUrls: ['./services.page.scss'],
})
export class ServicesPage implements OnInit {
    @ViewChild('filechooser', {static: false}) fileChooser: ElementRef;
    blob: Blob = null;
    imageURL = '';
  services: Observable<Service[]>;
  serviceGroups: ServiceGroup[];

  form: FormGroup;
  id: string;

  validationMessages = {
    name: [
      {type: 'required', message: 'Service Name is required'},
      {type: 'minLength', message: 'Service Name must be greater than 3 chars'},
      {type: 'maxLength', message: 'Service Name must be less than 25 chars'}
    ],
    description: [
      {type: 'required', message: 'Service Description is required'},
      {type: 'minLength', message: 'Service Description must be greater than 5 chars'},
      {type: 'maxLength', message: 'Service Description must be less than 50 chars'}
    ],
    // price: [
    //   {type: 'required', message: 'Service Price is required'},
    //   {type: 'min', message: 'Service Price must be greater than 1'}
    // ],
    serviceGroup: [
      {type: 'required', message: 'Service Group is required'}
    ]
  };

  constructor(private serviceService: ServiceService,
              private builder: FormBuilder,
              private loadingCtrl: LoadingController,
              private toastCtrl: ToastController,
              private alertCtrl: AlertController,
              private popCtrl: PopoverController,
              private fileService: FileService,
              private serviceGroupService: ServiceGroupService) { }

    selectPhoto($evt) {
        const uri = $evt.target.files as File;
        const fileName1 = this.fileService.getFileName(uri[0].name);
        const fileExt = this.fileService.getFileExtenstion(uri[0].name);
        if (fileExt === 'jpeg') {
            const file: Files = {
                blob: uri[0],
                fileExtention: 'images/jpeg',
                fileName: fileName1,
                type: fileExt
            }; // new Files(uri[0], 'images/jpeg', fileExt, fileName);
            this.upload(file);
        } else if (fileExt === 'jpg') {
            const file: Files = {
                blob: uri[0],
                fileExtention: 'images/jpg',
                fileName: fileName1,
                type: fileExt
            };
            this.upload(file);
        } else if (fileExt === 'png') {
            const file: Files = {
                blob: uri[0],
                fileExtention: 'images/png',
                fileName: fileName1,
                type: fileExt
            };
            this.upload(file);
        } else {
            alert('select valid image');
        }
    }

    async upload(file: Files) {
        const loading = await this.loadingCtrl.create({
            spinner: 'bubbles'
        });
        await loading.present();
        this.serviceService.uploadFile(file, file.fileName)
            .then(data => {
                this.serviceService.getDownloadLink(data)
                    .then(() => {
                        console.log(this.serviceService.fileDownloadLink);
                        this.imageURL = this.serviceService.fileDownloadLink;
                        loading.dismiss();
                    });
            });
    }

  ngOnInit() {
    this.services = this.serviceService.getServices();
    this.serviceGroupService.getServiceGroups()
         .subscribe(data => {
           console.log(data);
           this.serviceGroups = [];
           data.forEach( item => {
             this.serviceGroups.push(item);
           });
         });
    this.id = '';
    const group: ServiceGroup = {
      id: '',
      name: ''
    };
    this.initForm('', '', 1, group.id);
  }

  // compareWith(o1, o2) {
  //   return o1 && o2 ? o1.id === o2.id : o1 === o2;
  // }

  initForm(name: string, description: string, price: number, serviceGroup: string) {
    this.form = this.builder.group({
      name: new FormControl(name, Validators.compose([
          Validators.required,
          Validators.minLength(3),
          Validators.maxLength(25)
      ])),
      description: new FormControl(description, Validators.compose([
          Validators.required,
          Validators.minLength(5),
          Validators.maxLength(50)
      ])),
      // price: new FormControl(price, Validators.compose([
      //     Validators.required,
      //     Validators.min(1)
      // ])),
      serviceGroup: new FormControl(serviceGroup, Validators.compose([
          Validators.required
      ]))
    });
  }

  edit(service: Service) {
    this.id = service.id;
    this.imageURL = service.file;
    console.log(service);
    this.initForm(service.name, service.description, service.price, service.serviceGroup);
  }

  async delete(service: Service) {
    const alert1 = await this.alertCtrl.create({
      header: 'Delete Service',
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
      name: value.name,
      description: value.description,
      serviceGroup: value.serviceGroup,
      price: 0,
        file: this.imageURL
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
                  this.initForm('', '', 1, group.id);
                    this.imageURL = '';
                  loading.dismiss();
                  this.showToast('Service Saved');
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
            this.initForm('', '', 1, group.id);
            this.imageURL = '';
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
