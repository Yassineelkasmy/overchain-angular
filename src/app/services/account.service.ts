import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { AuthUser } from '../models/AuthUser';
import { User } from '../models/User';
import { RegistrationService } from './registration.service';

@Injectable({
  providedIn: 'root'
})
export class AccountService {

  constructor(
    private afAuth: AngularFireAuth,
    private registrationService: RegistrationService,
  ) {

      this.registrationService.getUser().subscribe(
        (user) => this.setCurrentUser(user)
      )

      this.afAuth.authState.subscribe(
        (authUser) => this.currentAuthUser = authUser
      )

   }

   currentUser?: User;
   currentAuthUser?: AuthUser | null;

   setCurrentUser(user:User) {
     this.currentUser = user;
   }
}
