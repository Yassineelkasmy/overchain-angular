import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { Property } from 'src/app/models/Property';

@Component({
  selector: 'app-property',
  templateUrl: './property.component.html',
  styleUrls: ['./property.component.scss']
})
export class PropertyComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
  }

  @Input() property? : Property;
  @Output() propertySelected = new EventEmitter<Property>();

  selectCurrentProperty() {
    this.propertySelected.emit(this.property)
  }

}
