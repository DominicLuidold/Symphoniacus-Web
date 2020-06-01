import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { WishOverviewComponent } from './wish-overview.component';

describe('WishOverviewComponent', () => {
  let component: WishOverviewComponent;
  let fixture: ComponentFixture<WishOverviewComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ WishOverviewComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(WishOverviewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
