import { Component, Input, OnInit } from '@angular/core';
import { Step } from "../../models/Step";
import { steps } from "../../constants/Steps";

@Component({
  selector: 'app-submission',
  templateUrl: './submission.component.html',
  styleUrls: ['./submission.component.scss']
})
export class SubmissionComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
    this.step = steps[ this.stepNum - 1 ];
  }



  @Input() stepNum : number = 1;

  step:Step = new Step();



}
