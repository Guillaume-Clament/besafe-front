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

export interface Message {
  createdAt: firebase.firestore.FieldValue;
  id: string;
  from: string;
  msg: string;
  fromName: string;
  myMsg: boolean;
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

  resetPassword(email: string): Promise<void> {
    return firebase.auth().sendPasswordResetEmail(email);
  }

  logOutUser(): Promise<void> {
    return firebase.auth().signOut();
  }

  addChatMessage(msg) {
    return this.afs.collection('messages').add({
      msg: msg,
      from: this.currentUser.uid,
      createdAt: firebase.firestore.FieldValue.serverTimestamp(),
    });
  }

  getChatMessages() {
    let users = [];

    return this.getUsers().pipe(
      switchMap((res) => {
        users = res;
        return this.afs
          .collection('messages', (ref) => ref.orderBy('createdAt'))
          .valueChanges({ idField: 'id' }) as Observable<Message[]>;
      }),
      map((messages) => {
        for (let m of messages) {
          m.fromName = this.getUserForMsg(m.from, users);
          m.myMsg = this.currentUser.uid == m.from;
        }
        return messages;
      })
    );
  }

  getUsers() {
    return this.afs
      .collection('utilisateurs')
      .valueChanges({ idField: 'uid' }) as Observable<FirebaseUser[]>;
  }

  getUserForMsg(msgFromId, users: FirebaseUser[]): string {
    for (let usr of users) {
      if (usr.uid == msgFromId) {
        return usr.pseudo;
      }
    }
    return 'Deleted';
  }
}
