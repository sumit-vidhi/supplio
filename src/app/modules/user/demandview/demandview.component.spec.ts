import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { demandViewComponent } from './demandview.component';

describe('UserDashboardComponent', () => {
  let component: demandViewComponent;
  let fixture: ComponentFixture<demandViewComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ demandViewComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(demandViewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
