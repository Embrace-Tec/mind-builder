import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AdminDashboardComponent } from './components/admin-dashboard/admin-dashboard.component';
import { StudentListComponent } from './components/student-list/student-list.component';

const routes: Routes = [
  { path: '', redirectTo: 'admin', pathMatch: 'full' },
  {
    path: 'admin',
    component: AdminDashboardComponent,
    children: [
      { path: 'students', component: StudentListComponent },
      { path: '', redirectTo: 'students', pathMatch: 'full' }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
