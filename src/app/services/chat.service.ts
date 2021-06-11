import { Injectable } from '@angular/core';
import firebase from 'firebase/app';
import { AngularFireAuth } from '@angular/fire/auth';
import { AngularFirestore } from '@angular/fire/firestore';
import { Observable } from 'rxjs';
import { switchMap, map } from 'rxjs/operators';
import { AuthService } from 'src/app/services/auth.service';

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
  nom: string;
  fromName: string;
  myMsg: boolean;
}

@Injectable({
  providedIn: 'root',
})
export class ChatService {
  userPseudo: string = null;
  constructor(
    private afs: AngularFirestore,
    private afAuth: AngularFireAuth,
    private authService: AuthService
  ) {}

  addChatMessage(msg, nomGrp) {
    return this.afs.collection('messages').add({
      msg: msg,
      from: this.authService.currentUser.uid,
      createdAt: firebase.firestore.FieldValue.serverTimestamp(),
      nom: nomGrp,
    });
    // actualiser page groupes
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
          m.myMsg = this.authService.currentUser.uid == m.from;
        }
        return messages;
      })
    );
  }

  
  getChatMessagesByGroupe(nomGroupe) {
    let users = [];

    return this.getUsers().pipe(
      switchMap((res) => {
        users = res;
        return this.afs
          .collection('messages', (ref) => ref.where('nom', '==', nomGroupe).orderBy('createdAt'))
          .valueChanges({ idField: 'id' }) as Observable<Message[]>;
      }),
      map((messages) => {
        for (let m of messages) {
          m.fromName = this.getUserForMsg(m.from, users);
          m.myMsg = this.authService.currentUser.uid == m.from;
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
        this.userPseudo = usr.pseudo;
        return usr.pseudo;
      }
    }
    return 'Deleted';
  }
}
