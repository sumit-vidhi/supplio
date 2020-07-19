import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PslComponent } from './psl.component';

describe('PslComponent', () => {
  let component: PslComponent;
  let fixture: ComponentFixture<PslComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [PslComponent]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PslComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
