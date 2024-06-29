import { Component, OnInit } from '@angular/core';
import { FormArray, FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Survey } from '../../models/survey';
import { Question } from '../../models/question';
import { Option } from '../../models/option';
import { SurveyService } from '../../services/survey.service';
import { UserGroupService } from '../../services/user-group.service';
import { UserGroup } from '../../models/user-group';
import { catchError } from 'rxjs';
import { Router } from '@angular/router';
import { AnimationOptions } from 'ngx-lottie';
import { ColorConfig } from '../../color-config';
import { ToastEvokeService } from '@costlydeveloper/ngx-awesome-popup';

@Component({
  selector: 'app-create-survey',
  templateUrl: './create-survey.component.html',
  styleUrls: ['../../../assets/survey.css', './create-survey.component.css']
})
export class CreateSurveyComponent implements OnInit {
  addNewSurveyForm!: FormGroup;
  userGroups: UserGroup[] = [];
  minDate: Date;
  selectedUserGroupId: number[] = [];
  isSurveySaved =  false;
  surveyId =  -1;

  isPublishing: boolean = false;

  // Colors
  primaryColor = ColorConfig.primaryColor;
  bgColor = ColorConfig.bgColor;
  bgDarkColor = ColorConfig.bgDarkColor;

  // Lottie animations
  lottieOptions: AnimationOptions = {
    path: '/assets/animation_email_sending.json',
  };
  cannotDelOption: boolean = false;
  cannotDelQuestion: boolean = false;

  constructor(
    private fb: FormBuilder,
    private surveyService: SurveyService,
    private userGroupService: UserGroupService,
    private router: Router,
    private toastService: ToastEvokeService
  ) {
    // Date picker
    this.minDate = new Date();
  }

  ngOnInit() {

    this.addNewSurveyForm = this.fb.group({
      // id: [null, Validators.required], // TODO: confirm if this is coming from the db
      name: [null, Validators.required],
      description: [null, Validators.required],
      deadline: [null],
      userGroups: [null],
      questionsList: this.fb.array([
        this.createDefaultQuestion()
      ])
    });

    // Fetch UserGroups
    this.userGroupService.getUserGroups().subscribe(
      (data: any) => {
        this.userGroups = data;
        // this.userGroups.forEach(() => {
        //   (this.addNewSurveyForm.controls['userGroups'] as FormArray).push(new FormControl(false));
        // });
      }
    );

  }

  getSurveyName(){
    return this.addNewSurveyForm.get('name') as FormArray;
  }

  getQuestionsFields(): FormGroup{
    return new FormGroup({
      questionText: new FormControl(''),
      // questionNumber: new FormControl(''), // TODO: confirm if this is coming from the db
      options:  this.fb.array([])
    });
  }

  questionsList(){
    return this.addNewSurveyForm.get('questionsList') as FormArray;
  }

  addQuestion(){
    const questionGroup = this.fb.group({
      questionText: ['', Validators.required],
      // questionNumber: ['', Validators.required], // TODO: confirm if this is coming from the db
      options: this.fb.array([
        this.createOption(),
        this.createOption()
      ])
    });
    this.questionsList().push(questionGroup);
  }

  options(questionIndex: number): FormArray {
    return this.questionsList().at(questionIndex).get('options') as FormArray;
  }


  addOption(questionIndex: number) {
    const options = this.options(questionIndex);
    options?.push(this.fb.group({
      optionText: ['', Validators.required],
      // optionNumber: ['', Validators.required] // TODO: confirm if this is coming from the db
    }));
  }

  getFormData(){
    // console.log(this.addOption());
    console.log("final form data->", this.addNewSurveyForm.value);
    let survey = new Survey();
    survey.name = this.addNewSurveyForm.controls['name'].value;
    survey.description = this.addNewSurveyForm.controls['description'].value;
    survey.deadline = this.addNewSurveyForm.controls['deadline'].value;
    survey.userGroups = JSON.stringify(this.selectedUserGroupId);
    let questions = this.addNewSurveyForm.controls['questionsList'].value;
    let quests: Question[] = [];
    questions.forEach((question: Question) => {
      let quest = new Question();
      console.log(question);
      quest.questionText = question.questionText;
      let opts: Option[] = [];
      console.log('opt' + question.options);
      question.options.forEach((option: Option) => {
        let opt = new Option();
        opt.optionText = option.optionText;
        opts.push(opt);
      });
      quest.options = opts;
      quests.push(quest);
    });
    survey.questions = quests;
    console.log(survey);
    this.surveyService.saveSurvey(survey).pipe(
      catchError(error => {
        console.error("Error: Saving survey : " + error.toString());
        return error;
      })
    ).subscribe((data:any) => {
      this.isSurveySaved = true;
      this.surveyId = +data.value;
      console.log("Survey Saved : " + this.surveyId);
      this.toastService.success("Survey Draft saved", "Survey is still not published, click on the publish button to make it available to users.")
    });
  }

  createDefaultQuestion(): FormGroup {
    return this.fb.group({
      questionText: ['', Validators.required],
      // questionNumber: ['', Validators.required],
      options: this.fb.array([
        this.createOption(),
        this.createOption()
      ])
    });
  }

  createOption(): FormGroup {
    return this.fb.group({
      optionId: [''],
      optionText: ['']
    });
  }

  addUserGroup(event: any, id: number) {
    if (event.checked) {
      if (!this.selectedUserGroupId.includes(id)) {
        this.selectedUserGroupId.push(id)
      }
    } else {
      let index = this.selectedUserGroupId.indexOf(id);
      if (index > -1) {
        this.selectedUserGroupId.splice(index, 1);
      }
    }
  }

  removeOption(q: number, o: number){
    if(o >= 2){
      this.options(q).removeAt(o)
      this.cannotDelOption = true;
    }
    
  }

  removeQuestion(q: number){
    if(q>=1){
      this.questionsList().removeAt(q)
      this.cannotDelQuestion = true;
    }
    
    console.log(this.questionsList())
  }

  publishSurvey() {
    this.isPublishing = true;
    if (this.isSurveySaved) {
      this.surveyService.publishSurvey(this.surveyId).subscribe(
        data => {
          console.log("Survey Publish: " + data);
          this.router.navigate(['/admin/survey']).then(() => {
            console.log('Navigation Success');
          }).catch(error => {
            console.error('Navigation failed:', error);
          })
        }
      );
    }
  }

  skipWaitTask() {
    this.router.navigate(['/admin/survey']).then(() => {
      console.log('Navigation Success');
    }).catch(error => {
      console.error('Navigation failed:', error);
    });
  }
}
