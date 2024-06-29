import { Component, Input, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Survey } from 'src/app/models/survey';
import { SurveyService } from 'src/app/services/survey.service';

@Component({
  selector: 'app-user-survey-card',
  templateUrl: './user-survey-card.component.html',
  styleUrls: ['./user-survey-card.component.css']
})
export class UserSurveyCardComponent implements OnInit {
  @Input() survey!: Survey
  @Input() showViewButton: boolean = true;
  @Input() showEditButton: boolean = false;
  @Input() showResultButton: boolean = false;
  numQuestions!: number
  approxTime!: number

  constructor(private surveyService: SurveyService, private router: Router) { }

  ngOnInit() {
      this.surveyService.getSurveyQuestionCount(this.survey.id!).subscribe(
        data => {
          this.numQuestions = +data.value!;
          this.Time()
        }
      );
  }

  editSurvey() {
    this.router.navigate(['admin/survey/edit/' + this.survey.id]).then(
        () => {
          console.log("Navigation success");
        }
    ).catch(_error => {
      console.log("Navigation failure");
    })
  }

  viewResultsSurvey() {
    this.router.navigate(['admin/survey/results/' + this.survey.id]).then(
        () => {
          console.log("Navigation success");
        }
    ).catch(_error => {
      console.log("Navigation failure");
    })
  }


viewSurvey() {
  this.router.navigate(['/survey' + this.survey.id]).then(() => {});
}

Time() {
  this.approxTime = (0.5*this.numQuestions)
}


}
