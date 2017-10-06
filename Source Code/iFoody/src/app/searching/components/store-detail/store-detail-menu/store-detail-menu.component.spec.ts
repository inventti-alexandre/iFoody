import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { StoreDetailMenuComponent } from './store-detail-menu.component';

describe('StoreDetailMenuComponent', () => {
  let component: StoreDetailMenuComponent;
  let fixture: ComponentFixture<StoreDetailMenuComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ StoreDetailMenuComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(StoreDetailMenuComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
