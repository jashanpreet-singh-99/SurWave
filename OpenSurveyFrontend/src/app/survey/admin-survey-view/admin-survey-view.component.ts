import { Component, OnInit } from '@angular/core';
import { ColorConfig } from '../../color-config';
import { Router } from '@angular/router';
import { Survey } from '../../models/survey';
import { SurveyService } from '../../services/survey.service';

@Component({
  selector: 'app-admin-survey-view',
  templateUrl: './admin-survey-view.component.html',
  styleUrls: ['./admin-survey-view.component.css']
})

export class AdminSurveyViewComponent implements OnInit {


  primaryColor = ColorConfig.primaryColor;
  primaryColorHLess = ColorConfig.primaryColorHashLess;
  bgColor = ColorConfig.bgColor;
  bgColorHLess = ColorConfig.bgColorHashLess;
  bgDarkColor = ColorConfig.bgDarkColor;
  secondaryColor = ColorConfig.secondaryColor;
  whiteColor = ColorConfig.white;

  surveys: Survey[] = [];

  isCreateHovered = false;

  constructor(
      private router: Router,
      private surveyService: SurveyService
  ) { }

  ngOnInit() {
    this.surveyService.getAllSurveys().subscribe(
        data => {
          this.surveys = data;
        }
    )
  }

  navigateToCreateSurvey() {
    this.router.navigate(['/admin/survey/create']).then(
        () => {
          console.log("Navigation Success");
        }
    ).catch(error => {
      console.log("Navigation Error");
    })
  }

  isOnGoingSurvey(survey: Survey): boolean {
    //console.log(survey.published + ' : ' + survey.deadline + ' - ' + new Date() + ' -- ' + (new Date(survey.deadline) >= new Date()));
    return survey.published && (new Date(survey.deadline) >= new Date());
  }

  isSurveyCompleted(survey: Survey): boolean {
    return survey.published && (new Date(survey.deadline) < new Date());
  }



}
