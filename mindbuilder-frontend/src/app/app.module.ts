import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { RouterModule } from '@angular/router';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { ModalModule } from 'ngx-bootstrap/modal'; // Add this import

import { AppComponent } from './app.component';
import { AdminDashboardComponent } from './components/admin-dashboard/admin-dashboard.component';
import { SidebarComponent } from './components/admin-dashboard/sidebar/sidebar.component';
import { MainContentComponent } from './components/admin-dashboard/main-content/main-content.component';
import { HeaderComponent } from './components/admin-dashboard/header/header.component';
import { StudentListComponent } from './components/student-list/student-list.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { AppRoutingModule } from './app-routing.module';
import { ParentManagementComponent } from './components/parent-management/parent-management.component';
import { TeacherListComponent } from './components/teacher-list/teacher-list.component';

@NgModule({
  declarations: [
    AppComponent,
    AdminDashboardComponent,
    HeaderComponent,
    SidebarComponent,
    MainContentComponent,
    StudentListComponent,
    ParentManagementComponent,
    TeacherListComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
    ModalModule.forRoot(), // Add this to imports instead of BsModalService
    AppRoutingModule,
    NgbModule
  ],
  providers: [
    // BsModalService is already provided by ModalModule, so no need to add it here
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
