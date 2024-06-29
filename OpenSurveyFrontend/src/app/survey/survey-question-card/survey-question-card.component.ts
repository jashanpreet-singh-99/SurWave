import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { Question } from 'src/app/models/question';

@Component({
  selector: 'app-survey-question-card',
  templateUrl: './survey-question-card.component.html',
  styleUrls: ['./survey-question-card.component.css']
})
export class SurveyQuestionCardComponent implements OnInit {

  @Input() question!: Question
  @Output() selectedOption = new EventEmitter<number>();
  @Input() questionNum!: number
  constructor() { }

  ngOnInit() {
  }

  onOptionSelected(option: number) {
    this.selectedOption.emit(option);
  }

}
