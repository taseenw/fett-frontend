import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { HomeComponent } from './pages/home/home.component';
import { ProfileComponent } from './pages/profile/profile.component';
import { ExternalApiComponent } from './pages/external-api/external-api.component';
import { ErrorComponent } from './pages/error/error.component';
import { AuthGuard } from '@auth0/auth0-angular';
import { ProjectsComponent } from './pages/projects/projects.component';
import { ProjectComponent } from './pages/projects/project/project.component';
import { ProjectAddComponent } from './pages/projects/project-add/project-add.component';
import { ProjectEditComponent } from './pages/projects/project-edit/project-edit.component';
import { TaskEditComponent } from './components/task/task-edit/task-edit.component';
import { TaskAddComponent } from './components/task/task-add/task-add.component';

const routes: Routes = [
  {
    path: 'profile',
    component: ProfileComponent,
    canActivate: [AuthGuard],
  },
  {
    path: 'external-api',
    component: ExternalApiComponent,
    canActivate: [AuthGuard],
  },
  {
    path: 'error',
    component: ErrorComponent,
  },
  {
    path: '',
    component: HomeComponent,
    pathMatch: 'full',
  },
  {
    path: 'projects',
    component: ProjectsComponent,
    // canActivate: [AuthGuard],
  },
  {
    path: 'projects/:projectId',
    component: ProjectComponent,
    // canActivate: [AuthGuard],
  },
  {
    path: 'project/add',
    component: ProjectAddComponent,
    // canActivate: [AuthGuard],
  },
  {
    path: 'project/edit/:projectId',
    component: ProjectEditComponent,
    // canActivate: [AuthGuard],
  },
  {
    path: 'project/:projectId/add-task',
    component: TaskAddComponent,
  },
  {
    path: 'project/:projectId/edit-task',
    component: TaskEditComponent,
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes, {})],
  exports: [RouterModule],
})
export class AppRoutingModule {}
