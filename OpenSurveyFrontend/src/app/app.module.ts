import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { RouterModule, Routes } from '@angular/router';
import { UserSurveyListComponent } from './user/user-survey-list/user-survey-list.component';
import { UserSurveyCardComponent } from './user/user-survey-card/user-survey-card.component';
import { SurveyViewComponent } from './survey/survey-view/survey-view.component';
import { SurveyQuestionCardComponent } from './survey/survey-question-card/survey-question-card.component';
import { NavbarComponent } from './navbar/navbar.component';
import { DashboardUserComponent } from './dashboards/dashboard-user/dashboard-user.component';
import { DashboardAdminComponent } from './dashboards/dashboard-admin/dashboard-admin.component';
import { UserLoginComponent } from './manage-users/user-login/user-login.component';
import { CreateSurveyComponent } from './survey/create-survey/create-survey.component';
import { AdminManageUserComponent } from './manage-users/admin-manage-user/admin-manage-user.component';
import { ReactiveFormsModule } from '@angular/forms';
import { FormsModule } from '@angular/forms';
import { HTTP_INTERCEPTORS, HttpClientModule } from '@angular/common/http';
import { AuthService } from './services/auth.service';
import { UserCardComponent } from './manage-users/user-card/user-card.component';
import { UserServiceService } from './services/user-service.service';
import { AdminSurveyViewComponent } from './survey/admin-survey-view/admin-survey-view.component';
import { AdminSurveyResultsComponent } from './survey/admin-survey-results/admin-survey-results.component';
import { FilterPipe } from './pipes/filter.pipe';
import { UserGroupService } from './services/user-group.service';
import { MatMenuModule } from '@angular/material/menu';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatButtonModule } from '@angular/material/button';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { BsDatepickerModule } from 'ngx-bootstrap/datepicker';
import { SurveyService } from './services/survey.service';
import { AuthInterceptor } from './services/auth.interceptor';
import { UserAuthGuard } from './services/user-auth-guard';
import { AdminAuthGuard } from './services/admin-auth-guard';
import { SurveyQuestionOnlyCardComponent } from './survey/survey-question-only-card/survey-question-only-card.component';
import { NgChartsModule } from 'ng2-charts';
import { BarChartComponentComponent } from './charts/bar-chart-component/bar-chart-component.component';
import { PieChartComponent } from './charts/pie-chart/pie-chart.component';
import { DoughnutChartComponent } from './charts/doughnut-chart/doughnut-chart.component';
import { ButtonLayoutDisplay, ButtonMaker, DialogLayoutDisplay, NgxAwesomePopupModule, ToastNotificationConfigModule, ToastPositionEnum, ToastProgressBarEnum, ToastUserViewTypeEnum  } from '@costlydeveloper/ngx-awesome-popup';
import { RoundProgressModule } from 'angular-svg-round-progressbar';
import { LottieModule } from 'ngx-lottie';
import player from 'lottie-web';
import { ErrorComponent } from './error/error.component';
import { DropdownComponent } from './manage-users/dropdown/dropdown.component';
import { RoundPipe } from './pipes/round-pipe';
import { HttpInterceptorService } from './services/http-interceptor.service';
import { LoginGuard } from './services/login.guard';
import { SurveyFetchingResolver } from './services/survey-fetching.resolver';
import { HeaderInfoCardComponent } from './dashboards/header-info-card/header-info-card.component';
import { EditSurveyComponent } from './survey/edit-survey/edit-survey.component';
import { SurveyEditFetchingResolver } from './services/survey-edit-fetching.resolver';

