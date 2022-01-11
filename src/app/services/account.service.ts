import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { AuthUser } from '../models/AuthUser';
import { Property } from '../models/Property';
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
      );

      this.afAuth.authState.subscribe(
        (authUser) => this.currentAuthUser = authUser
      )

      this.registrationService.getUserProperties().subscribe(
        (properties) => this.userProperties = properties
      )

   }

   currentUser?: User;
   currentAuthUser?: AuthUser | null;
   userProperties: Property[] = [];
   

   setCurrentUser(user:User) {
     this.currentUser = user;
   }
}
