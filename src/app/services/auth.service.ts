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

  updateEmail(email: string) {
    return this.auth.auth.currentUser.updateEmail(email);
  }

  updatePassword(password: string) {
    return this.auth.auth.currentUser.updatePassword(password);
  }

  getUserEmail() {
    return this.auth.auth.currentUser.email;
  }


  register(mail: string, pass: string) {
    return this.auth.auth.createUserWithEmailAndPassword(mail, pass);
  }

  logout() {
    return this.auth.auth.signOut();
  }
}
