import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SystemadmindashboardComponent } from './systemadmindashboard.component';

describe('SystemadmindashboardComponent', () => {
  let component: SystemadmindashboardComponent;
  let fixture: ComponentFixture<SystemadmindashboardComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SystemadmindashboardComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SystemadmindashboardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
