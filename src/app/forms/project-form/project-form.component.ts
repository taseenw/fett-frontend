import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Project } from 'src/app/models/project.model';
import { Input } from '@angular/core';
import { Status } from 'src/app/models/task.model';
import { AuthService } from '@auth0/auth0-angular';

@Component({
  selector: 'app-project-form',
  templateUrl: './project-form.component.html',
  styleUrls: ['./project-form.component.css']
})
export class ProjectFormComponent implements OnInit {
  projectsForm: FormGroup;
  pageTitle: string;
  @Input() formType: string;
  projectToEdit: Project;
  authProfile: any;

  
  constructor(private fb: FormBuilder, private auth: AuthService) { }
  ngOnInit() {
    this.projectsForm = this.fb.group({
      name: ['', Validators.required],
      description: ['', Validators.required],
      status: ['', Validators.required],
      owner: [''],
      assignees: [''] // You can leave this empty or initialize with default value
    });

    if(this.formType === 'edit') {
      this.pageTitle = 'Edit Project';
      this.populateForm();
    } else {
      this.pageTitle = 'Create Project';
    }
  }

  validSubmit() {
    this.auth.user$.subscribe( 
      (profile) => ((this.authProfile = profile), this.submitForm(profile.email)));
  }

  submitForm(email:string) {
    this.projectsForm.controls['owner'].setValue(email);
    if (this.projectsForm.valid) {
      const newProject: Project = this.projectsForm.value;
      // TODO: Add your logic to handle the new project (e.g., send it to the server)
      console.log('New Project:', newProject);
    }
  }

  populateForm() {
    let dummyProject: Project = {
      id: '1',
      name: 'Dummy Project',
      description: 'This is a dummy project',
      status: Status.InProgress,
      owner: 'john@gmail.com',
      assignees: ['John Doe', 'Jane Doe'],
      tasks: []
    };

    this.projectToEdit = dummyProject;
    this.projectsForm.controls['name'].setValue(this.projectToEdit.name);
    this.projectsForm.controls['description'].setValue(this.projectToEdit.description);
    this.projectsForm.controls['status'].setValue(this.projectToEdit.status);
    this.projectsForm.controls['owner'].setValue(this.projectToEdit.owner);
    this.projectsForm.controls['assignees'].setValue(this.projectToEdit.assignees);
    this.projectsForm.controls['tasks'].setValue(this.projectToEdit.tasks);
  }
}