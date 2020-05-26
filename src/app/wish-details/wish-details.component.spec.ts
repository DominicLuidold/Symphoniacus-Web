import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { WishDetailsComponent } from './wish-details.component';

describe('WishDetailsComponent', () => {
  let component: WishDetailsComponent;
  let fixture: ComponentFixture<WishDetailsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ WishDetailsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(WishDetailsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
