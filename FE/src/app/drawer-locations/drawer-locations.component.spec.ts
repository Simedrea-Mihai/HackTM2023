import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DrawerLocationsComponent } from './drawer-locations.component';

describe('DrawerLocationsComponent', () => {
  let component: DrawerLocationsComponent;
  let fixture: ComponentFixture<DrawerLocationsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DrawerLocationsComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DrawerLocationsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
