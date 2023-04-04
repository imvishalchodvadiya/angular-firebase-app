import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ShowallopportunitiesComponent } from './showallopportunities.component';

describe('ShowallopportunitiesComponent', () => {
  let component: ShowallopportunitiesComponent;
  let fixture: ComponentFixture<ShowallopportunitiesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ShowallopportunitiesComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ShowallopportunitiesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
