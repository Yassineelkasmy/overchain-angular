import { Component, OnInit } from '@angular/core';
import { Property } from 'src/app/models/Property';
import { AdminService } from 'src/app/services/admin.service';

@Component({
  selector: 'app-properties',
  templateUrl: './properties.component.html',
  styleUrls: ['./properties.component.scss']
})
export class PropertiesComponent implements OnInit {

  constructor(public adminService: AdminService) { }

  ngOnInit(): void {
    this.getProperties();
  }

  properties?:Property[];

  getProperties() {
    this.adminService.getProperties().subscribe(
      (properties) => this.properties = properties
    )
  }

}
