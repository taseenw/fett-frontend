import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AuthService } from '@auth0/auth0-angular';
import { UsersService } from 'src/app/services/users/users.service';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css'],
})
export class ProfileComponent implements OnInit {
  profileJson: any = null;
  email: string = null;
  authProfile: any;
  form: FormGroup;
  constructor(public auth: AuthService, public usersService: UsersService, private fb: FormBuilder) { }

  ngOnInit() {
    // Initialize the form with default values or empty strings
    this.form = this.fb.group({
      firstname: ['', Validators.required],
      lastname: ['', Validators.required],
      email: [''],
      phone: ['', Validators.required],
    });

    this.auth.user$.subscribe(
      (profile) => {
        this.authProfile = profile;
        this.fetchUserByEmail(profile.email);
        console.log(profile.email)
      }
    );
  }

  fetchUserByEmail(email: string): void {
    this.form.patchValue({
      email: email
    });
    this.usersService.getUserByEmail(email).subscribe(data => {
      console.log('Fetched user by email:', data);
      this.profileJson = data;
      // Update the form with fetched values
      this.form.patchValue({
        firstname: this.profileJson.fname,
        lastname: this.profileJson.lname,
        email: email, // Assuming 'email' is the correct key
        phone: this.profileJson.phone,
      });
    }, error => {
      console.error('There was an error!', error);
    });
  }



  validSubmit() {
    if (this.form.valid) {

      console.log('Update User:', this.form);

    //  console.log(this.usersService.updateUser(this.form.value.email, this.form.value.phone, this.form.value.firstname, this.form.value.lastname))

      this.usersService.updateUser(this.form.value.email, this.form.value.phone, this.form.value.firstname, this.form.value.lastname).subscribe(data => {
        console.log(data)
      }, error => {
        console.error('There was an error!', error);
      });
    }
  }
}

/*

projectsForm: FormGroup;
  pageTitle: string;
  @Input() formType: string;
  projectToEdit: Project;

  
  constructor(private fb: FormBuilder) { }
  ngOnInit() {
    this.projectsForm = this.fb.group({
      name: ['', Validators.required],
      description: ['', Validators.required],
      status: ['', Validators.required],
      owner: ['', Validators.required],
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
    if (this.projectsForm.valid) {
      // Form is valid, you can access the form values using this.projectsForm.value
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
      owner: 'John Doe',
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
  }*/
