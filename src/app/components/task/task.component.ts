import { Component, Output } from '@angular/core';
import { Task } from '../../models/task.model';
import { Priority } from '../../models/task.model';
import { Status } from '../../models/task.model';
import { Input } from '@angular/core';
import { EventEmitter } from '@angular/core';

@Component({
  selector: 'app-task',
  templateUrl: './task.component.html',
  styleUrl: './task.component.css'
})
export class TaskComponent {
  @Input() passedTask: Task;
  @Output() close: EventEmitter<void> = new EventEmitter<void>();


  task: Task;

  comment: string= '';
  comments = [];
  assignees = [];
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
    console.log(this.passedTask);
    this.comments = this.passedTask.comments;
    this.assignees = this.passedTask.assignees;
  }

  uploadComment(inputComment: string) {
    this.passedTask.comments.push(inputComment);

    this.comment = '';
  }

  onClose() {
    this.close.emit();
  }
}
