import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ContractDeployComponent } from './contract-deploy.component';

describe('ContractDeployComponent', () => {
  let component: ContractDeployComponent;
  let fixture: ComponentFixture<ContractDeployComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ContractDeployComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ContractDeployComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
