import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ManageContentDashboardComponent } from './manage-content-dashboard.component';

describe('ManageContentDashboardComponent', () => {
  let component: ManageContentDashboardComponent;
  let fixture: ComponentFixture<ManageContentDashboardComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ManageContentDashboardComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ManageContentDashboardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
