import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MultiUserDashboardComponent } from './multi-user-dashboard.component';

describe('MultiUserDashboardComponent', () => {
  let component: MultiUserDashboardComponent;
  let fixture: ComponentFixture<MultiUserDashboardComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MultiUserDashboardComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MultiUserDashboardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
