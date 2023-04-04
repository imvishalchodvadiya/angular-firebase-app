import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddOpportunitiesComponent } from './add-opportunities.component';

describe('AddOpportunitiesComponent', () => {
  let component: AddOpportunitiesComponent;
  let fixture: ComponentFixture<AddOpportunitiesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AddOpportunitiesComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AddOpportunitiesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
