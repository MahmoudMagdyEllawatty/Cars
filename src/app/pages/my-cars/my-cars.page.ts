import { Component, OnInit } from '@angular/core';
import {Router} from '@angular/router';
import {Observable} from 'rxjs';
import {Car, CarsService} from '../../services/cars.service';
import {UserService} from '../../services/user.service';

@Component({
  selector: 'app-my-cars',
  templateUrl: './my-cars.page.html',
  styleUrls: ['./my-cars.page.scss'],
})
export class MyCarsPage implements OnInit {

  cars: Observable<Car[]>;
  userId = '';
  constructor(private carService: CarsService,
              private userService: UserService) { }

  ngOnInit() {
    this.userId = this.userService.user.id;
    this.cars = this.carService.getCars();
  }

}
