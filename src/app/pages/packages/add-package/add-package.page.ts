import { Component, OnInit } from '@angular/core';
import {FormBuilder, FormControl, FormGroup, Validators} from '@angular/forms';
import {ModalController} from '@ionic/angular';
import {SelectGroupsPage} from '../select-groups/select-groups.page';
import {Package, PackageService, PackageServices} from '../../../services/package.service';
import {Router} from '@angular/router';

@Component({
  selector: 'app-add-package',
  templateUrl: './add-package.page.html',
  styleUrls: ['./add-package.page.scss'],
})
export class AddPackagePage implements OnInit {
  form: FormGroup;
  packageServices: PackageServices[];
  constructor(private builder: FormBuilder,
              private router: Router,
              private packageService: PackageService,
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
    price: [
      {type: 'required', message: 'Package Price is required'},
      {type: 'min', message: 'Package Price must be greater than 1'}
    ]
  };
  ngOnInit() {
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
      price: new FormControl('', Validators.compose([
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
      state: 1
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
