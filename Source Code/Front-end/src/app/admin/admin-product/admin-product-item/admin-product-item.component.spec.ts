import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AdminProductItemComponent } from './admin-product-item.component';

describe('AdminProductItemComponent', () => {
  let component: AdminProductItemComponent;
  let fixture: ComponentFixture<AdminProductItemComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AdminProductItemComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AdminProductItemComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
