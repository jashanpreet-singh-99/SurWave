import { AfterViewInit, Component, OnInit } from '@angular/core';
import { UserServiceService } from '../../services/user-service.service';
import { SurveyService } from '../../services/survey.service';
import { ColorConfig } from '../../color-config';
import { ChartOptions, ChartType } from 'chart.js';
import { Survey } from '../../models/survey';

@Component({
  selector: 'app-dashboard-admin',
  templateUrl: './dashboard-admin.component.html',
  styleUrls: ['./dashboard-admin.component.css']
})
export class DashboardAdminComponent implements OnInit, AfterViewInit {

    userResponsesValue: number = 0;
    activeSurvey: number = 0;
    almostComplete: number = 0;
    activeUsers: number = 0;

    chartColors = ColorConfig.chartColors;

  chartOptions: ChartOptions = {
    responsive: true,
    maintainAspectRatio: false,
    scales: {
      x: {
        display: true,
        ticks: {
          display: true
        },
        grid: {
          display: false,
        }
      },
      y: {
        display: true,
        ticks: {
          maxTicksLimit: 8
        },
        grid: {
          display: true,
        }
      }
    }
  };
  public chartLabels = ['El1', 'El2', 'El3', 'El4'];
  chartType: ChartType  = 'line';
  public chartData = [{data: [26,	21, 35, 42], label: 'Data 1',
    fill: true}];

  surveys: Survey[] = [];

  constructor(
        private userService: UserServiceService,
        private surveyService: SurveyService
    ) {
    }

    ngOnInit(): void {
        this.userService.getActiveUsers().subscribe(
            data => {
                this.activeUsers = +data.value!;
            }
        );
        this.surveyService.getTotalUserResponses().subscribe(
            data => {
                this.userResponsesValue = +data.value!;
            }
        );
        this.surveyService.getSurveyEndingSoon().subscribe(
            data => {
                this.almostComplete = +data.value!;
            }
        );
        this.surveyService.getActiveSurveys().subscribe(
            data => {
                this.activeSurvey = +data.value!;
            }
        );
      this.surveyService.getAllSurveys().subscribe(
        data => {
          this.surveys = data;
        }
      )
    }

  ngAfterViewInit(): void {
  }

  isEditable(survey: Survey): boolean {
    //console.log(survey.published + ' : ' + survey.deadline + ' - ' + new Date() + ' -- ' + (new Date(survey.deadline) >= new Date()));
    return !survey.published;
  }

}
