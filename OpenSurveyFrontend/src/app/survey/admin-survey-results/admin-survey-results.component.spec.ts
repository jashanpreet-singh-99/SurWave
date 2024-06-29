import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AdminSurveyResultsComponent } from './admin-survey-results.component';

describe('AdminSurveyResultsComponent', () => {
  let component: AdminSurveyResultsComponent;
  let fixture: ComponentFixture<AdminSurveyResultsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AdminSurveyResultsComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AdminSurveyResultsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
