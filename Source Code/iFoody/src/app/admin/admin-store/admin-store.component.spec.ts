import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AdminStoreComponent } from './admin-store.component';

describe('AdminStoreComponent', () => {
  let component: AdminStoreComponent;
  let fixture: ComponentFixture<AdminStoreComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AdminStoreComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AdminStoreComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
