import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SignupByEmailComponent } from './signup-by-email.component';

describe('SignupByEmailComponent', () => {
  let component: SignupByEmailComponent;
  let fixture: ComponentFixture<SignupByEmailComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SignupByEmailComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SignupByEmailComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
