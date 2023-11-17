import {Component, ElementRef, OnInit, ViewChild} from '@angular/core';
import {FormBuilder, FormControl, FormGroup, Validators} from '@angular/forms';
import {LoadingController, ModalController} from '@ionic/angular';
import {SelectGroupsPage} from '../select-groups/select-groups.page';
import {Package, PackageService, PackageServices} from '../../../services/package.service';
import {Router} from '@angular/router';
import {Files} from '../../../services/categories.service';
import {FileService} from '../../../services/file.service';

@Component({
  selector: 'app-add-package',
  templateUrl: './add-package.page.html',
  styleUrls: ['./add-package.page.scss'],
})
export class AddPackagePage implements OnInit {
  @ViewChild('filechooser', {static: false}) fileChooser: ElementRef;
  blob: Blob = null;
  imageURL = '';
  form: FormGroup;
  packageServices: PackageServices[];
  constructor(private builder: FormBuilder,
              private router: Router,
              private packageService: PackageService,
              private fileService: FileService,
              private loadingCtrl: LoadingController,
              private modalController: ModalController) { }

  validationMessages = {
    name: [
      {type: 'required', message: 'Package Name is required'},
      {type: 'minLength', message: 'Package Name must be greater than 3 chars'},
      {type: 'maxLength', message: 'Package Name must be less than 25 chars'}
    ],
    description: [
      {type: 'required', message: 'Package Description is required'},
      {type: 'minLength', message: 'Package Description must be greater than 5 chars'},
      {type: 'maxLength', message: 'Package Description must be less than 50 chars'}
    ],
    name_en: [
      {type: 'required', message: 'Package English Name is required'},
      {type: 'minLength', message: 'Package English Name must be greater than 3 chars'},
      {type: 'maxLength', message: 'Package English Name must be less than 25 chars'}
    ],
    description_en: [
      {type: 'required', message: 'Package English Description is required'},
      {type: 'minLength', message: 'Package English Description must be greater than 5 chars'},
      {type: 'maxLength', message: 'Package English Description must be less than 50 chars'}
    ],
    price: [
      {type: 'required', message: 'Package Price is required'},
      {type: 'min', message: 'Package Price must be greater than 1'}
    ],
    persons: [
      {type: 'required', message: 'Package Persons is required'},
      {type: 'min', message: 'Package Persons must be greater than 1'}
    ]
  };

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
    this.packageService.uploadFile(file, file.fileName)
        .then(data => {
          this.packageService.getDownloadLink(data)
              .then(() => {
                console.log(this.packageService.fileDownloadLink);
                this.imageURL = this.packageService.fileDownloadLink;
                loading.dismiss();
              });
        });
  }
  ngOnInit() {
    this.packageServices = [];
    this.form = this.builder.group({
      name: new FormControl('', Validators.compose([
          Validators.required,
          Validators.minLength(3),
          Validators.maxLength(25)
      ])),
      description: new FormControl('', Validators.compose([
        Validators.required,
        Validators.minLength(5),
        Validators.maxLength(50)
      ])),
      name_en: new FormControl('', Validators.compose([
        Validators.required,
        Validators.minLength(3),
        Validators.maxLength(25)
      ])),
      description_en: new FormControl('', Validators.compose([
        Validators.required,
        Validators.minLength(5),
        Validators.maxLength(50)
      ])),
      price: new FormControl('', Validators.compose([
        Validators.required,
        Validators.min(1)
      ])),
      persons: new FormControl('', Validators.compose([
        Validators.required,
        Validators.min(1)
      ])),
    });
  }

  submit(value: any) {
    const aPackage: Package = {
      id: '',
      price: value.price,
      name: value.name,
      description: value.description,
      packageServices: this.packageServices,
      state: 1,
      persons: value.persons,
      image: this.imageURL,
      descriptionEn: value.description_en,
      nameEn: value.name_en
    };

    this.packageService.addPackage(aPackage)
        .then(data => {
          aPackage.id = data.id;
          this.packageService.updatePackage(aPackage)
              .then(d => {
                console.log('Saved');
                this.router.navigate(['/admin-dashboard/tab3']);
              });
        });
  }

  async selectPackageServices() {
    const modal = await this.modalController.create({
      component: SelectGroupsPage,
      componentProps: {
        packageServices : []
      }
    });

    await modal.present();
    const data = await modal.onWillDismiss();

    this.packageServices = data.data.data;

  }
}
