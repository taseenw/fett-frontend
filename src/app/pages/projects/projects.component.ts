import { Component } from '@angular/core';
import { OnDestroy, OnInit, OnChanges } from '@angular/core';
import { AuthService } from '@auth0/auth0-angular';

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
  authProfile: any;
  email: string = null;
  constructor(public auth: AuthService) { }

  ngOnInit() {
    console.log("innit")
    this.auth.user$.subscribe( 
      (profile) => ((this.authProfile = profile), this.getProjects(profile.email)));
    console.log(this.email);
  }

  getProjects(email:string) {    
    //get the email
    fetch(`http://localhost:8000/api/projects/getProjects`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        'email' : email
      },
    })
    .then(response => response.json())
    .then(data => {
      // Handle the response data (list of users)
      console.log(data);
      console.log("hello")
      this.projects = data;
      
    })
    .catch(error => {
      // Handle any errors
      console.error('Error fetching users:', error);
    });
    this.projects = [];
  }
}
