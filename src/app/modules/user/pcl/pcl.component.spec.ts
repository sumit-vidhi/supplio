import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PclComponent } from './pcl.component';

describe('PclComponent', () => {
  let component: PclComponent;
  let fixture: ComponentFixture<PclComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [PclComponent]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PclComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
