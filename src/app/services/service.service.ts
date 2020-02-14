import { Injectable } from '@angular/core';
import {ServiceGroup} from './service-group.service';
import {Observable} from 'rxjs';
import {AngularFirestore, AngularFirestoreCollection, DocumentReference} from '@angular/fire/firestore';
import {map, take} from 'rxjs/operators';

export interface Service {
  id: string;
  name: string;
  description: string;
  serviceGroup: string;
  price: number;
}
@Injectable({
  providedIn: 'root'
})
export class ServiceService {
  private services: Observable<Service[]>;
  private serviceCollection: AngularFirestoreCollection<Service>;
  private node = 'services';
  constructor(private afs: AngularFirestore) {
    this.serviceCollection = this.afs.collection<Service>(this.node);
    this.services = this.serviceCollection.snapshotChanges()
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



  getServices(): Observable<Service[]> {
    return this.serviceCollection.snapshotChanges()
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

  getServiceById(id: string): Observable<Service> {
    return this.serviceCollection.doc<Service>(id).valueChanges().pipe(
        take(1),
        map(idea => {
          idea.id = id;
          return idea;
        })
    );
  }

  addService(service: Service): Promise<DocumentReference> {
    return this.serviceCollection.add(service);
  }

  updateService(service: Service): Promise<void> {
    return this.serviceCollection.doc(service.id).update(service);
  }

  deleteService(service: Service): Promise<void> {
    return this.serviceCollection.doc(service.id).delete();
  }
}
