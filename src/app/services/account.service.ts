import { Injectable } from '@angular/core';
import { User } from '../models/User';
import { AuthService } from './auth.service';
import { RegistrationService } from './registration.service';

@Injectable({
  providedIn: 'root'
})
export class AccountService {

  constructor(
    private authService: AuthService,
    private registrationService: RegistrationService,
  ) {

      this.registrationService.getUser().subscribe(
        (user) => this.setCurrentUser(user)
      )

   }

   currentUser?: User;

   setCurrentUser(user:User) {
     this.currentUser = user;
   }
}
