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
  nom : string;
  prenom: string;
  pseudo: string;
  dateNaissance: string;
}

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  currentUser: User = null;
  firebaseUser: FirebaseUser = null;
  fireUsers: Observable<FirebaseUser[]>;
  constructor(private afs: AngularFirestore, private afAuth: AngularFireAuth) {
    this.afAuth.onAuthStateChanged((user) => {
      this.currentUser = user;
    });
  }

  getFireUsers() {
    let users = [];
    return this.getUsers().pipe(
      switchMap((res) => {
        users = res;
        return this.afs
          .collection('utilisateurs')
          .valueChanges({ idField: 'uid' }) as Observable<FirebaseUser[]>;
      }),
      map((utilisateurs) => {
        for (let u of utilisateurs) {
          if (u.uid == this.currentUser.uid) {
            this.firebaseUser = u;
          }
        }
        return utilisateurs;
      })
    );
  }

  getUser() {
    return this.firebaseUser;
  }

  getUsers() {
    return this.afs
      .collection('utilisateurs')
      .valueChanges({ idField: 'uid' }) as Observable<FirebaseUser[]>;
  }

  getEmail() {
    return this.currentUser.email;
  }

  loginUser(
    email: string,
    password: string
  ): Promise<firebase.auth.UserCredential> {
    return firebase.auth().signInWithEmailAndPassword(email, password);
  }

  async signUpUser({ pseudo, email, nom, prenom, password, dateNaissance }) {
    const credential = await this.afAuth.createUserWithEmailAndPassword(
      email,
      password
    );
    const uid = credential.user.uid;

    return this.afs.doc(`utilisateurs/${uid}`).set({
      uid,
      pseudo: pseudo,
      email: credential.user.email,
      nom: nom,
      prenom: prenom,
      dateNaissance: dateNaissance,
    });
  }

  resetPassword(email: string): Promise<void> {
    return firebase.auth().sendPasswordResetEmail(email);
  }

  logOutUser(): Promise<void> {
    return firebase.auth().signOut();
  }
}
