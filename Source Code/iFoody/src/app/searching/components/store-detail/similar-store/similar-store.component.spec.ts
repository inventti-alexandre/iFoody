import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SimilarStoreComponent } from './similar-store.component';

describe('SimilarStoreComponent', () => {
  let component: SimilarStoreComponent;
  let fixture: ComponentFixture<SimilarStoreComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SimilarStoreComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SimilarStoreComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
