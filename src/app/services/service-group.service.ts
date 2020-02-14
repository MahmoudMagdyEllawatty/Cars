import { Injectable } from '@angular/core';
import {Observable} from 'rxjs';
import {AngularFirestore, AngularFirestoreCollection, DocumentReference} from '@angular/fire/firestore';
import {map, take} from 'rxjs/operators';

export interface ServiceGroup {
  id: string;
  name: string;
}

@Injectable({
  providedIn: 'root'
})
export class ServiceGroupService {

  private serviceGroups: Observable<ServiceGroup[]>;
  private serviceGroupCollection: AngularFirestoreCollection<ServiceGroup>;
  private node = 'service-group';
  constructor(private afs: AngularFirestore) {
    this.serviceGroupCollection = this.afs.collection<ServiceGroup>(this.node);
    this.serviceGroups = this.serviceGroupCollection.snapshotChanges()
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



  getServiceGroups(): Observable<ServiceGroup[]> {
    return  this.serviceGroupCollection.snapshotChanges()
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

  getServiceGroupById(id: string): Observable<ServiceGroup> {
    return this.serviceGroupCollection.doc<ServiceGroup>(id).valueChanges().pipe(
        take(1),
        map(idea => {
          idea.id = id;
          return idea;
        })
    );
  }

  addServiceGroup(serviceGroup: ServiceGroup): Promise<DocumentReference> {
    return this.serviceGroupCollection.add(serviceGroup);
  }

  updateServiceGroup(serviceGroup: ServiceGroup): Promise<void> {
    return this.serviceGroupCollection.doc(serviceGroup.id).update(serviceGroup);
  }

  deleteServiceGroup(serviceGroup: ServiceGroup): Promise<void> {
    return this.serviceGroupCollection.doc(serviceGroup.id).delete();
  }

}
