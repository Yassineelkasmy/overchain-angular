import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-feature',
  templateUrl: './feature.component.html',
  styleUrls: ['./feature.component.scss']
})
export class FeatureComponent implements OnInit {

  constructor() {
  }

  ngOnInit(): void {
    this.image = '../../../../../assets/images/' + this.image;

  }

  @Input() title = '';
  @Input() text = '';
  @Input() image= '';

}
