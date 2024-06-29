import { Component, OnInit } from '@angular/core';
import { FormArray, FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Question } from 'src/app/models/question';
import { Survey } from 'src/app/models/survey';
import { SurveyService } from 'src/app/services/survey.service';
import { UserGroupService } from '../../services/user-group.service';
import { UserGroup } from 'src/app/models/user-group';
import { Option } from 'src/app/models/option';
import { catchError, throwError } from 'rxjs';
import { AnimationOptions } from 'ngx-lottie';
import { ColorConfig } from '../../color-config';
import { ToastEvokeService } from '@costlydeveloper/ngx-awesome-popup';


@Component({
  selector: 'app-edit-survey',
  templateUrl: './edit-survey.component.html',
  styleUrls: ['../../../assets/survey.css', './edit-survey.component.css']
})
export class EditSurveyComponent implements OnInit {

  surveyId!: number;  // each survey must always have an id
  survey!: Survey;  // survey data structure
  userGroups: UserGroup[] = [];
  questions!: any;
  minDate!: Date;
  selectedUserGroupId: number[] = [];
  surveyFB!: FormGroup;

  isPublishing: boolean = false;
  isSurveySaved =  false;
  lottieOptions: AnimationOptions = {
    path: '/assets/animation_email_sending.json',
  };

  // Colors
  primaryColor = ColorConfig.primaryColor;
  bgColor = ColorConfig.bgColor;
  bgDarkColor = ColorConfig.bgDarkColor;


  constructor(private surveyService: SurveyService,
              private route: ActivatedRoute,
              private fb: FormBuilder,
              private userGroupService: UserGroupService,
              private router: Router,
              private toastService: ToastEvokeService

) {
    this.surveyFB = this.fb.group({
      name: [null, Validators.required],
      description: [null, Validators.required],
      deadline: [null],
      userGroups: [null],
      questions: [null]
    });

    // Fetch UserGroups
    this.userGroupService.getUserGroups().subscribe(
        (data: any) => {
          this.userGroups = data;
        }
    );
  }

  ngOnInit() {
    this.getSurveyData();
  }

  getSurveyData() {
    console.log("survey id", +this.route.snapshot.paramMap.get('id')!);
    this.surveyId = +this.route.snapshot.paramMap.get('id')!;

    this.route.data.subscribe((dataFetched: any) => {
      const data = dataFetched['survey'] as Survey;
      // .split('T')[0]
      const dateFormatted = data['deadline'].toString().split('T')[0];
      console.log("date", dateFormatted)
      this.surveyFB = new FormGroup({
        name: new FormControl(data['name']),
        description: new FormControl(data['description']),
        deadline: new FormControl(dateFormatted),
        userGroups: new FormControl(data['userGroups']),
        questions: this.fb.array([
        ])
      })
      this.survey = data;
      this.questions = this.surveyFB.get('questions')

      data['questions'].forEach((question: Question) => {
            this.populateSingleQuestion(question)
                question['options'].forEach((option: Option) => {
                  this.populateSingleOption(option, data['questions'])
                  // console.log("-----------------------------------------", question)
                })
          }
      );
    });
  }

  questionsList() {
    return this.surveyFB.get('questions') as FormArray;
  }

  options(questionIndex: number): FormArray {
    return this.questionsList().at(questionIndex).get('options') as FormArray;
  }

  onSubmit() {
    let editedSurvey = new Survey();
    editedSurvey.id = this.surveyId;
    editedSurvey.name = this.surveyFB.controls['name'].value;
    editedSurvey.description = this.surveyFB.controls['description'].value;
    editedSurvey.deadline = this.surveyFB.controls['deadline'].value;
    editedSurvey.userGroups = JSON.stringify(this.selectedUserGroupId);

    let questions = this.surveyFB.controls['questions'].value;
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
    editedSurvey.questions = quests;

    console.log("final form data->", editedSurvey);

    // saving to the DB
    this.surveyService.saveEditedSurvey(editedSurvey, this.surveyId).pipe(
      catchError(error => {
        console.error("Error: Saving edited survey : " + error.toString(), editedSurvey);
        return throwError(() => error);
      })
    ).subscribe(_data => {
      console.log("Saved");
      this.isSurveySaved = true;
      this.toastService.success("Survey Draft saved", "Survey is still not published, click on the publish button to make it available to users.")
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

  populateSingleQuestion(question: Question) {
    const questionFormGroup = this.fb.group({
          questionText: new FormControl(question.questionText),
          options: this.fb.array([])
        }
    );

    this.questions.push(questionFormGroup);

    question['options'].forEach(
        (option: Option) => {
          this.populateSingleOption(option, questionFormGroup.get('options') as FormArray)
        }
    )
  }

  populateSingleOption(option: Option, second: any) {
    const optionGroup = this.fb.group({
      optionText: option.optionText
    })
    second.push(optionGroup);
  }

  addQuestion() {
    const questionGroup = this.fb.group({
      questionText: ['', Validators.required],
      options: this.fb.array([
        this.createOption(),
        this.createOption()
      ])
    });
    this.questions.push(questionGroup);
  }

  createOption(): FormGroup {
    return this.fb.group({
      optionId: [''],
      optionText: ['']
    });
  }

  addOption(questionIndex: number) {
    const options = this.options(questionIndex);
    options?.push(this.fb.group({
      optionText: ['', Validators.required],
    }));
  }

  removeOption(q: number, o: number) {
    this.options(q).removeAt(o)
    // console.log(this.optionsList(q))
  }

  removeQuestion(q: number) {
    this.questionsList().removeAt(q)
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
