import { Injectable } from '@angular/core';
import {ServiceGroup} from './service-group.service';
import {Observable} from 'rxjs';
import {AngularFirestore, AngularFirestoreCollection, DocumentReference} from '@angular/fire/firestore';
import {map, take} from 'rxjs/operators';
import * as firebase from 'firebase';
import {AngularFireStorage} from '@angular/fire/storage';

export interface Service {
  id: string;
  name: string;
}

export interface Files {
    blob: any;
    type: string;
    fileExtention: string;
    fileName: string;
}
@Injectable({
  providedIn: 'root'
})
export class CategoriesService {
    private basePath = '/lectureUploads';
    public fileDownloadLink = '';

  private services: Observable<Service[]>;
  private serviceCollection: AngularFirestoreCollection<Service>;
  private node = 'categories';
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

    uploadFile(file: Files, nurseName: string) {
        const storageRef = firebase.storage().ref();
        return storageRef.child(`${this.basePath}/${nurseName}/${file.fileName}`)
            .put(file.blob, {contentType: file.type});
    }
    getDownloadLink(savedFile) {
        return  savedFile.ref.getDownloadURL().then(downloadURL => {
            this.fileDownloadLink = downloadURL;
            console.log('rr' + this.fileDownloadLink);
        });
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
