import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DrawerAddEventComponent } from './drawer-add-event.component';

describe('DrawerAddEventComponent', () => {
  let component: DrawerAddEventComponent;
  let fixture: ComponentFixture<DrawerAddEventComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DrawerAddEventComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DrawerAddEventComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
