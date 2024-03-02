import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Project } from 'src/app/models/project.model';
@Component({
  selector: 'app-project',
  templateUrl: './project.component.html',
  styleUrl: './project.component.css'
})
export class ProjectComponent {
  projectId: string;
  project: Project;

  dummyProject: Project = {
    id: '1',
    name: 'Dummy Project',
    description: 'Description of Project 1',
    status: 'Active',
    owner: 'Taseen',
    assignees: ['Assignee 1', 'Assignee 2'],
    tasks: ['Task 1', 'Task 2']
  };

  constructor(private route: ActivatedRoute) {
    this.route.params.subscribe(params => {
      this.projectId = params['projectId'];
    });
  }

  ngOnInit() {
    this.project = this.getProjectData(this.projectId);
  }

  getProjectData(projectId: string): Project {
    return this.dummyProject;
  }

}
