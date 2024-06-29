import { Component, OnInit } from '@angular/core';
import { SurveyService } from '../../services/survey.service';
import { ActivatedRoute } from '@angular/router';
import { Question } from '../../models/question';
import { Survey } from '../../models/survey';
import { QuestionResponse } from '../../models/question-response';
import { ColorConfig } from '../../color-config';
import * as Papa from 'papaparse';
import { saveAs } from 'file-saver';


@Component({
  selector: 'app-admin-survey-results',
  templateUrl: './admin-survey-results.component.html',
  styleUrls: ['./admin-survey-results.component.css']
})
export class AdminSurveyResultsComponent implements OnInit {

  surveyId: number| undefined;
  questions: Question[] = [];
  selectedQuestionNo = -1;
  selectedQuestionIndex = -1;
  survey!: Survey;
  questionResponse: QuestionResponse[] = [];
  chartMode: number = 1;
  responseRate = 0;

  bgColor = ColorConfig.bgColor;
  bgDarkColor = ColorConfig.bgDarkColor;
  primaryColor = ColorConfig.primaryColor;

  selectedColor = this.primaryColor;
  totalResponses = 0;
  selectedOptionCount = 0;
  selectedPercentage = 0;
  selectedOptionLabel = "Option label";

  isPieHovered = false;
  isBarHovered = false;
  isDoughnutHovered = false;

  constructor(private surveyService: SurveyService, private route: ActivatedRoute) {}

  ngOnInit(): void {
    this.route.params.subscribe(params => {
      this.surveyId = params['id'];
      this.getSurveyQuestions();
      this.getSurveyResponseRate(this.surveyId!);
    });
  }

  getSurveyQuestions() {
    this.route.data.subscribe(
      (data) => {
        this.survey = data['survey'] as Survey;
        this.questions = this.survey.questions;
        if (this.questions.length > 0) {
          this.onQuestionSelectionChange(0, this.questions[0].id!);
          this.onOptionChanged(0);
        }
      }
    )
  }

  getSurveyResponseRate(surveyId: number) {
    this.surveyService.getSurveyResponseRate(surveyId).subscribe(
      response => {
        console.log("RR : " + response);
        if (response.total > 0) {
          this.responseRate = response.responses / response.total * 100;
        }
      }
    );
  }

  onQuestionSelectionChange(index: number, qNo: number) {
    console.log("Selected: " + qNo);
    this.surveyService.getQuestionResponses(qNo).subscribe(
        data => {
          console.log(data);
          this.selectedQuestionIndex = index;
          this.selectedQuestionNo = qNo;
          this.questionResponse = data;
          this.selectedOptionCount = 0;
          this.selectedColor = this.bgDarkColor;
          this.selectedOptionLabel = "";
          this.selectedPercentage = 0;
          this.totalResponses = this.questionResponse.reduce((total: number, resp: QuestionResponse) => total + resp.optionCount!, 0);
        }
    );
  }

  changeChartMode(mode: number) {
    this.chartMode = mode;
  }

  onOptionChanged(selectedOption: number) {
    this.selectedColor = ColorConfig.chartColors[selectedOption];
    this.selectedOptionLabel = this.questionResponse[selectedOption].optionText!;
    this.selectedOptionCount = this.questionResponse[selectedOption].optionCount!;
    if (this.selectedOptionCount > 0 && this.totalResponses > 0) {
      this.selectedPercentage = (this.selectedOptionCount/this.totalResponses) * 100;
    }
  }

  exportSurveyReport(){
    this.surveyService.getSurveyReport(this.surveyId!).subscribe(
      data  => {
        console.log(data);
        const csv = Papa.unparse(data as any);
        const blob = new Blob([csv], {type: "text/csv;charset=utf-8"});
        saveAs(blob, "survey-response-report_" +  this.surveyId +  ".csv");
      }
    )
  }

}
