import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { RouterModule } from '@angular/router';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';

import { AppComponent } from './app.component';
import {AdminDashboardComponent} from './components/admin-dashboard/admin-dashboard.component';
import {SidebarComponent} from './components/admin-dashboard/sidebar/sidebar.component';
import {MainContentComponent} from './components/admin-dashboard/main-content/main-content.component';
import {HeaderComponent} from './components/admin-dashboard/header/header.component';
import { StudentListComponent } from './components/student-list/student-list.component';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {HttpClientModule} from '@angular/common/http';


@NgModule({
  declarations: [
    AppComponent,
    AdminDashboardComponent,
    HeaderComponent,
    SidebarComponent,
    MainContentComponent,
    StudentListComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
    RouterModule.forRoot([
      { path: 'admin', component: AdminDashboardComponent },
      {path: 'admin/students', component: StudentListComponent},
      { path: '', redirectTo: 'admin', pathMatch: 'full' }
    ])
    ,NgbModule
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
