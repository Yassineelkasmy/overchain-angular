import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CreateContractComponent } from './create-contract.component';

describe('CreateContractComponent', () => {
  let component: CreateContractComponent;
  let fixture: ComponentFixture<CreateContractComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CreateContractComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CreateContractComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
