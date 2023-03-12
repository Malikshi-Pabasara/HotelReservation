import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HskpManagerComponent } from './hskp-manager.component';

describe('HskpManagerComponent', () => {
  let component: HskpManagerComponent;
  let fixture: ComponentFixture<HskpManagerComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ HskpManagerComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(HskpManagerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
