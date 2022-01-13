import { Component, Input, OnInit } from '@angular/core';
import { Property } from 'src/app/models/Property';

@Component({
  selector: 'app-property-item',
  templateUrl: './property-item.component.html',
  styleUrls: ['./property-item.component.scss']
})
export class PropertyItemComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
    this.property = this.propertyInput;
  }

  @Input() propertyInput?:Property;
  property?:Property;

}
