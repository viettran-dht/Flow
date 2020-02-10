import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MyFlowsComponent } from './my-flows.component';

describe('MyFlowsComponent', () => {
  let component: MyFlowsComponent;
  let fixture: ComponentFixture<MyFlowsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MyFlowsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MyFlowsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
