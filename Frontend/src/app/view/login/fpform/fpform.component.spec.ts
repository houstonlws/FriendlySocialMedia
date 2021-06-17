import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FpformComponent } from './fpform.component';

describe('FpformComponent', () => {
  let component: FpformComponent;
  let fixture: ComponentFixture<FpformComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ FpformComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(FpformComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
