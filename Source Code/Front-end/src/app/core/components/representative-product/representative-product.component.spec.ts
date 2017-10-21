import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { RepresentativeProductComponent } from './representative-product.component';

describe('RepresentativeProductComponent', () => {
  let component: RepresentativeProductComponent;
  let fixture: ComponentFixture<RepresentativeProductComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ RepresentativeProductComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RepresentativeProductComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
