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
  
  constructor() { }

  ngOnInit() {
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
