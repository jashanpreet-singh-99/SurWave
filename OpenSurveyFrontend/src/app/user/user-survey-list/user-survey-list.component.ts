import { HttpClient, HttpContext } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import {ActivatedRoute} from '@angular/router';
import { Survey } from 'src/app/models/survey';
import { SurveyService } from 'src/app/services/survey.service';

@Component({
  selector: 'app-user-survey-list',
  templateUrl: './user-survey-list.component.html',
  styleUrls: ['./user-survey-list.component.css']
})
export class UserSurveyListComponent implements OnInit {

  surveys: Survey[] = [];
  expiringSurveys: Survey[] = [];
  expiredSurveys: Survey[] = [];
  daysUntilExpiration = 2;
  constructor(private surveyService: SurveyService) { }

  ngOnInit(): void {
    this.surveyService.getUserSurveys().subscribe(
      data=>{
        this.surveys = data
        this.filterSurveysByExpiration()
      }
    )
  }

  filterSurveysByExpiration(): void {
    const currentDate = new Date();

    console.log("Current Date:", currentDate);

    this.expiringSurveys = this.surveys.filter(survey => {
      const expirationDate = new Date(survey.deadline);
      const timeDifference = expirationDate.getTime() - currentDate.getTime();
      const daysDifference = timeDifference / (1000 * 3600 * 24);
      return daysDifference <= this.daysUntilExpiration && daysDifference >= 0;
    });

    this.expiredSurveys = this.surveys.filter(survey => {
      const expirationDate = new Date(survey.deadline);
      const timeDifference = expirationDate.getTime() - currentDate.getTime();
      const daysDifference = timeDifference / (1000 * 3600 * 24);
      return daysDifference < 0;
    });

    this.surveys = this.surveys.filter(survey => {
      const expirationDate = new Date(survey.deadline);
      const timeDifference = expirationDate.getTime() - currentDate.getTime();
      const daysDifference = timeDifference / (1000 * 3600 * 24);
      return daysDifference > 0;
    });
  }

  numQuestions(survey: Survey): number {
    return 0 //survey.questions.length
  }
}
