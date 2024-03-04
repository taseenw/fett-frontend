import { Component, Output } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Project } from 'src/app/models/project.model';
import { Status, Priority, Task } from 'src/app/models/task.model';
import { Input } from '@angular/core';


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
  currentSubTasks: Task[];
  showSideBar: boolean = false;

  dummyData: Task = {
    id: 1,
    parentTaskId: 0,
    name: 'FETT Workflow Management Project',
    description: 'This is a description for this project',
    assignees: ['fuadthabet@gmail.com', 'ericgersh@gmail.com', 'taseenwaseq@gmail.com'],
    status: Status.Started,
    dueDate: '2024-12-12', // YYYY-MM-DD
    priority: Priority.Medium,
    comments: ["Comment 1 i hate this so much -Fuad", "Comment 2 I love this so much -Eric", "Comment 3 I am indifferent -Taseen"]
  };

  dummyData2: Task = {
    id: 2,
    parentTaskId: 1,
    name: 'Front End',
    description: 'I need to center this div. It is not centered. I need it to be centered',
    assignees: ['poop@pee.com'],
    status: Status.QA,
    dueDate: '2024-12-12', // YYYY-MM-DD
    priority: Priority.Low,
    comments: ["I cant seem to get it to center -Fuad", "Comment 2 I love this so much -Eric", "Comment 3 I am indifferent -Taseen"]
  };

  dummyData3: Task = {
    id: 3,
    parentTaskId: 1,
    name: 'Update Database',
    description: 'The database is in need of lots of refactoring',
    assignees: ['moussa@gmail.com'],
    status: Status.Started,
    dueDate: '2024-12-12', // YYYY-MM-DD
    priority: Priority.High,
    comments: ["Corrupted data - FUad", "Comment 2 I love this so much -Eric", "Comment 3 I am indifferent -Taseen"]
  };

  dummyData4: Task = {
    id: 4,
    parentTaskId: 3,
    name: 'Add new table to database',
    description: 'The database is in need of lots of refactoring',
    assignees: ['taseenwaseq@gmail.com'],
    status: Status.Started,
    dueDate: '2024-12-12', // YYYY-MM-DD
    priority: Priority.High,
    comments: ["Meeting needed to discuss - FUad"]
  };

  dummyData5: Task = {
    id: 5,
    parentTaskId: 4,
    name: 'Subtask for adding new table to database',
    description: 'The database is in need of lots of refactoring',
    assignees: ['timmy@gmail.com'],
    status: Status.Started,
    dueDate: '2024-12-12', // YYYY-MM-DD
    priority: Priority.High,
    comments: ["Meeting needed to discuss - FUad"]
  };

  dummyData6: Task = {
    id: 6,
    parentTaskId: 4,
    name: 'Subtask for adding editing table to database',
    description: 'The database is in need of lots of refactoring',
    assignees: ['ericgersh@gmail.com'],
    status: Status.Started,
    dueDate: '2024-12-12', // YYYY-MM-DD
    priority: Priority.High,
    comments: ["Meeting needed to discuss - FUad"]
  };

  dummyData7: Task = {
    id: 7,
    parentTaskId: 2,
    name: 'Add task views to front end',
    description: 'I need to center this div. It is not centered. I need it to be centered',
    assignees: ['ihateyou@gmail.com'],
    status: Status.QA,
    dueDate: '2024-12-12', // YYYY-MM-DD
    priority: Priority.Low,
    comments: ["I cant seem to get it to center -Fuad", "Comment 2 I love this so much -Eric", "Comment 3 I am indifferent -Taseen"]
  };

  dummyData8: Task = {
    id: 8,
    parentTaskId: 2,
    name: 'Add project views to front end',
    description: 'I need to center this div. It is not centered. I need it to be centered',
    assignees: ['email@gmail.com'],
    status: Status.QA,
    dueDate: '2024-12-12', // YYYY-MM-DD
    priority: Priority.Low,
    comments: ["I cant seem to get it to center -Fuad", "Comment 2 I love this so much -Eric", "Comment 3 I am indifferent -Taseen"]
  };

  dummyData9: Task = {
    id: 9,
    parentTaskId: 7,
    name: 'Within task view, create enums for status and priority attributes',
    description: 'I need to center this div. It is not centered. I need it to be centered',
    assignees: ['iuwf@gmail.com'],
    status: Status.QA,
    dueDate: '2024-12-12', // YYYY-MM-DD
    priority: Priority.Low,
    comments: ["I cant seem to get it to center -Fuad", "Comment 2 I love this so much -Eric", "Comment 3 I am indifferent -Taseen"]
  };


  dummyTasks: Task[] = [this.dummyData, this.dummyData2, this.dummyData3, this.dummyData4, this.dummyData5, this.dummyData6, this.dummyData7, this.dummyData8, this.dummyData9];

  dummyProject: Project = {
    id: '1',
    name: 'FETT Workflow Management Project',
    description: 'This is a description for this project',
    status: Status.Started,
    owner: 'fuadthabet@gmail.com',
    assignees: ['fuadthabet@gmail.com', 'ericgersh@gmail.com', 'taseenwaseq@gmail.com'],
    tasks: this.dummyTasks
  };


  constructor(private route: ActivatedRoute, private router: Router) {
    
  }

  ngOnInit() {
    this.project = this.getProjectData(this.projectId);
    let mainTasks = this.project.tasks.filter(x => x.parentTaskId === 1);
    this.selectedTask = this.project.tasks.filter(x => x.id === 1)[0];
    this.project.tasks = mainTasks;
  }

  getProjectData(projectId: string): Project {
    return this.dummyProject;
  }

  taskSideNav(task: Task) {
    
    this.selectedTask = task;
    this.currentSubTasks = this.dummyTasks.filter(x => x.parentTaskId === this.selectedTask.id);
    if (this.currentSubTasks.length === 0) { 
      this.showSideBar = true;
    } else {
      this.showSideBar = false;
      this.project.name = this.selectedTask.name;
      this.project.description = this.selectedTask.description;
      this.project.status = this.selectedTask.status;
      this.project.assignees = this.selectedTask.assignees;
      this.project.tasks = this.currentSubTasks;
    }
  }

  onCloseTask() {
    this.showSideBar = false;
    this.returnToParent();
  }

  returnToParent() {
    
    if(this.showSideBar) {
      this.showSideBar = false;
    }

    if (this.selectedTask.parentTaskId === 0) {
      this.router.navigate(['/projects']);
      this.project = this.getProjectData(this.projectId);
    } else {
      this.selectedTask = this.dummyTasks.filter(x => x.id === this.selectedTask.parentTaskId)[0];
      this.currentSubTasks = this.dummyTasks.filter(x => x.parentTaskId === this.selectedTask.id);
      this.project.name = this.selectedTask.name;
      this.project.description = this.selectedTask.description;
      this.project.status = this.selectedTask.status;
      this.project.assignees = this.selectedTask.assignees;
      this.project.tasks = this.currentSubTasks;
    }
  }

}