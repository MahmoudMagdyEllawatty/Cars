import { Component, OnInit } from '@angular/core';
import {Car, CarsService} from '../../../../services/cars.service';
import {ActivatedRoute, Router} from '@angular/router';
import {UserService} from '../../../../services/user.service';
import {OrderService} from '../../../../services/order.service';
import {TranslateConfigService} from '../../../../services/translate-config.service';
import {Review, ReviewService} from '../../../../services/review.service';
import {FormBuilder, FormControl, FormGroup, Validators} from '@angular/forms';
import {LoadingController, NavController} from '@ionic/angular';
import {Observable, Subscription} from 'rxjs';

@Component({
  selector: 'app-reviews',
  templateUrl: './reviews.page.html',
  styleUrls: ['./reviews.page.scss'],
})
export class ReviewsPage implements OnInit {
  car: Car;
  lang = '';
  reviews: Review[] = [];
  update = false;
  carSubscribe: Observable<Car>;
  form: FormGroup;
  fooSub: Subscription;
  validationMessages = {
    review: [
      {type: 'required', message: 'Review is required'},
    ]
  };
  constructor(private activatedRoute: ActivatedRoute,
              private carService: CarsService,
              private userService: UserService,
              private reviewService: ReviewService,
              private loadingCtrl: LoadingController,
              private router: Router,
              private builder: FormBuilder,
              private navController: NavController,
              private translateService: TranslateConfigService) { }

  ngOnInit() {
    this.lang = this.translateService.selected;
    const id = this.activatedRoute.snapshot.paramMap.get('id');
    this.car = this.carService.order;
    this.reviewService.getReviews()
        .subscribe(data => {
          data.forEach(item => {
            if (item.car.id === id) {
              this.reviews.push(item);
            }
          });
        });
    this.initForm(0, '');
  }

  initForm(rating: number, review: string) {
    this.form = this.builder.group({
      review: new FormControl(review, Validators.compose([
        Validators.required
      ])),
      rating: new FormControl(rating, Validators.compose([
        Validators.required
      ]))
    });
  }

  async register(values) {
    const loading = await this.loadingCtrl.create({
      spinner: 'bubbles'
    });
    await loading.present();
    const review: Review = {
      review: values.review,
      rating: values.rating,
      user: this.userService.user,
      car: this.car,
      date: '',
      id: ''
    };
    this.reviewService.addReview(review)
        .then(u => {
          review.id = u.id;
          const oldRating = this.car.rating;
          const newRating = (oldRating + review.rating) / 2;
          // tslint:disable-next-line:radix
          const ratingCount = parseInt(this.car.rating_count) + 1;
          const newCar: Car = {
            rating: newRating,
            reviews: this.car.reviews,
            image: this.car.image,
            name: this.car.name,
            id: this.car.id,
            user: this.car.user,
            brand: this.car.brand,
            color: this.car.color,
            fuel_type: this.car.fuel_type,
            seats: this.car.seats,
            model: this.car.model,
            motor: this.car.motor,
            price: this.car.price,
            address: this.car.address,
            album: this.car.album,
            engine_code: this.car.engine_code,
            generation: this.car.generation,
            power: this.car.power,
            year: this.car.year,
            state: this.car.state,
            rating_count: ratingCount.toString()
          };
          this.update = true;
          this.carService.updateOrder(newCar);
          loading.dismiss();
          this.initForm(0, '');
          this.navController.back();
        });
  }

  back() {
    this.navController.back();
  }

}
