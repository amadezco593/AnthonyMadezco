import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BankProductCreateComponent } from './bank-product-create.component';

describe('BankProductCreateComponent', () => {
  let component: BankProductCreateComponent;
  let fixture: ComponentFixture<BankProductCreateComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [BankProductCreateComponent]
    });
    fixture = TestBed.createComponent(BankProductCreateComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
