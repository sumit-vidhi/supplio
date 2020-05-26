import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { demandListComponent } from './demandlist.component';

describe('UserDashboardComponent', () => {
  let component: demandListComponent;
  let fixture: ComponentFixture<demandListComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ demandListComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(demandListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
