import { Component } from '@angular/core';
import * as AOS from 'aos';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'overchain-angular';

  ngOnInit() {
    AOS.init({
      duration : 3000
    });

  }
}
