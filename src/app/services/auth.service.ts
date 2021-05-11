import { Injectable } from '@angular/core';
import firebase from "firebase/app";
import "firebase/auth";
import "firebase/firestore";

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor() { }

  loginUser(email: string, password: string): Promise<firebase.auth.UserCredential>{
    return firebase.auth().signInWithEmailAndPassword(email, password);
  }

  signUpUser(email: string, password: string):Promise<any>{
    return firebase.auth().createUserWithEmailAndPassword(email, password);
  }

  resetPassword(email: string, password: string):Promise<void>{
    return firebase.auth().sendPasswordResetEmail(email);
  }

  logOutUser():Promise<void>{
    return firebase.auth().signOut();
  }
}
