import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { BsRatingComponent } from './bs-rating.component';

describe('BsRatingComponent', () => {
  let component: BsRatingComponent;
  let fixture: ComponentFixture<BsRatingComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ BsRatingComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(BsRatingComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
