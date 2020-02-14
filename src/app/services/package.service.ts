import { Injectable } from '@angular/core';
import {ServiceGroup} from './service-group.service';
import {Service} from './service.service';
import {Observable} from 'rxjs';
import {AngularFirestore, AngularFirestoreCollection, DocumentReference} from '@angular/fire/firestore';
import {map, take} from 'rxjs/operators';

export interface PackageServices {
  serviceGroup: ServiceGroup;
  services: Service[];
  amount: number;
}

export interface Package {
  id: string;
  name: string;
  description: string;
  price: number;
  state: number; // 1 => available , 0 => not available
  packageServices: PackageServices[];
}


@Injectable({
  providedIn: 'root'
})
export class PackageService {
  private packages: Observable<Package[]>;
  private packageCollection: AngularFirestoreCollection<Package>;
  private node = 'packages';
  constructor(private afs: AngularFirestore) {
    this.packageCollection = this.afs.collection<Package>(this.node);
    this.packages = this.packageCollection.snapshotChanges()
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

  getPackages(): Observable<Package[]> {
    return this.packages;
  }

  getPackageById(id: string): Observable<Package> {
    return this.packageCollection.doc<Package>(id).valueChanges().pipe(
        take(1),
        map(idea => {
          idea.id = id;
          return idea;
        })
    );
  }

  addPackage(package1: Package): Promise<DocumentReference> {
    return this.packageCollection.add(package1);
  }

  updatePackage(package1: Package): Promise<void> {
    return this.packageCollection.doc(package1.id).update(package1);
  }

  deletePackage(package1: Package): Promise<void> {
    return this.packageCollection.doc(package1.id).delete();
  }



}
