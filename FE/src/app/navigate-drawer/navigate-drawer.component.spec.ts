import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NavigateDrawerComponent } from './navigate-drawer.component';

describe('NavigateDrawerComponent', () => {
  let component: NavigateDrawerComponent;
  let fixture: ComponentFixture<NavigateDrawerComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ NavigateDrawerComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(NavigateDrawerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
