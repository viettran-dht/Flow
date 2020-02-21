import { Injectable } from '@angular/core';

import * as firebase from 'firebase';
import { FirebaseService } from '../firebase/firebase.service';
@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(
    private firebaseService: FirebaseService
  ) { }
  async signup(req) {
    return new Promise(async (resolve, reject) => {
      try {
        const res = await firebase.auth().createUserWithEmailAndPassword(req.email, req.password);
        resolve(res);
      } catch (error) {
        reject(error);
      }
    });
  }
  async login(req) {
    return new Promise(async (resolve, reject) => {
      try {
        const res = await firebase.auth().signInWithEmailAndPassword(req.email, req.password);
        const uId = res.user.uid;
        // firebase.firestore().collection('users').doc(uId).update({
        //   lastJoin: firebase.firestore.Timestamp.fromDate(new Date())
        // });
        this.firebaseService.updateRef('users', uId, { lastJoin: firebase.firestore.Timestamp.fromDate(new Date())});
        resolve(res);
      } catch (error) {
        reject(error);
      }
    });
  }
  logout(): Promise<any> {
    return new Promise((resolve, reject) => {
      firebase.auth().signOut().then(res => {
        resolve(res);
      }).catch(error => {
        reject(error);
      });
    });
  }

  sendEmailResetPassword(email): Promise<any> {
    return new Promise((resolve, reject) => {
      firebase.auth().sendPasswordResetEmail(email).then(res => {
        resolve(res);
      }).catch(error => {
        reject(error);
      });
    });
  }
  getCurrentUser() {
    return new Promise<any>((resolve, reject) => {
      firebase.auth().onAuthStateChanged((user) => {
        if (user) {
          resolve(user);
        } else {
          reject('No user logged in');
        }
      });
    });
  }
  reauthenticate(password) {
    const credential = firebase.auth.EmailAuthProvider.credential(
      firebase.auth().currentUser.email,
      password
    );
    return new Promise((resolve, reject) => {
      firebase.auth().currentUser.reauthenticateAndRetrieveDataWithCredential(credential).then(res => {
        resolve(res);
      }).catch(error => {
        reject(error);
      });
    });
  }
  updatePassword(password): Promise<any> {

    return new Promise((resolve, reject) => {
      firebase.auth().currentUser.updatePassword(password).then(res => {
        resolve(res);
      }).catch(error => {
        reject(error);
      });
    });
  }
}
