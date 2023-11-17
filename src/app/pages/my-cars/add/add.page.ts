import {Component, ElementRef, OnInit, ViewChild} from '@angular/core';
import {FormBuilder, FormControl, FormGroup, Validators} from '@angular/forms';
import {ServiceGroup, ServiceGroupService} from '../../../services/service-group.service';
import {CategoriesService, Files, Service} from '../../../services/categories.service';
import {Car, CarsService} from '../../../services/cars.service';
import {User, UserService} from '../../../services/user.service';
import {AlertController, LoadingController, NavController, PopoverController, ToastController} from '@ionic/angular';
import {FileService} from '../../../services/file.service';
import {ActivatedRoute} from '@angular/router';

@Component({
  selector: 'app-add',
  templateUrl: './add.page.html',
  styleUrls: ['./add.page.scss'],
})
export class AddPage implements OnInit {
  @ViewChild('filechooser', {static: false}) fileChooser: ElementRef;
  blob: Blob = null;
  imageURL = '';
  imagesURL: string[] = [];

  form: FormGroup;
  oldCar: Car;
  id: string;

  brands: Service[];

  validationMessages = {
    name: [
      {type: 'required', message: 'Name is required'},
      {type: 'minLength', message: 'Name must be greater than 3 chars'},
      {type: 'maxLength', message: 'Name must be less than 100 chars'}
    ],
    year: [
      {type: 'required', message: 'Manufacture Year is required'}
    ],
    motor: [
      {type: 'required', message: 'Motor is required'}
    ],
    model: [
      {type: 'required', message: 'Model is required'}
    ],
    price: [
      {type: 'required', message: 'Price is required'}
    ],
    seats: [
      {type: 'required', message: 'Seats is required'}
    ],
    fuel_type: [
      {type: 'required', message: 'Fuel Type is required'}
    ],
    color: [
      {type: 'required', message: 'Color is required'}
    ],
    brand: [
      {type: 'required', message: 'Brand is required'}
    ],
    address: [
      {type: 'required', message: 'Address is required'}
    ]
  };
  constructor(private brandController: CategoriesService,
              private carController: CarsService,
              private userController: UserService,
              private serviceService: CategoriesService,
              private builder: FormBuilder,
              private loadingCtrl: LoadingController,
              private toastCtrl: ToastController,
              private activatedRoute: ActivatedRoute,
              private alertCtrl: AlertController,
              private popCtrl: PopoverController,
              private navController: NavController,
              private fileService: FileService) { }

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
      this.upload(file, false);
    } else if (fileExt === 'jpg') {
      const file: Files = {
        blob: uri[0],
        fileExtention: 'images/jpg',
        fileName: fileName1,
        type: fileExt
      };
      this.upload(file, false);
    } else if (fileExt === 'png') {
      const file: Files = {
        blob: uri[0],
        fileExtention: 'images/png',
        fileName: fileName1,
        type: fileExt
      };
      this.upload(file, false);
    } else {
      alert('select valid image');
    }
  }

  async upload(file: Files, list: boolean) {
    const loading = await this.loadingCtrl.create({
      spinner: 'bubbles'
    });
    await loading.present();
    this.serviceService.uploadFile(file, file.fileName)
        .then(data => {
          this.serviceService.getDownloadLink(data)
              .then(() => {
                if (list) {
                  this.imagesURL.push(this.serviceService.fileDownloadLink);
                } else {
                  this.imageURL = this.serviceService.fileDownloadLink;
                }
                loading.dismiss();
              });
        });
  }

  selectPhotos($evt) {
    const uri = $evt.target.files as File[];
    const files: Files[]  = [];
    // tslint:disable-next-line:prefer-for-of
    for (let i = 0; i < uri.length ; i++) {
      const fileName1 = this.fileService.getFileName(uri[i].name);
      const fileExt = this.fileService.getFileExtenstion(uri[i].name);
      if (fileExt === 'jpeg') {
        const file: Files = {
          blob: uri[i],
          fileExtention: 'images/jpeg',
          fileName: fileName1,
          type: fileExt
        }; // new Files(uri[0], 'images/jpeg', fileExt, fileName);
        files.push(file);
      } else if (fileExt === 'jpg') {
        const file: Files = {
          blob: uri[i],
          fileExtention: 'images/jpg',
          fileName: fileName1,
          type: fileExt
        };
        files.push(file);
      } else if (fileExt === 'png') {
        const file: Files = {
          blob: uri[i],
          fileExtention: 'images/png',
          fileName: fileName1,
          type: fileExt
        };
        files.push(file);
      } else {
        alert('select valid image');
      }
    }
    this.uploadMultiple(0, files);
  }

  async uploadMultiple(index: number, files: Files[]) {
    const file = files[index];
    this.upload(file, true).then(d => {
      index = index + 1;
      if (index < files.length) {
        this.uploadMultiple(index, files);
      }
    });
  }

  ngOnInit() {
    this.brandController.getServices()
        .subscribe(data => {
          console.log(data);
          this.brands = [];
          data.forEach( item => {
            this.brands.push(item);
          });
        });
    this.id = '';
    const group: Service = {
      id: '',
      name: ''
    };
    this.initForm('', '', '', '', 1, group.id, '', '', '', '');
    if (this.activatedRoute.snapshot.paramMap.has('id')) {
      this.id = this.activatedRoute.snapshot.paramMap.get('id');
      this.oldCar = {
        rating_count: '0',
        id: '',
        name: '',
        state: 0,
        price: 0,
        address: '',
        reviews: [],
        rating: 0,
        image: '',
        year: '',
        user: null,
        seats: 0,
        power: '',
        motor: '',
        model: '',
        generation: '',
        fuel_type: '',
        engine_code: '',
        color: '',
        brand: group,
        album: []
      };
      this.carController.getOrderById(this.id)
          .subscribe(data => {
            this.oldCar = data;
            this.imageURL = this.oldCar.image;
            this.imagesURL = this.oldCar.album;
            this.initForm(this.oldCar.name,
                this.oldCar.year,
                this.oldCar.motor,
                this.oldCar.model,
                this.oldCar.price,
                this.oldCar.brand ? this.oldCar.brand.name : '',
                this.oldCar.seats.toString(),
                this.oldCar.fuel_type,
                this.oldCar.color,
                this.oldCar.address);
          });
    }
  }
  // tslint:disable-next-line:max-line-length
  initForm(name: string, year: string, motor: string, model: string, price: number, serviceGroup: string, seats: string, fuelType: string, color: string, address: string) {
    this.form = this.builder.group({
      name: new FormControl(name, Validators.compose([
        Validators.required,
        Validators.minLength(3),
        Validators.maxLength(25)
      ])),
      year: new FormControl(year, Validators.compose([
        Validators.required
      ])),
      motor: new FormControl(motor, Validators.compose([
        Validators.required
      ])),
      model: new FormControl(model, Validators.compose([
        Validators.required
      ])),
      price: new FormControl(price, Validators.compose([
          Validators.required
      ])),
      seats: new FormControl(seats, Validators.compose([
        Validators.required
      ])),
      fuel_type: new FormControl(fuelType, Validators.compose([
        Validators.required
      ])),
      color: new FormControl(color, Validators.compose([
        Validators.required
      ])),
      brand: new FormControl(serviceGroup, Validators.compose([
        Validators.required
      ])),
      address: new FormControl(address, Validators.compose([
        Validators.required
      ]))
    });
  }

  async register(values) {
    const loading = await this.loadingCtrl.create({
      spinner: 'bubbles'
    });
    await loading.present();
    const car: Car = {
      rating_count: this.id === '' ? '0' : this.oldCar.rating_count,
      album: this.imagesURL,
      brand: values.brand,
      color: values.color,
      engine_code: '',
      fuel_type: values.fuel_type,
      generation: '',
      id: this.id,
      image: this.imageURL,
      model: values.model,
      motor: values.motor,
      name: values.name,
      power: '',
      price: values.price,
      seats: values.seats,
      state: 1,
      user: this.userController.user,
      year: values.year,
      rating: this.id === '' ? 0 : this.oldCar.rating,
      reviews: this.id === '' ? [] : this.oldCar.reviews,
      address: values.address
    };
    if (this.id === '') {
      this.carController.addOrder(car)
          .then(u => {
            car.id = u.id;
            this.carController.updateOrder(car)
                .then(dd => {
                  loading.dismiss();
                  this.navController.back();
                });
          });
    } else {
      this.carController.updateOrder(car)
          .then(dd => {
            loading.dismiss();
            this.navController.back();
          });
    }
  }

}
