import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DrawerFilterComponent } from './drawer-filter.component';

describe('DrawerFilterComponent', () => {
  let component: DrawerFilterComponent;
  let fixture: ComponentFixture<DrawerFilterComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DrawerFilterComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DrawerFilterComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
