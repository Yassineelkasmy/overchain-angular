import { Component, Input, OnInit } from '@angular/core';
import { Step } from '../../../models/Step';
import { steps } from "../../../constants/Steps";

@Component({
  selector: 'app-steps',
  templateUrl: './steps.component.html',
  styleUrls: ['./steps.component.scss']
})
export class StepsComponent implements OnInit {

  constructor() { }


  ngOnInit(): void {
      this.primarySteps = steps.slice(0,this.stepNum);
      this.secondarySteps = steps.slice(this.stepNum);
  }

  @Input() stepNum : number = 0;


  //Just an initilizer

   primarySteps : Step[] = [];
   secondarySteps : Step[] = [];

}
