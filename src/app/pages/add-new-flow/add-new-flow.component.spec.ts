import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AddNewFlowComponent } from './add-new-flow.component';

describe('AddNewFlowComponent', () => {
  let component: AddNewFlowComponent;
  let fixture: ComponentFixture<AddNewFlowComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AddNewFlowComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AddNewFlowComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
