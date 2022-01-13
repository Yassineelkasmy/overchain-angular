import { Component, Input, OnInit } from '@angular/core';
import { VerifyPropertyRequest } from 'src/app/dto/verify-property.request';
import { Property } from 'src/app/models/Property';
import { AdminService } from 'src/app/services/admin.service';

@Component({
  selector: 'app-property-item',
  templateUrl: './property-item.component.html',
  styleUrls: ['./property-item.component.scss']
})
export class PropertyItemComponent implements OnInit {

  constructor(public adminService:AdminService) { }

  ngOnInit(): void {
    this.property = this.propertyInput;
  }

  @Input() propertyInput?:Property;
  property?:Property;


  verifyProperty() {
    let verifyPropertyRequest : VerifyPropertyRequest = {
      propertyId:this.property?.id!
    }
    this.adminService.verifyProperty(verifyPropertyRequest).subscribe(
      (property) => this.property = property
    )
  }
}
