import { Component, Output } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Project } from 'src/app/models/project.model';
import { Status, Priority, Task } from 'src/app/models/task.model';
import { Input } from '@angular/core';
import { AuthService } from '@auth0/auth0-angular';

@Component({
  selector: 'app-project',
  templateUrl: './project.component.html',
  styleUrl: './project.component.css'
})
export class ProjectComponent {
  @Input() close: boolean = false;

  projectId: string;
  project: Project;
  selectedTask: Task;
  showSideBar: boolean = false;

  dummyData: Task = {
    id: 34,
    parentTaskId: 12,
    name: 'Create NavBar',
    description: 'This is a description for this task',
    assignees: ['fuadthabet@gmail.com', 'ericgersh@gmail.com', 'taseenwaseq@gmail.com'],
    status: Status.InProgress,
    dueDate: '2024-12-12', // YYYY-MM-DD
    priority: Priority.Medium,
    comments: ["Comment 1 i hate this so much -Fuad", "Comment 2 I love this so much -Eric", "Comment 3 I am indifferent -Taseen"]
  };

  dummyData2: Task = {
    id: 1,
    parentTaskId: 897,
    name: 'Center Div',
    description: 'I need to center this div. It is not centered. I need it to be centered',
    assignees: ['fuadthabet@gmail.com', 'ericgersh@gmail.com', 'taseenwaseq@gmail.com'],
    status: Status.QA,
    dueDate: '2024-12-12', // YYYY-MM-DD
    priority: Priority.Low,
    comments: ["I cant seem to get it to center -Fuad", "Comment 2 I love this so much -Eric", "Comment 3 I am indifferent -Taseen"]
  };

  dummyData3: Task = {
    id: 35,
    parentTaskId: 233,
    name: 'Update Database',
    description: 'The database is in need of lots of refactoring',
    assignees: ['fuadthabet@gmail.com', 'ericgersh@gmail.com', 'taseenwaseq@gmail.com'],
    status: Status.Started,
    dueDate: '2024-12-12', // YYYY-MM-DD
    priority: Priority.High,
    comments: ["Corrupted data - FUad", "Comment 2 I love this so much -Eric", "Comment 3 I am indifferent -Taseen"]
  };

  dummyTasks: Task[] = [this.dummyData, this.dummyData2, this.dummyData3];

  dummyProject: Project = {
    id: '1',
    name: 'Dummy Project',
    description: 'Description of Project 1',
    status: Status.Started,
    owner: 'Taseen',
    assignees: ['Assignee 1', 'Assignee 2'],
    tasks: this.dummyTasks
  };

  authProfile: any;
  email: string = null;
  constructor(private route: ActivatedRoute, public auth: AuthService) {
    this.route.params.subscribe(params => {
      this.projectId = params['projectId'];
    });
  }

  ngOnInit() {
    this.auth.user$.subscribe( 
      (profile) => ((this.authProfile = profile), this.getProjectData(profile.email)));
    console.log(this.email);
  }

  getProjectData(email: string) {
    // Fetch project data from backend
    fetch(`http://localhost:8000/api/projects/${this.projectId}`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      }
    })
    .then(response => response.json())
    .then(data => {
      // Handle the response data (list of users)
      console.log(data);
      this.project = data;
    }).catch(error => {
    // Handle any errors
    console.error('Error fetching users:', error);
    });
  }

  taskSideNav(task: Task) {
    this.showSideBar = true;
    this.selectedTask = task;
  }

  onCloseTask() {
    this.selectedTask = null;
    this.showSideBar = false;
  }

}
