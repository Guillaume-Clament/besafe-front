import { Injectable } from '@angular/core';
import firebase from 'firebase/app';
import { AngularFireAuth } from '@angular/fire/auth';
import { AngularFirestore } from '@angular/fire/firestore';
import { Observable } from 'rxjs';
import { switchMap, map } from 'rxjs/operators';

export interface User {
  uid: string;
  email: string;
}

export interface FirebaseUser {
  uid: string;
  email: string;
  pseudo: string;
  dateNaissance: string;
}

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  currentUser: User = null;
  constructor(private afs: AngularFirestore, private afAuth: AngularFireAuth) {
    this.afAuth.onAuthStateChanged((user) => {
      this.currentUser = user;
    });
  }

  loginUser(
    email: string,
    password: string
  ): Promise<firebase.auth.UserCredential> {
    return firebase.auth().signInWithEmailAndPassword(email, password);
  }

  async signUpUser({ pseudo, email, password, dateNaissance }) {
    const credential = await this.afAuth.createUserWithEmailAndPassword(
      email,
      password
    );
    const uid = credential.user.uid;

    return this.afs.doc(`utilisateurs/${uid}`).set({
      uid,
      pseudo: pseudo,
      email: credential.user.email,
      dateNaissance: dateNaissance,
    });
  }

  resetPassword(email: string, password: string): Promise<void> {
    return firebase.auth().sendPasswordResetEmail(email);
  }

  logOutUser(): Promise<void> {
    return firebase.auth().signOut();
  }
}
