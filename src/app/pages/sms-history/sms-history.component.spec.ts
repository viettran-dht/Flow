import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SmsHistoryComponent } from './sms-history.component';

describe('SmsHistoryComponent', () => {
  let component: SmsHistoryComponent;
  let fixture: ComponentFixture<SmsHistoryComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SmsHistoryComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SmsHistoryComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
