import { Injectable } from '@angular/core';
import {AngularFireAuth} from '@angular/fire/auth';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  constructor(private auth: AngularFireAuth) { }


  login(mail: string, pass: string) {
    return this.auth.auth.signInWithEmailAndPassword(mail, pass);
  }

  updateProfile(type: string) {
    return this.auth.auth.currentUser.updateProfile({
      displayName: type,
      photoURL: ''
    });
  }


  register(mail: string, pass: string) {
    return this.auth.auth.createUserWithEmailAndPassword(mail, pass);
  }

  logout() {
    return this.auth.auth.signOut();
  }
}
