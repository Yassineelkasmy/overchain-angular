import { Injectable, NgZone } from '@angular/core';
import { AngularFireAuth } from "@angular/fire/compat/auth";
import { AuthProvider, GoogleAuthProvider, GithubAuthProvider } from "@angular/fire/auth";
import { AngularFirestore, AngularFirestoreDocument } from '@angular/fire/compat/firestore';
import { Router } from "@angular/router";
import { AuthUser } from '../models/AuthUser';

@Injectable({
  providedIn: 'root'
})

export class AuthService {
  userData: any; // Save logged in user data

  constructor(
    private afs: AngularFirestore,   // Inject Firestore service
    private afAuth: AngularFireAuth, // Inject Firebase auth service
    private router: Router,
    private ngZone: NgZone, // NgZone service to remove outside scope warning
    ) 
  {
    /* Saving user data in localstorage when
    logged in and setting up null when logged out */
    this.afAuth.authState.subscribe(user => {
      if (user) {
        this.userData = user;
        this.currentUser = user as AuthUser;
        localStorage.setItem('user', JSON.stringify(this.userData));

      } else {
        this.currentUser = undefined;

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
      return true;
    }
  }



  SetUserData(user : AuthUser | null) {
    if(user){
    const userRef: AngularFirestoreDocument<any> = this.afs.doc(`users/${user.uid}`);
    const userData: AuthUser = {
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

AuthLogin(provider: AuthProvider) {
  return this.afAuth.signInWithPopup(provider)
  .then((result) => {
     this.ngZone.run(() => {
        this.router.navigate(['dashboard']);
      })
    this.SetUserData(result.user);
  }).catch((error) => {
    window.alert(error)
  })
}

GoogleAuth() {
  return this.AuthLogin(new GoogleAuthProvider()).then(
  ()=>{
    this.authCallBack();
  }
  );
}

GithubAuth() {
  return this.AuthLogin(new GithubAuthProvider()).then(()=>{
    this.authCallBack();
  });
}

authCallBack() {
  window.location.reload();
}

  // Sign out
  SignOut() {
    return this.afAuth.signOut().then(() => {
      localStorage.removeItem('user');
      this.router.navigate(['/submission/register']);
    })

  }

  currentUser? : AuthUser;

  getImmediateAccessToken() : string {
    return (JSON.parse(localStorage.getItem("user")!)).stsTokenManager.accessToken;
  }

}
