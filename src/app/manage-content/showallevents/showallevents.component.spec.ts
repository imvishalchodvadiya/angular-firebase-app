import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ShowalleventsComponent } from './showallevents.component';

describe('ShowalleventsComponent', () => {
  let component: ShowalleventsComponent;
  let fixture: ComponentFixture<ShowalleventsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ShowalleventsComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ShowalleventsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
