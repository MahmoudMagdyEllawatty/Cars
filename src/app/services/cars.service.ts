import { Injectable } from '@angular/core';
import {User} from './user.service';
import {Service} from './categories.service';
import {Observable} from 'rxjs';
import {AngularFirestore, AngularFirestoreCollection, DocumentReference} from '@angular/fire/firestore';
import {map, take} from 'rxjs/operators';
import {Review} from './review.service';

export interface Car {
  id: string;
  user: User;
  brand: Service;
  name: string;
  year: string;
  motor: string;
  model: string;
  generation: string;
  seats: number;
  fuel_type: string;
  power: string;
  engine_code: string;
  color: string;
  image: string;
  state: number;
  price: number;
  album: string[];
  rating: number;
  reviews: Review[];
  address: string;
  rating_count: string;
}

@Injectable({
  providedIn: 'root'
})
export class CarsService {
  private car: Car;
  private cars: Observable<Car[]>;
  private carCollection: AngularFirestoreCollection<Car>;
  private node = 'cars';
  constructor(private afs: AngularFirestore) {
    this.carCollection = this.afs.collection<Car>(this.node);
    this.cars = this.carCollection.snapshotChanges()
        .pipe(
            map(actions => {
              return actions.map(a => {
                const data = a.payload.doc.data();
                const id = a.payload.doc.id;
                return { id, ...data };
              });
            })
        );
  }


  get order(): Car {
    return this.car;
  }

  set order(value: Car) {
    this.car = value;
  }

  getCars(): Observable<Car[]> {
    return this.carCollection.snapshotChanges()
        .pipe(
            map(actions => {
              return actions.map(a => {
                const data = a.payload.doc.data();
                const id = a.payload.doc.id;
                return { id, ...data };
              });
            })
        );
  }

  getOrderById(id: string): Observable<Car> {
    return this.carCollection.doc<Car>(id).valueChanges().pipe(
        take(1),
        map(idea => {
          idea.id = id;
          return idea;
        })
    );
  }

  addOrder(order: Car): Promise<DocumentReference> {
    return this.carCollection.add(order);
  }

  updateOrder(order: Car): Promise<void> {
    return this.carCollection.doc(order.id).update(order);
  }

  deleteOrder(order: Car): Promise<void> {
    return this.carCollection.doc(order.id).delete();
  }

}
