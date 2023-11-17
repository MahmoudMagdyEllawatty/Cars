import { Injectable } from '@angular/core';
import {User} from './user.service';
import {Package, PackageService, PackageServices} from './package.service';
import {Service} from './categories.service';
import {Observable} from 'rxjs';
import {AngularFirestore, AngularFirestoreCollection, DocumentReference} from '@angular/fire/firestore';
import {map, take} from 'rxjs/operators';
import {ServiceGroup} from './service-group.service';
import {Car} from './cars.service';


export interface Order {
  id: string;
  user: User;
  car: Car;
  state: number; // -1 => Order Rejected , 0 => Send , 1 => Order Accepted
  carUser: User;
}

@Injectable({
  providedIn: 'root'
})
export class OrderService {
  private _order: Order;
  private orders: Observable<Order[]>;
  private orderCollection: AngularFirestoreCollection<Order>;
  private node = 'orders';
  constructor(private afs: AngularFirestore) {
    this.orderCollection = this.afs.collection<Order>(this.node);
    this.orders = this.orderCollection.snapshotChanges()
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


  get order(): Order {
    return this._order;
  }

  set order(value: Order) {
    this._order = value;
  }

  getOrders(): Observable<Order[]> {
    return this.orderCollection.snapshotChanges()
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

  getOrderById(id: string): Observable<Order> {
    return this.orderCollection.doc<Order>(id).valueChanges().pipe(
        take(1),
        map(idea => {
          idea.id = id;
          return idea;
        })
    );
  }

  addOrder(order: Order): Promise<DocumentReference> {
    return this.orderCollection.add(order);
  }

  updateOrder(order: Order): Promise<void> {
    return this.orderCollection.doc(order.id).update(order);
  }

  deleteOrder(order: Order): Promise<void> {
    return this.orderCollection.doc(order.id).delete();
  }

}
