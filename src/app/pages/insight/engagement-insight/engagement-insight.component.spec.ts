import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { EngagementInsightComponent } from './engagement-insight.component';

describe('EngagementInsightComponent', () => {
  let component: EngagementInsightComponent;
  let fixture: ComponentFixture<EngagementInsightComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EngagementInsightComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EngagementInsightComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
