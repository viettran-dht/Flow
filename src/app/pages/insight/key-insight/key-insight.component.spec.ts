import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { KeyInsightComponent } from './key-insight.component';

describe('KeyInsightComponent', () => {
  let component: KeyInsightComponent;
  let fixture: ComponentFixture<KeyInsightComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ KeyInsightComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(KeyInsightComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
