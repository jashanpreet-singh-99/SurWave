import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { Question } from '../../models/question';
import { ColorConfig } from '../../color-config';

@Component({
  selector: 'app-survey-question-only-card',
  templateUrl: './survey-question-only-card.component.html',
  styleUrls: ['./survey-question-only-card.component.css']
})
export class SurveyQuestionOnlyCardComponent implements OnInit {

  @Input() question!: Question;
  @Input() questionIndex!: number;
  @Input() selectedQuestionNo = 0;
  @Output() selectedQuestion = new EventEmitter<number>();

  bgDarkColor = ColorConfig.bgDarkColor;
  primaryColor = ColorConfig.primaryColor;
  whiteColor = ColorConfig.white;

  isQuestionHovered = false;

  constructor() { }

  ngOnInit(): void {
  }

  onQuestionSelected() {
    this.selectedQuestion.emit(this.question.id);
  }

}
