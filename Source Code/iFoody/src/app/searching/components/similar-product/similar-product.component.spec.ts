import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SimilarProductComponent } from './similar-product.component';

describe('SimilarProductComponent', () => {
  let component: SimilarProductComponent;
  let fixture: ComponentFixture<SimilarProductComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SimilarProductComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SimilarProductComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
