import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ScheduleBroadcastComponent } from './schedule-broadcast.component';

describe('ScheduleBroadcastComponent', () => {
  let component: ScheduleBroadcastComponent;
  let fixture: ComponentFixture<ScheduleBroadcastComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ScheduleBroadcastComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ScheduleBroadcastComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
