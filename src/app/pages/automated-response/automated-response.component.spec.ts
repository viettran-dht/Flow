import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AutomatedResponseComponent } from './automated-response.component';

describe('AutomatedResponseComponent', () => {
  let component: AutomatedResponseComponent;
  let fixture: ComponentFixture<AutomatedResponseComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AutomatedResponseComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AutomatedResponseComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
