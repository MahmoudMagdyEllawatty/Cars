import { Injectable } from '@angular/core';
import {User} from './user.service';
import {Car} from './cars.service';
import {Observable} from 'rxjs';
import {AngularFirestore, AngularFirestoreCollection, DocumentReference} from '@angular/fire/firestore';
import {map, take} from 'rxjs/operators';

export interface Review {
  id: string;
  user: User;
  car: Car;
  review: string;
  rating: number;
  date: string;
}
@Injectable({
  providedIn: 'root'
})
export class ReviewService {
  private review: Review;
  private reviews: Observable<Review[]>;
  private reviewCollection: AngularFirestoreCollection<Review>;
  private node = 'cars_reviews';
  constructor(private afs: AngularFirestore) {
    this.reviewCollection = this.afs.collection<Review>(this.node);
    this.reviews = this.reviewCollection.snapshotChanges()
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



  getReviews(): Observable<Review[]> {
    return this.reviewCollection.snapshotChanges()
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

  getReviewById(id: string): Observable<Review> {
    return this.reviewCollection.doc<Review>(id).valueChanges().pipe(
        take(1),
        map(idea => {
          idea.id = id;
          return idea;
        })
    );
  }

  addReview(order: Review): Promise<DocumentReference> {
    return this.reviewCollection.add(order);
  }

  updateReview(order: Review): Promise<void> {
    return this.reviewCollection.doc(order.id).update(order);
  }

  deleteReview(order: Review): Promise<void> {
    return this.reviewCollection.doc(order.id).delete();
  }

}
