import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MonthwiseComponent } from './monthwise.component';

describe('MonthwiseComponent', () => {
  let component: MonthwiseComponent;
  let fixture: ComponentFixture<MonthwiseComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MonthwiseComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MonthwiseComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
