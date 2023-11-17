import { Component, OnInit } from '@angular/core';
import {Package, PackageService} from '../../../services/package.service';
import {ActivatedRoute, Router} from '@angular/router';
import {NavController, ToastController} from '@ionic/angular';
import {TranslateConfigService} from '../../../services/translate-config.service';
import {Car, CarsService} from '../../../services/cars.service';
import {UserService} from '../../../services/user.service';
import {Order, OrderService} from '../../../services/order.service';

@Component({
  selector: 'app-details',
  templateUrl: './details.page.html',
  styleUrls: ['./details.page.scss'],
})
export class DetailsPage implements OnInit {

  car: Car;
  lang = '';

  constructor(private activatedRoute: ActivatedRoute,
              private carService: CarsService,
              private userService: UserService,
              private orderService: OrderService,
              private router: Router,
              private navController: NavController,
              private translateService: TranslateConfigService) {
  }

  ngOnInit() {
    this.lang = this.translateService.selected;
    this.car = {
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
      user: this.userService.user,
      seats: 0,
      power: '',
      motor: '',
      model: '',
      generation: '',
      fuel_type: '',
      engine_code: '',
      color: '',
      brand: null,
      album: []
    };

    const id = this.activatedRoute.snapshot.paramMap.get('id');
    this.carService.getOrderById(id)
        .subscribe(data => {
          this.car = data;
        });
  }

  pay() {
    const order: Order = {
     state: 0,
     id: '',
     user: this.userService.user,
     car: this.car,
     carUser: this.car.user
    };
    this.orderService.order = order;
    const url = 'user-dashboard/tab1/details/' + this.car.id + '/payment';
    this.router.navigate([url]);
  }

  showReviews() {
    this.carService.order = this.car;
    const url = 'user-dashboard/tab1/details/' + this.car.id + '/reviews';
    this.router.navigate([url]);
  }

  back() {
    this.navController.back();
  }
}
