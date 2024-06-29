import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Question } from 'src/app/models/question';
import { Survey } from 'src/app/models/survey';
import { SurveyService } from 'src/app/services/survey.service';
import { SurveyResponse } from '../../models/survey-response';
import { ColorConfig } from '../../color-config';
import { AnimationOptions } from 'ngx-lottie';
import { ToastEvokeService } from '@costlydeveloper/ngx-awesome-popup';

@Component({
  selector: 'app-survey-view',
  templateUrl: './survey-view.component.html',
  styleUrls: ['./survey-view.component.css']
})
export class SurveyViewComponent implements OnInit {

  questions: Question[] = []
  survey!: Survey
  selectedQuestion: Question| undefined;
  selectedQuestionIndex: number = 0;
  timer:any;
  currentTimer: number = 0;
  maxTimeLimit: number = 30;

  questionResponses: SurveyResponse[] = [];

  isNxtQuestionHovered = false;
  isPrvQuestionHovered = false;
  isSaveButtonHovered = false;
  disablePrevBtn: boolean = false;
  disableNxtBtn: boolean = false;

  pageCtr = new Array(5);
  pageSelectionIndex = -1;
  pageCtrHover: boolean[] = [];

  questionHover: boolean[] = [];
  optionsHover: boolean[] = [];
  optionSelectionIndex = -1;

  bgColor = ColorConfig.bgColor;
  bgDarkColor = ColorConfig.bgDarkColor;
  primaryColor = ColorConfig.primaryColor;
  whiteColor = ColorConfig.white;
  disabledColor = ColorConfig.disabled;
  secondaryColor = ColorConfig.secondaryColor;
  errorRedColor = ColorConfig.errorRed;

  // error Timer
  errorTimer:any;
  errorTimeout: number = 5;
  showErrorDiv: boolean = false;

  // survey Count down
  surveyTimer: any;
  surveyTimeout: number = 5;

  completedPercentage = 0;

  isSubmitted: boolean = false;

  // Lottie animations
  lottieOptions: AnimationOptions = {
    path: '/assets/completed.json',
  };

  constructor(
    private surveyService: SurveyService,
    private route: ActivatedRoute,
    private router: Router,
    private toastService: ToastEvokeService
  ) { }

  ngOnInit() {
    this.maxTimeLimit = 30;

    this.pageCtrHover.fill(false);
    this.optionsHover.fill(false);
    this.questionHover.fill(false);

    this.startTimer();
    this.getSurveyQuestions();
  }

  getSurveyQuestions() {
    this.route.data.subscribe(
      (data) => {
        this.survey = data['survey'] as Survey;
        this.questions = this.survey.questions
        this.fillBlankResponses(this.survey);
        this.onQuestionSelectionChange(0,this.questions[0].id!);
        console.log(this.questions);
      }
    );
  }

  fillBlankResponses(survey: Survey) {
    for (let i: number = 0; i < survey.questions.length; i++)
    {
      this.questionResponses.push({
        surveyId: this.survey.id,
        questionId: this.survey.questions[i].id,
        optionId: -1
      });
    }
    this.completedPercentage = 0;
  }

  onSubmitSurvey() {
    for (let i = 0; i < this.questionResponses.length; i++) {
      if (this.questionResponses[i].optionId == -1) {
        console.log("Option Check: " + this.questionResponses[i].questionId);
        this.onQuestionSelectionChange(i, this.questionResponses[i].questionId!);
        this.showErrorTimer();
        return;
      }
    }
    console.log(this.questionResponses);
    this.surveyService.submitSurveyResponse(this.questionResponses).subscribe(
      resp => {
        console.log("RESP: " + resp);
        this.showSurveySubmissionCompleted();
      }
    )
  }

  onQuestionSelectionChange(index:number, qNo: number) {
    console.log("Selected: " + qNo);
    this.surveyService.getSurveyQuestion(this.survey.id!, qNo).subscribe(
      data => {
        console.log("Q : " + data);
        this.selectedQuestion = data as Question;
        this.selectedQuestionIndex = index;
        if (this.questionResponses[index].optionId! > -1) {
         this.optionSelectionIndex = this.questionResponses[index].optionId!;
          console.log("prev: Option called" + this.optionSelectionIndex);
        } else {
          this.optionSelectionIndex = -1;
        }
        console.log("Selected: Option " + this.optionSelectionIndex);
        this.maxTimeLimit = 30;
        this.currentTimer = 1;
        clearInterval(this.timer);
        this.startTimer();
        this.adjustPageControls();
      }
    );
  }

  onOptionSelectionChange(optionIndex: number) {
    this.optionSelectionIndex = this.selectedQuestion?.options[optionIndex].id!;
    this.questionResponses[this.selectedQuestionIndex].optionId = this.selectedQuestion?.options[optionIndex].id;
    this.getCurrentProgress();
  }

  getCurrentProgress() {
    let count = 0;
    for (let i: number = 0; i < this.questionResponses.length; i++) {
      if (this.questionResponses[i].optionId! > -1) {
        count++;
      }
    }
    this.completedPercentage = count / this.questionResponses.length * 100;
  }

  adjustPageControls() {
    this.disablePrevBtn = this.selectedQuestionIndex <= 0;
    this.disableNxtBtn = this.selectedQuestionIndex == this.questions.length - 1;

    for (let i: number  = 0 ; i < 5; i++) {
      if (this.selectedQuestionIndex + 5 > this.questions.length) {
        break;
      } else {
        this.pageSelectionIndex = 1;
      }
        if (this.selectedQuestionIndex + i < this.questions.length) {
          this.pageCtr[i] = this.selectedQuestionIndex + i;
        } else {
          this.pageCtr[i] = -1;
        }
    }
  }

  startTimer() {
    this.timer = setInterval(() => {
      if (this.maxTimeLimit > 0) {
        this.maxTimeLimit--;
        this.currentTimer = (30-this.maxTimeLimit)/30 * 100;
      } else {
        clearInterval(this.timer);
      }
    }, 1000);
  }

  getPrevQuestion() {
    if (this.pageSelectionIndex > 0) {
      this.pageSelectionIndex--;
    }
    this.onQuestionSelectionChange(this.selectedQuestionIndex - 1,
      this.questions[this.selectedQuestionIndex - 1].id!);
  }

  onPageJumpBtn(index: number, questionIndex: number) {
    this.pageSelectionIndex = index;
    this.onQuestionSelectionChange(questionIndex,  this.questions[questionIndex].id!)
  }

  getNextQuestion() {
    if (this.pageSelectionIndex < this.questions.length - 1) {
      this.pageSelectionIndex++;
    }
    this.onQuestionSelectionChange(this.selectedQuestionIndex + 1,
      this.questions[this.selectedQuestionIndex + 1].id!);
  }

  showErrorTimer() {
    this.errorTimeout = 5;
    this.showErrorDiv = true;
    this.errorTimer = setInterval(() => {
      if (this.errorTimeout > 0) {
        this.errorTimeout--;
      } else {
        this.showErrorDiv = false;
        clearInterval(this.errorTimer);
      }
    }, 1000);
  }

  showSurveySubmissionCompleted() {
    this.isSubmitted = true;
    this.surveyTimer = setInterval(() => {
      if (this.surveyTimeout > 0) {
        this.surveyTimeout--;
      } else {
        clearInterval(this.surveyTimer);
        this.router.navigate(['user/home']).then(() => {
          console.log('Navigation Success');
        }).catch(error => {
          this.toastService.warning('Navigation Failure', 'Please try again.');
          console.error('Navigation failed:', error);
        });
      }
    }, 1000);
  }

}
