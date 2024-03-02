import { Component } from '@angular/core';
import { Task } from './task.model';
import { Priority } from './task.model';
import { Status } from './task.model';

@Component({
  selector: 'app-task',
  templateUrl: './task.component.html',
  styleUrl: './task.component.css'
})
export class TaskComponent {

  task: Task;
  comment: string= '';
  comments = [];
  dummyData: Task = {
    id: 34,
    parentTaskId: 12,
    name: 'Create NavBar',
    description: 'This is a description for this task',
    assignees: ['fuadthabet@gmail.com', 'ericgersh@gmail.com', 'taseenwaseq@gmail.com'],
    status: Status.InProgress,
    dueDate: '2024-12-12', // YYYY-MM-DD
    priority: Priority.Medium,
    comments: ["Comment 1 i hate this so much -Fuad", "Comment 2 I love this so much -Eric", "Comment 3 I am indifferent -Taseen"],
  };

  constructor() { }

  ngOnInit() {
    this.task = this.dummyData;
    this.comments = this.task.comments;
  }

  uploadComment(inputComment: string) {
    this.dummyData.comments.push(inputComment);

    this.comment = '';
  }
}
