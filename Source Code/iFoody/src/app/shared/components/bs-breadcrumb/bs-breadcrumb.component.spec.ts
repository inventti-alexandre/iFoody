import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { BsBreadcrumbComponent } from './bs-breadcrumb.component';

describe('BsBreadcrumbComponent', () => {
  let component: BsBreadcrumbComponent;
  let fixture: ComponentFixture<BsBreadcrumbComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ BsBreadcrumbComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(BsBreadcrumbComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
