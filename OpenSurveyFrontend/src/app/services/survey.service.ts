import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Survey } from '../models/survey';
import { Observable } from 'rxjs';
import { Question } from '../models/question';
import { SurveyResponse } from '../models/survey-response';
import { QuestionResponse } from '../models/question-response';
import { SurveyResponseRate } from '../models/survey-response-rate';
import { KeyValueS } from '../models/key-value-s';

@Injectable({
  providedIn: 'root'
})
export class SurveyService {

  constructor( private http: HttpClient) { }

  saveSurvey(survey: Survey) {
    return this.http.post('https://localhost:7164/api/survey/save', survey);
  }

  getAllSurveys(): Observable<Survey[]>{
    return this.http.get<Survey[]>('https://localhost:7164/api/survey/list')
  }

  getUserSurveys(): Observable<Survey[]>{
    return this.http.get<Survey[]>('https://localhost:7164/api/survey/user/list')
  }

  getSurveyQuestions(surveyId: number): Observable<Survey>{
    return this.http.get<Survey>('https://localhost:7164/api/survey/view/'+surveyId)
  }

  getSurveyQuestionsForEdit(surveyId: number) {
    return this.http.get<Survey>('https://localhost:7164/api/survey/edit/view/' + surveyId);
  }

  getSurveyQuestionCount(surveyId: number) {
    return this.http.post<KeyValueS>('https://localhost:7164/api/survey/question/count/', {"value": surveyId.toString()});
  }

  getSurveyQuestion(surveyId: number, questionId: number): Observable<Question>{
    return this.http.post<Question>('https://localhost:7164/api/survey/question', {'surveyId': surveyId, 'questionId': questionId})
  }

  submitSurveyResponse(response: SurveyResponse[]) {
    return this.http.post('https://localhost:7164/api/survey/response/submit', response);
  }

  getQuestionResponses( questionNo: number) {
    return this.http.post<QuestionResponse[]>('https://localhost:7164/api/survey/response/question', {"value": questionNo + ""});
  }

  getSurveyResponseRate(surveyId: number) {
    return this.http.post<SurveyResponseRate>('https://localhost:7164/api/survey/response/rate', {'value': surveyId});
  }

  getSurveyReport(surveyId: number) {
    return this.http.post('https://localhost:7164/api/survey/response/report', {'value': surveyId});
  }

  publishSurvey(surveyId: number) {
    return this.http.patch('https://localhost:7164/api/survey/publish', {'id': surveyId});
  }

  getTotalUserResponses() {
    return this.http.get<KeyValueS>(' https://localhost:7164/api/survey/response/count')
  }

  getSurveyEndingSoon() {
    return this.http.get<KeyValueS>(' https://localhost:7164/api/survey/end/soon/count')
  }

  getActiveSurveys() {
    return this.http.get<KeyValueS>(' https://localhost:7164/api/survey/active/count')
  }

  getCompletedStatus() {
    return this.http.get<Survey[]>('https://localhost:7164/api/survey/user/list/complete/status')
  }

  saveEditedSurvey(survey: Survey, surveyId: number){
    return this.http.put('https://localhost:7164/api/survey/edit/' + surveyId, survey);
  }
}
