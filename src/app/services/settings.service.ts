import { Injectable } from '@angular/core';
import {Observable} from 'rxjs';
import {AngularFirestore, AngularFirestoreCollection, DocumentReference} from '@angular/fire/firestore';
import {Order} from './order.service';
import {map} from 'rxjs/operators';

export class MessageUsers {
  userId: string;
  state: number;
}

export class Message {
  id: string;
  message: string;
  messageUsers: MessageUsers[];
}
@Injectable({
  providedIn: 'root'
})
export class SettingsService {
  private messages: Observable<Message[]>;
  private messageCollection: AngularFirestoreCollection<Message>;
  private node = 'messages';
  constructor(private afs: AngularFirestore) {
    this.messageCollection = this.afs.collection<Message>(this.node);
    this.messages = this.messageCollection.snapshotChanges()
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

  getMessages(): Observable<Message[]> {
    return this.messageCollection.snapshotChanges()
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

  addOrder(message: Message): Promise<DocumentReference> {
    return this.messageCollection.add(message);
  }

  updateOrder(message: Message): Promise<void> {
    return this.messageCollection.doc(message.id).update(message);
  }
}
