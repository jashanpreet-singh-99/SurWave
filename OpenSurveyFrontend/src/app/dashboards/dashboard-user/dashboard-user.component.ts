import { Component, OnInit } from '@angular/core';
import { Survey } from 'src/app/models/survey';
import { SurveyService } from 'src/app/services/survey.service';
import { UsernameService } from '../../services/username.service';

@Component({
  selector: 'app-dashboard-user',
  templateUrl: './dashboard-user.component.html',
  styleUrls: ['./dashboard-user.component.css']
})
export class DashboardUserComponent implements OnInit {

  surveys: Survey[] = [];
  allSurveys: Survey[] = []
  expiringSurveys: Survey[] = [];
  expiredSurveys: Survey[] = [];
  completedSurveys: Survey[] = [];
  daysUntilExpiration = 2;
  surveyLength!: number;
  selectedOption = 'available';
  selectedColor = '';
  userName!: any
  expired: Boolean = false

  constructor(private surveyService: SurveyService, private usernameService: UsernameService) { }

  ngOnInit(): void {
    this.surveyService.getCompletedStatus().subscribe(
      data=>{
        this.userName = localStorage.getItem('username');
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
      return daysDifference <= this.daysUntilExpiration && daysDifference >= 0 && !survey.isCompleted;
    });

    this.expiredSurveys = this.surveys.filter(survey => {
      const expirationDate = new Date(survey.deadline);
      const timeDifference = expirationDate.getTime() - currentDate.getTime();
      const daysDifference = timeDifference / (1000 * 3600 * 24);
      return daysDifference < 0 && !survey.isCompleted;
    });

    this.completedSurveys = this.surveys.filter(survey => survey.isCompleted)

    this.surveys = this.surveys.filter(survey => {
      const expirationDate = new Date(survey.deadline);
      const timeDifference = expirationDate.getTime() - currentDate.getTime();
      const daysDifference = timeDifference / (1000 * 3600 * 24);
      return daysDifference > 0 && !survey.isCompleted;
    });

    this.surveyLength = this.surveys.length

    this.allSurveys = this.surveys
  }

  getClassBasedOnPosition(index: number): string {
    if(index === 0 && index === this.surveys.length - 1) {
      return ''
    }
    else if (index === 0) {
      return 'first-item-class';
    } else if (index === this.surveys.length - 1) {
      return 'last-item-class';
    } else {
      return 'middle-item-class';
    }
  }

  showAll() {
    this.surveys = this.allSurveys;
    this.surveyLength = this.allSurveys.length
    this.expired = false
  }

  showExpiring() {
    this.surveys = this.expiringSurveys
    this.surveyLength = this.expiringSurveys.length
    this.expired = false
  }

  showExpired() {
    this.surveys = this.expiredSurveys
    this.surveyLength = this.expiredSurveys.length
    this.expired = true

  }

  showCompleted() {
    this.surveys = this.completedSurveys
    this.surveyLength = this.completedSurveys.length
    this.expired = true
  }

    changeWaveColor(color: string) {
    const waveElement = document.getElementById('wave');
    waveElement!.style.backgroundColor = color;
  }

  selectOption(option: string): void {
    this.selectedOption = option;
    this.selectedColor = '#c99c34'
  }


}
