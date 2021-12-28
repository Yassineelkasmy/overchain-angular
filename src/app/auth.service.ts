import { Injectable, NgZone } from '@angular/core';
import { AngularFireAuth } from "@angular/fire/compat/auth";
import { AuthProvider, GoogleAuthProvider } from "@angular/fire/auth";
import { AngularFirestore, AngularFirestoreDocument } from '@angular/fire/compat/firestore';
import { Router } from "@angular/router";
import { User } from './models/User';

@Injectable({
  providedIn: 'root'
})

export class AuthService {
  userData: any; // Save logged in user data

  constructor(
    public afs: AngularFirestore,   // Inject Firestore service
    public afAuth: AngularFireAuth, // Inject Firebase auth service
    public router: Router,
    public ngZone: NgZone // NgZone service to remove outside scope warning
  ) {
    /* Saving user data in localstorage when
    logged in and setting up null when logged out */
    this.afAuth.authState.subscribe(user => {
      if (user) {
        this.userData = user;
        localStorage.setItem('user', JSON.stringify(this.userData));

      } else {
        localStorage.setItem('user', '');

      }
    })
  }

  // Sign in with email/password
  SignIn(email: string, password:string) {
    return this.afAuth.signInWithEmailAndPassword(email, password)
      .then((result) => {
        this.ngZone.run(() => {
          //this.router.navigate(['dashboard']);
        });
        this.SetUserData(result.user!);
      }).catch((error) => {
        window.alert(error.message)
      })
  }

  // Sign up with email/password
  SignUp(email: string, password:string) {
    return this.afAuth.createUserWithEmailAndPassword(email, password)
      .then((result) => {
        /* Call the SendVerificaitonMail() function when new user sign
        up and returns promise */
        // this.SendVerificationMail();
        this.SetUserData(result.user);
      }).catch((error) => {
        window.alert(error.message)
      })
  }

  get isLoggedIn(): boolean {

    const userString = localStorage.getItem('user');
    if(userString == '' || userString===null){
      return false;
    }
    else {
      const user = JSON.parse(userString);
      // We dont check if the email is verified for now
      return true;
    }
  }



  SetUserData(user : User | null) {
    if(user){
    const userRef: AngularFirestoreDocument<any> = this.afs.doc(`users/${user.uid}`);
    const userData: User = {
      uid: user.uid,
      email: user.email,
      displayName: user.displayName,
      photoURL: user.photoURL,
      emailVerified: user.emailVerified
    }
    return userRef.set(userData, {
      merge: true
    })
  }
  return;
}

// AuthLogin(provider: AuthProvider) {
//   return this.afAuth.signInWithPopup(provider)
//   .then((result) => {
//      this.ngZone.run(() => {
//         this.router.navigate(['dashboard']);
//       })
//     this.SetUserData(result.user);
//   }).catch((error) => {
//     window.alert(error)
//   })
// }

GoogleAuth() {
  //return this.AuthLogin(new GoogleAuthProvider());
}

  // Sign out
  SignOut() {
    return this.afAuth.signOut().then(() => {
      localStorage.removeItem('user');
      //this.router.navigate(['sign-in']);
    })
  }






}
