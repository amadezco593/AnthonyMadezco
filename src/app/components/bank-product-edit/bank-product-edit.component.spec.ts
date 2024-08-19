import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BankProductEditComponent } from './bank-product-edit.component';

describe('BankProductEditComponent', () => {
  let component: BankProductEditComponent;
  let fixture: ComponentFixture<BankProductEditComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [BankProductEditComponent]
    });
    fixture = TestBed.createComponent(BankProductEditComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
