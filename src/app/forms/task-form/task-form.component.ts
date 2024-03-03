import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Task } from 'src/app/models/task.model';
import { Input } from '@angular/core';
import { AuthService } from '@auth0/auth0-angular';

@Component({
  selector: 'app-task-form',
  templateUrl: './task-form.component.html',
  styleUrls: ['./task-form.component.css']
})
export class TaskFormComponent implements OnInit {
  @Input() formType: string;
  tasksForm: FormGroup;
  pageTitle: string;
  authProfile: any;

  constructor(private fb: FormBuilder, private auth: AuthService) { }

  ngOnInit() {
    this.tasksForm = this.fb.group({
      name: ['', Validators.required],
      description: ['', Validators.required],
      status: ['', Validators.required],
      assignees: [''],
      dueDate: ['', Validators.required],
      priority: ['', Validators.required]
    });

    this.pageTitle = 'Create Task'; // You may adjust the title as needed
  }

  validSubmit() {
    this.auth.user$.subscribe(
      (profile) => ((this.authProfile = profile), this.submitForm(profile.email))
    );
  }

  submitForm(email: string) {
    this.tasksForm.controls['assignees'].setValue(email);
    if (this.tasksForm.valid) {
      const newTask: Task = this.tasksForm.value;
      // TODO: Add your logic to handle the new task (e.g., send it to the server)
      console.log('New Task:', newTask);
    }
  }
}