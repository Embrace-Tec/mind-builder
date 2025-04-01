import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AdminDashboardComponent } from './components/admin-dashboard/admin-dashboard.component';
import { StudentListComponent } from './components/student-list/student-list.component';
import {MainContentComponent} from './components/admin-dashboard/main-content/main-content.component';
import {ParentManagementComponent} from './components/parent-management/parent-management.component';
import {TeacherListComponent} from './components/teacher-list/teacher-list.component';
import {IQGameListComponent} from './components/iq-game-list/iq-game-list.component';
import {LessonListComponent} from './components/lesson-list/lesson-list.component';
import {AdminLessonListComponent} from './components/admin-lesson-list/admin-lesson-list.component';

const routes: Routes = [
  {
    path: '',
    redirectTo: 'admin',
    pathMatch: 'full'
  },
  {
    path: 'admin',
    component: AdminDashboardComponent,
    children: [
      {
        path: 'students',
        component: StudentListComponent
      },
      {
        path: 'parents',
        component: ParentManagementComponent
      },
      {
        path: 'teachers',
        component: TeacherListComponent
      },
      {
        path: 'games',
        component: IQGameListComponent
      },
      {
        path: 'lessons',
        component: LessonListComponent
      },
      {
        path: 'admin-lessons',
        component: AdminLessonListComponent
      },
      {
        path: '',
        component: MainContentComponent
      }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
