import { Component, OnInit, Output } from '@angular/core';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent implements OnInit {

  constructor(
    public authService: AuthService,
  ) {
  }


  ngOnInit(): void {
  }






  googleAuth() {
    this.authService.GoogleAuth();
  }

  githubAuth() {
    this.authService.GithubAuth();
  }


}
