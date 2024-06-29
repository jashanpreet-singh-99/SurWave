import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SurveyQuestionOnlyCardComponent } from './survey-question-only-card.component';

describe('SurveyQuestionOnlyCardComponent', () => {
  let component: SurveyQuestionOnlyCardComponent;
  let fixture: ComponentFixture<SurveyQuestionOnlyCardComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SurveyQuestionOnlyCardComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(SurveyQuestionOnlyCardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
