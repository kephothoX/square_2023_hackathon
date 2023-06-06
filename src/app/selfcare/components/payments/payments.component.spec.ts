import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PaymentsComponent } from './payments.component';

describe('PaymentsComponent', () => {
  const component: PaymentsComponent;
  const fixture: ComponentFixture<PaymentsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PaymentsComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PaymentsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
