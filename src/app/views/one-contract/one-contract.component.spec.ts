import { ComponentFixture, TestBed } from '@angular/core/testing';

import { OneContractComponent } from './one-contract.component';

describe('OneContractComponent', () => {
  let component: OneContractComponent;
  let fixture: ComponentFixture<OneContractComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ OneContractComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(OneContractComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
