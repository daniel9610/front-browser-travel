import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { AngularFireAuth } from '@angular/fire/auth';
import * as firebase from 'firebase/app';
import {
  AngularFirestore,
  AngularFirestoreDocument,
} from '@angular/fire/firestore';

import {Observable, of} from 'rxjs';
import { switchMap } from 'rxjs/operators';
import { User } from './user.model';
import { auth } from 'firebase';
import { ApiGradiwebService } from './api-gradiweb.service';
import Swal from 'sweetalert2';



@Injectable({
  providedIn: 'root'
})
export class AuthenticationService {
  user$: Observable<any>;

  
  constructor(
    private api:ApiGradiwebService,
    private angularFireAuth: AngularFireAuth,
    private afAuth: AngularFireAuth,
    private afs: AngularFirestore,
    private router: Router
    ) {
      this.user$ = this.afAuth.authState.pipe(
        switchMap(user => {
          if(user){
            return this.afs.doc<User>('users/${uid}').valueChanges();
          } else {
            return of(null);
          }
        })
      );
    }


  async googleSignin(){
    let usuarios = [];
    const provider = new auth.GoogleAuthProvider();
    const credential = await this.afAuth.auth.signInWithPopup(provider);
    let user = this.currentUserObservable.currentUser.email;
    
        this.router.navigate(['/home']);
        return this.updateUserData(credential.user);
      // }else{
      //   this.router.navigate(['/login']);
      //   this.logOut();
      //   Swal.fire({
      //     title: 'No tiene permiso para ingresar a esta página'
      //   });
      // }
  

 
   
  }

  get authenticated(): any {
    return this.ObservableToPromise(this.afAuth.authState).then(state => {
      return state !== null
    });
  }

  ObservableToPromise(observable: any): any {
    return new Promise((resolve, reject) => {
      observable.subscribe(resolve, reject)
    })
  }

  get currentUserObservable(): any {
    return this.afAuth.auth
  }

  signOut() {
    this.afAuth.auth.signOut().then(() => {
        this.router.navigate(['login']);
    });
  }

  private updateUserData({uid, email, displayName, photoURL}: User){
    const userRef: AngularFirestoreDocument<User> = this.afs.doc(`users/${uid}`);

    const data = {
      uid,
      email,
      displayName,
      photoURL
    };

    return userRef.set(data, {merge: true});
  }

  loginWithEmail(email:string, password: string){
    return this.angularFireAuth.auth.signInWithEmailAndPassword(email, password);
  }
  registerWithEmail(email:string, password: string){
    return this.angularFireAuth.auth.createUserWithEmailAndPassword(email, password);
  }
  getStatus(){
    return this.angularFireAuth.authState;
  }
  logOut(){
    return this.angularFireAuth.auth.signOut();
  }
}
