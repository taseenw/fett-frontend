import { Component } from '@angular/core';
@Component({
  selector: 'app-projects',
  templateUrl: './projects.component.html',
  styleUrl: './projects.component.css'
})
export class ProjectsComponent {
  projects = [];

  dummyData = [
    {
      id: 1,
      name: 'Project 1',
      description: 'This is a description for project 1',
      auth: 'View'
    },
    {
      id: 2,
      name: 'Project 2',
      description: 'This is a description for project 2',
      auth: 'Edit'
    },
    {
      id: 3,
      name: 'Project 3',
      description: 'This is a description for project 3',
      auth: 'View'
    }
  ];

  constructor() { }

  ngOnInit() {
    this.projects = this.getProjects();
  }

  getProjects() {    
    return this.dummyData;
  }
}
