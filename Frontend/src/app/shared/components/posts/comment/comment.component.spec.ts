import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ReplypostComponent } from './comment.component';

describe('ReplypostComponent', () => {
  let component: ReplypostComponent;
  let fixture: ComponentFixture<ReplypostComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ReplypostComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ReplypostComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