const appRoutes: Routes = [
  {path: 'account/login', component: UserLoginComponent, canActivate: [LoginGuard]},
  {path: 'user/home', component: DashboardUserComponent, canActivate: [UserAuthGuard]},
  {path: 'admin/home', component: DashboardAdminComponent, canActivate: [AdminAuthGuard]},
  {path: 'admin/manage', component: AdminManageUserComponent, canActivate: [AdminAuthGuard]},
  {path: 'admin/survey', component: AdminSurveyViewComponent, canActivate: [AdminAuthGuard]},
  {path: 'admin/survey/create', component: CreateSurveyComponent, canActivate: [AdminAuthGuard]},
  {path: 'admin/survey/edit/:id', component: EditSurveyComponent, canActivate: [AdminAuthGuard], resolve: {survey: SurveyEditFetchingResolver}},
  {path: 'admin/survey/results/:id', component: AdminSurveyResultsComponent, canActivate: [AdminAuthGuard], resolve: {survey: SurveyFetchingResolver}},
  {path: 'survey/:id', component: SurveyViewComponent, resolve: {survey: SurveyFetchingResolver}},
  {path: 'error', component: ErrorComponent},
  {path: '**', component: ErrorComponent}
]

export function playerFactory() {
  return player;
}

@NgModule({
  declarations: [
    AppComponent,
    UserSurveyListComponent,
    UserSurveyCardComponent,
    SurveyViewComponent,
    SurveyQuestionCardComponent,
    NavbarComponent,
    DashboardUserComponent,
    DashboardAdminComponent,
    UserLoginComponent,
    CreateSurveyComponent,
    AdminManageUserComponent,
    UserCardComponent,
    AdminSurveyResultsComponent,
    FilterPipe,
    RoundPipe,
    DropdownComponent,
    SurveyQuestionOnlyCardComponent,
    BarChartComponentComponent,
    PieChartComponent,
    DoughnutChartComponent,
    AdminSurveyViewComponent,
    ErrorComponent,
    HeaderInfoCardComponent,
    EditSurveyComponent
  ],

  imports: [
    AppRoutingModule,
    BrowserAnimationsModule,
    BrowserModule,
    BsDatepickerModule.forRoot(),
    NgChartsModule,
    FormsModule,
    HttpClientModule,
    RouterModule.forRoot(appRoutes),
    ReactiveFormsModule,
    MatMenuModule,
    MatCheckboxModule,
    MatButtonModule,
    NgxAwesomePopupModule.forRoot(),
    ToastNotificationConfigModule.forRoot({
      toastCoreConfig: {
        toastPosition: ToastPositionEnum.BOTTOM_RIGHT, // check API documentation ToastPositionEnum
        progressBar: ToastProgressBarEnum.DECREASE, // check API documentation ToastProgressBarEnum
        toastUserViewType: ToastUserViewTypeEnum.STANDARD, // check API documentation toastUserViewTypeEnum
        layoutType: DialogLayoutDisplay.WARNING, // check API documentation DialogLayoutDisplay
        buttonPosition: 'right', // check API documentation VerticalPosition
        textPosition: 'right', // check API documentation VerticalPosition
        confirmLabel: 'Confirm', // default confirmation button label
        declineLabel: 'Decline', // default declination button label
        autoCloseDelay: 3000, // Milliseconds it will be ignored if buttons are included.
        disableIcon: true, // Disable icon by default
        allowHtmlMessage: true,
      },
      globalSettings: {
        allowedNotificationsAtOnce: 4  // The number of toast notifications that can be shown at once.
      },
      // custom buttons overrides the buttons set with confirmLabel & declineLabel
      buttons: [
        new ButtonMaker('Ok', 'ok', ButtonLayoutDisplay.PRIMARY), // check API documentation ButtonLayoutDisplay
        new ButtonMaker('Cancel', 'cancel', ButtonLayoutDisplay.SECONDARY)
      ]
    }),
    LottieModule.forRoot({ player: playerFactory }),
    RoundProgressModule
  ],
  providers: [
    {
      provide: HTTP_INTERCEPTORS,
      useClass: AuthInterceptor,
      multi: true,
    },
    {
      provide: HTTP_INTERCEPTORS,
      useClass: HttpInterceptorService,
      multi: true
    },
    AuthService,
    AdminAuthGuard,
    UserAuthGuard,
    UserServiceService,
    UserGroupService,
    SurveyService,
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
