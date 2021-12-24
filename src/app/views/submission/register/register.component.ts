import { Component, OnInit, EventEmitter, Output } from '@angular/core';
import { StepsComponent } from '../steps/steps.component';
@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {

  }

  submit(feed: boolean) {
      this.onSubmit.emit(feed);
  }

  @Output() onSubmit = new EventEmitter<boolean>(false);

 /* primaryStep(){
      StepsComponent:
  }*/
}
