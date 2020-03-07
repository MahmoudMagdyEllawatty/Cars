import { Injectable } from '@angular/core';
import {Observable} from 'rxjs';
import {AngularFirestore, AngularFirestoreCollection, DocumentReference} from '@angular/fire/firestore';
import {map, take} from 'rxjs/operators';
import {ServiceGroup} from './service-group.service';
import * as firebase from 'firebase';

export interface User {
  id: string;
  name: string;
  uId: string;
}
@Injectable({
  providedIn: 'root'
})
export class UserService {

  private _user: User;
  private users: Observable<User[]>;
  private userCollection: AngularFirestoreCollection<User>;
  private node = 'users';
  constructor(private afs: AngularFirestore) {
    this.userCollection = this.afs.collection<User>(this.node);
    this.users = this.userCollection.snapshotChanges()
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

  get user(): User {
    return this._user;
  }

  set user(value: User) {
    this._user = value;
  }

  getUsers(): Observable<User[]> {
    return  this.userCollection.snapshotChanges()
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

  // getUserByUId(uId: string): Observable<User> {
  //
  // }

  addUser(user: User): Promise<DocumentReference> {
    return this.userCollection.add(user);
  }

  updateUser(user: User): Promise<void> {
    return this.userCollection.doc(user.id).update(user);
  }

  deleteUser(user: User): Promise<void> {
    return this.userCollection.doc(user.id).delete();
  }
}
