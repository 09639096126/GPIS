import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { MainComponent } from './components_student/main/main.component';
import { OAuthModule } from 'angular-oauth2-oidc';
import { HttpClientModule } from '@angular/common/http';
import { HeaderComponent } from './components_student/header/header.component';
import { EventsComponent } from './components_student/events/events.component';
import { ContactComponent } from './components_student/contact/contact.component';
import { LoginComponent } from './components_admin/login/login.component';

import { SidenavComponent } from './components_admin/sidenav/sidenav.component';
import { DashboardComponent } from './components_admin/dashboard/dashboard.component';

import {MatSidenavModule} from '@angular/material/sidenav';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatIconModule } from '@angular/material/icon';
import { MatListModule } from '@angular/material/list';
import { MatMenuModule } from '@angular/material/menu';
import { GADEventsComponent } from './components_admin/gad-events/gad-events.component';
import { GadDatabasesComponent } from './components_student/gad-databases/gad-databases.component';
import { GadRosourceComponent } from './components_student/gad-rosource/gad-rosource.component';
import {MatTooltipModule} from '@angular/material/tooltip';
import { RegisterComponent } from './components_admin/register/register.component';
import { AdminLoginComponent } from './components_admin/admin-login/admin-login.component';
import { RepositoryComponent } from './components_admin/repository/repository.component';
import { AddEditRepoComponent } from './components_admin/repository/add-edit-repo/add-edit-repo.component';
import { ShowRepoComponent } from './components_admin/repository/show-repo/show-repo.component';
import { ToastrModule } from 'ngx-toastr';
import {MatStepperModule} from '@angular/material/stepper';
import { MatTableModule } from '@angular/material/table';
import { MatPaginatorModule } from '@angular/material/paginator';

import { MatButtonModule } from '@angular/material/button';
import { WordWrapPipe } from './components_admin/repository/word-wrap.pipe';
import { ShowRegComponent } from './components_admin/register/show-reg/show-reg.component';
import { AddEditRegComponent } from './components_admin/register/add-edit-reg/add-edit-reg.component';
import { MatFormFieldModule } from '@angular/material/form-field';
import {MatExpansionModule} from '@angular/material/expansion';
import { AddEditEventsComponent } from './components_admin/gad-events/add-edit-events/add-edit-events.component';
import { ShowEventsComponent } from './components_admin/gad-events/show-events/show-events.component';
import { NgxSpinnerModule } from 'ngx-spinner';
import { SpinnerComponent } from './spinner/spinner.component';

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    MainComponent,
    HeaderComponent,
    EventsComponent,
    SidenavComponent,
    ContactComponent,
    DashboardComponent,
    GADEventsComponent,
    GadDatabasesComponent,
    GadRosourceComponent,
    RegisterComponent,
    AdminLoginComponent,
    RepositoryComponent,
    AddEditRepoComponent,
    ShowRepoComponent,
    WordWrapPipe,
    ShowRegComponent,
    AddEditRegComponent,
    AddEditEventsComponent,
    ShowEventsComponent,
    SpinnerComponent,

    
    
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    //Auth
    OAuthModule.forRoot(),
    HttpClientModule,
    //Material
    MatSidenavModule,
    BrowserAnimationsModule,
    MatToolbarModule,
    MatIconModule ,
    MatListModule,
    MatMenuModule,
    MatTooltipModule,
    MatPaginatorModule,
    MatTableModule,
    MatButtonModule,
    MatStepperModule,
    MatFormFieldModule,
    FormsModule,
    ReactiveFormsModule,
    MatExpansionModule,
    NgxSpinnerModule,

     ToastrModule.forRoot({
      timeOut: 1000,
      extendedTimeOut: 1000,
      closeButton: true,
      progressBar: true,
      progressAnimation: 'increasing',
      positionClass: 'toast-top-center',
    }),
    
   
    
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
