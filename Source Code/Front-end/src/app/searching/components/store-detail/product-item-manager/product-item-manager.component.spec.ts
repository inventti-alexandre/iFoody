import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ProductItemManagerComponent } from './product-item-manager.component';

describe('ProductItemManagerComponent', () => {
  let component: ProductItemManagerComponent;
  let fixture: ComponentFixture<ProductItemManagerComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ProductItemManagerComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ProductItemManagerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
