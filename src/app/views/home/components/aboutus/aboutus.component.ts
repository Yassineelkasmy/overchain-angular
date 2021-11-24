import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-aboutus',
  templateUrl: './aboutus.component.html',
  styleUrls: ['./aboutus.component.scss']
})
export class AboutusComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
    this.image = '../../../../../assets/images/' + this.image;

  }

  @Input() title:string = '';
  @Input() text:string = '';
  @Input() image:string = '';
  @Input() reversed: boolean = false;

}
